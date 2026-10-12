import { useState, useMemo } from 'react';
import { initialPortfolioData } from './data/defaultPortfolio';
import { PortfolioData, ProjectItem } from './types';
import { loadAllProjects, getCategoriesWithFeatured } from './lib/projectRegistry';
import { useRoute } from './hooks/useRoute';
import { StreaksCanvas } from './components/StreaksCanvas';
import { BootSequence } from './components/BootSequence';
import { TechNoirHud } from './components/TechNoirHud';
import { TechNoirNavbar } from './components/TechNoirNavbar';
import { TechNoirHero } from './components/TechNoirHero';
import { TechNoirProfile } from './components/TechNoirProfile';
import { TechNoirWork } from './components/TechNoirWork';
import { TechNoirExperience } from './components/TechNoirExperience';
import { TechNoirRolls } from './components/TechNoirRolls';
import { TechNoirEquipment } from './components/TechNoirEquipment';
import { TechNoirFooter } from './components/TechNoirFooter';
import { CategoryLibrary } from './components/CategoryLibrary';
import { CaseStudyPage } from './components/CaseStudyPage';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const { route, navigate } = useRoute();
  const [bootCompleted, setBootCompleted] = useState(false);

  // Dynamically discovered projects
  const discoveredProjects = useMemo(() => loadAllProjects(), []);
  const [videoOverrides, setVideoOverrides] = useState<Record<string, string>>({});

  const allProjects = useMemo(() => {
    return discoveredProjects.map((p) => ({
      ...p,
      videoUrl: videoOverrides[p.id] || p.videoUrl,
    }));
  }, [discoveredProjects, videoOverrides]);

  const categories = useMemo(() => getCategoriesWithFeatured(allProjects), [allProjects]);

  const [data] = useState<PortfolioData>(initialPortfolioData);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactScope, setContactScope] = useState<string | undefined>(undefined);

  const handleOpenContact = (scope?: string) => {
    setContactScope(scope);
    setIsContactOpen(true);
  };

  const handleUpdateProjectVideo = (projectId: string, videoUrl: string) => {
    setVideoOverrides((prev) => ({
      ...prev,
      [projectId]: videoUrl,
    }));
  };

  const handleViewWork = () => {
    if (route.type !== 'home') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('work');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHome = (sectionHash?: string) => {
    navigate('/');
    if (sectionHash) {
      setTimeout(() => {
        const el = document.querySelector(sectionHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const activeCategory = useMemo(() => {
    if (!route.categorySlug) return categories[0];
    return categories.find((c) => c.slug === route.categorySlug) || categories[0];
  }, [categories, route.categorySlug]);

  const activeProject = useMemo(() => {
    if (!route.projectSlug) return allProjects[0];
    return (
      allProjects.find(
        (p) => p.slug === route.projectSlug && p.categorySlug === route.categorySlug
      ) ||
      allProjects.find((p) => p.slug === route.projectSlug) ||
      allProjects[0]
    );
  }, [allProjects, route.projectSlug, route.categorySlug]);

  return (
    <div className="min-h-screen bg-[#080c15] text-[#c3d0e8] font-sans antialiased relative selection:bg-[#5fe0ff] selection:text-[#04060b]">
      {/* 1. Sibaldesign Interactive Boot Splash & Ring Loader */}
      {!bootCompleted && (
        <BootSequence
          onBootComplete={() => setBootCompleted(true)}
          brandName="LIBOT"
          initials="JL"
        />
      )}

      {/* 2. Ambient Field: Dots Grid & CRT Scanline Texture */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(120, 150, 200, 0.16) 1px, transparent 0)',
            backgroundSize: '14px 14px',
            maskImage: 'linear-gradient(90deg, #000 0 14%, transparent 22% 78%, #000 86% 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, #000 0 14%, transparent 22% 78%, #000 86% 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0 1px, transparent 1px 3px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 40%, transparent 35%, rgba(2, 4, 9, 0.85) 100%)',
          }}
        />
      </div>

      {/* 3. Streaks Canvas: Animated diagonal laser particle lines */}
      <StreaksCanvas />

      {/* 4. Heads-Up Display: Corner Crosshairs and Coordinate Rails */}
      <TechNoirHud />

      {/* 5. Audio Synthesizer Navbar */}
      <TechNoirNavbar
        onOpenContact={() => handleOpenContact()}
        onNavigateHome={handleNavigateHome}
        isSubpage={route.type !== 'home'}
      />

      {/* 6. Main Content Area */}
      <div className="relative z-10 pt-4">
        {route.type === 'category' ? (
          <CategoryLibrary
            currentCategory={activeCategory}
            allCategories={categories}
            onSelectProject={(project) =>
              navigate(project.path || `/projects/${project.categorySlug}/${project.slug}`)
            }
            onNavigateCategory={(catSlug) => navigate(`/projects/${catSlug}`)}
            onBackToHome={() => navigate('/')}
          />
        ) : route.type === 'project' ? (
          <CaseStudyPage
            project={activeProject}
            category={activeCategory}
            onBackToCategory={() => navigate(`/projects/${activeCategory.slug}`)}
            onBackToHome={() => navigate('/')}
            onSelectProject={(p) => navigate(p.path || `/projects/${p.categorySlug}/${p.slug}`)}
            onOpenInquiry={(title) => handleOpenContact(`Workflow based on ${title}`)}
            onUpdateVideo={handleUpdateProjectVideo}
          />
        ) : (
          <main id="top">
            {/* HERO */}
            <TechNoirHero
              onViewWork={handleViewWork}
              onOpenContact={() => handleOpenContact()}
            />

            {/* PROFILE / DOSSIER */}
            <TechNoirProfile
              portraitUrl={data.portraitUrl}
              onOpenContact={() => handleOpenContact('Strategic Engagement')}
              onViewWork={handleViewWork}
            />

            {/* PROJECTS / INTERACTIVE BLUEPRINTS */}
            <TechNoirWork
              projects={allProjects}
              onSelectProject={(proj) =>
                navigate(proj.path || `/projects/${proj.categorySlug}/${proj.slug}`)
              }
            />

            {/* EXPERIENCE / PRODUCTION LOGS */}
            <TechNoirExperience />

            {/* PHOTOSHOOTS / CONTACT SHEETS */}
            <TechNoirRolls />

            {/* EQUIPMENT / PIPELINE TOPOLOGY */}
            <TechNoirEquipment />

            {/* LET'S CHAT / TRANSMISSION FOOTER */}
            <TechNoirFooter
              onOpenContact={() => handleOpenContact()}
              email={data.email}
            />
          </main>
        )}
      </div>

      {/* Contact modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultScope={contactScope}
        recipientEmail={data.email}
      />
    </div>
  );
}
