import { ProjectItem } from '../types';

// Dynamically discover all projects and media assets committed to /src/projects/[category]/[project]/
const jsonModules = import.meta.glob<Record<string, any>>(
  '/src/projects/*/*/project.json',
  { eager: true }
);

const mediaModules = import.meta.glob<string>(
  '/src/projects/*/*/*.{jpg,jpeg,png,webp,mp4,webm,mov}',
  { eager: true, import: 'default' }
);

export interface CategoryInfo {
  slug: string;
  name: string;
  count: number;
  featuredProject: ProjectItem;
  projects: ProjectItem[];
  path: string;
}

function formatCategoryName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function loadAllProjects(): ProjectItem[] {
  const projects: ProjectItem[] = [];

  for (const [jsonPath, moduleContent] of Object.entries(jsonModules)) {
    const rawData = (moduleContent as any).default || moduleContent;
    const parts = jsonPath.split('/');
    const categorySlug = rawData.categorySlug || parts[parts.length - 3] || 'general';
    const projectSlug = rawData.slug || rawData.id || parts[parts.length - 2] || 'project';
    const folder = jsonPath.substring(0, jsonPath.lastIndexOf('/'));

    // Dynamically match thumbnail and video within the project folder
    const thumbnail =
      mediaModules[`${folder}/thumbnail.jpg`] ||
      mediaModules[`${folder}/thumbnail.png`] ||
      mediaModules[`${folder}/thumbnail.webp`] ||
      mediaModules[`${folder}/thumbnail.jpeg`] ||
      rawData.image ||
      '';

    const video =
      mediaModules[`${folder}/video.mp4`] ||
      mediaModules[`${folder}/video.webm`] ||
      mediaModules[`${folder}/video.mov`] ||
      rawData.videoUrl ||
      undefined;

    const project: ProjectItem = {
      id: rawData.id || projectSlug,
      slug: projectSlug,
      number: rawData.number || '01',
      title: rawData.title || formatCategoryName(projectSlug),
      category: rawData.category || formatCategoryName(categorySlug),
      categorySlug,
      featured: Boolean(rawData.featured),
      description: rawData.description || '',
      image: thumbnail,
      videoUrl: video,
      client: rawData.client || '',
      year: rawData.year || '2026',
      duration: rawData.duration || '',
      tools: Array.isArray(rawData.tools) ? rawData.tools : (Array.isArray(rawData.toolsUsed) ? rawData.toolsUsed : []),
      toolsUsed: Array.isArray(rawData.tools) ? rawData.tools : (Array.isArray(rawData.toolsUsed) ? rawData.toolsUsed : []),
      metrics: Array.isArray(rawData.metrics) ? rawData.metrics : [],
      overview: rawData.overview || rawData.description || '',
      challenge: rawData.challenge || '',
      solution: rawData.solution || '',
      thumbnailUrl: thumbnail,
      shortDescription: rawData.shortDescription || rawData.description || '',
      fullDescription: rawData.fullDescription || rawData.overview || rawData.description || '',
      timeline: rawData.timeline,
      promptEngineering: rawData.promptEngineering,
      path: `/projects/${categorySlug}/${projectSlug}`,
    };

    projects.push(project);
  }

  // Fallback to default portfolio data if no json modules were matched
  if (projects.length === 0) {
    const fallbackList = [
      {
        id: 'sartorial-heritage-shoes',
        slug: 'sartorial-heritage-shoes',
        number: '01',
        title: 'Sartorial Heritage Shoes',
        category: 'AI Video',
        categorySlug: 'ai-video',
        featured: true,
        client: 'Veloce Heritage Footwear',
        year: '2026',
        duration: '30s Brand Spot',
        description: 'Cinematic commercial celebrating artisan full-grain leather dress shoes, golden hour architectural footwork, and macro stitching details.',
        image: '/src/assets/images/project_luxury_footwear_1790284979420.jpg',
        tools: ['Runway Gen-3', 'Midjourney v6', 'Topaz AI', 'DaVinci Resolve'],
        metrics: [
          { label: 'Video Completion', value: '88%' },
          { label: 'Brand Lift', value: '+47%' },
          { label: 'Impressions', value: '4.1M' },
        ],
        overview: 'Created an editorial commercial film emphasizing craftsmanship, genuine leather texture, and all-day city comfort against golden hour metropolis backdrops.',
        challenge: 'Shooting golden-hour outdoor cinematography with accurate leather reflections and macro stitching usually requires an extensive camera crew and tight sunlight windows.',
        solution: 'Engineered precise camera push-ins and golden-hour rim lighting with Runway Gen-3, followed by macro texture enhancements and film grain grading in DaVinci Resolve.',
        path: '/projects/ai-video/sartorial-heritage-shoes',
      },
      {
        id: 'olaplex-bonding-oil',
        slug: 'olaplex-bonding-oil',
        number: '02',
        title: 'Olaplex Nº.7 Bonding Oil',
        category: 'AI Video',
        categorySlug: 'ai-video',
        featured: false,
        client: 'Olaplex Studio',
        year: '2026',
        duration: '15s Macro Commercial',
        description: 'Hyper-detailed macro beauty commercial showing amber fluid droplet dynamics, liquid surface tension, and instant hair strand smoothing.',
        image: '/src/assets/images/project_olaplex_bonding_1790284993640.jpg',
        tools: ['Runway Gen-3', 'Midjourney v6', 'Blender AI', 'DaVinci Resolve'],
        metrics: [
          { label: 'Viewer Retention', value: '94%' },
          { label: 'TikTok Views', value: '5.2M' },
          { label: 'Brand Sentiment', value: '99%' },
        ],
        overview: 'Engineered a hyper-sensory macro video of a golden viscous oil drop descending onto silky caramel hair strands.',
        challenge: 'Capturing real 1000fps ultra-slow-motion liquid droplet impacts on hair requires specialized phantom cameras.',
        solution: 'Synthesized high-viscosity fluid droplet physics using Runway Gen-3 diffusion control and Blender AI compositing.',
        path: '/projects/ai-video/olaplex-bonding-oil',
      },
      {
        id: 'aurevane-lumisera',
        slug: 'aurevane-lumisera',
        number: '01',
        title: 'Aurevane Lumisera Serum',
        category: 'UGC & Commercial',
        categorySlug: 'ugc-commercial',
        featured: true,
        client: 'Aurevane Skincare',
        year: '2026',
        duration: '15s UGC Social Ad',
        description: 'Authentic AI-generated beauty and skincare testimonial commercial showcasing natural morning lighting, real creator pacing, and dewy radiant skin glow.',
        image: '/src/assets/images/project_beauty_lumisera_1790284918103.jpg',
        tools: ['Runway Gen-3', 'ElevenLabs Voice', 'Midjourney v6', 'DaVinci Resolve'],
        metrics: [
          { label: 'TikTok ROAS', value: '4.8x' },
          { label: 'Organic Views', value: '1.2M+' },
          { label: 'Turnaround', value: '24 Hours' },
        ],
        overview: 'Created an authentic, high-converting vertical UGC video advertisement featuring a natural beauty creator demonstrating the Lumisera facial serum.',
        challenge: 'Traditional influencer and studio UGC shoots take weeks to coordinate, suffer from inconsistent brand messaging, and cost upwards of $3,500 per video variant.',
        solution: 'Synthesized an authentic digital creator persona with natural speech cadences in ElevenLabs, generated fluid facial motion keyframes in Runway Gen-3.',
        path: '/projects/ugc-commercial/aurevane-lumisera',
      },
      {
        id: 'cachivane-paris-handbag',
        slug: 'cachivane-paris-handbag',
        number: '02',
        title: 'Cachivane Paris Leather',
        category: 'UGC & Commercial',
        categorySlug: 'ugc-commercial',
        featured: false,
        client: 'Cachivane Paris',
        year: '2026',
        duration: '30s Brand Commercial',
        description: 'Cinematic European fashion brand film capturing timeless pebble-grain leather craftsmanship, golden hardware details, and Parisian street movement.',
        image: '/src/assets/images/project_cachivane_handbag_1790284949240.jpg',
        tools: ['Runway Gen-3 Alpha', 'Midjourney v6', 'Premiere Pro', 'Suno Audio'],
        metrics: [
          { label: 'Social Reach', value: '2.4M+' },
          { label: 'Engagement Rate', value: '8.7%' },
          { label: 'Cost Reduction', value: '86%' },
        ],
        overview: 'Directed an elevated luxury commercial for the Cachivane signature leather handbag.',
        challenge: 'On-location luxury filming in Paris typically demands city filming permits, insurance, and high-end camera rigs.',
        solution: 'Generated high-fashion lighting and hyper-consistent handbag geometry across cinematic walk cycles using Runway Gen-3.',
        path: '/projects/ugc-commercial/cachivane-paris-handbag',
      },
      {
        id: 'moduluxe-bento-organizer',
        slug: 'moduluxe-bento-organizer',
        number: '01',
        title: 'ModuLuxe Bento Prep Box',
        category: 'E-Commerce Product Demo',
        categorySlug: 'ecommerce-product-demo',
        featured: true,
        client: 'ModuLuxe Home Goods',
        year: '2026',
        duration: '15s Product Demo',
        description: 'Stop-motion & fluid commercial demonstrating modular bento snack organization, fresh fruit sorting, and seamless refrigerator storage.',
        image: '/src/assets/images/project_bento_organizer_1790284935153.jpg',
        tools: ['Kling AI', 'Runway Gen-3', 'Topaz Video AI', 'Blender'],
        metrics: [
          { label: 'Add-to-Cart Lift', value: '+64%' },
          { label: 'Variants Delivered', value: '12 Cuts' },
          { label: '4K Render Time', value: '3.2 Hours' },
        ],
        overview: 'Produced a clean, satisfying product interaction video showing fresh blueberries, strawberries, and almonds being sorted.',
        challenge: 'Physical product video shoots for domestic housewares require staged kitchens, food stylists, and studio lighting.',
        solution: 'Modeled photorealistic bento geometries and rendered clean dynamic hand-interaction sequences using Kling AI and Runway Gen-3.',
        path: '/projects/ecommerce-product-demo/moduluxe-bento-organizer',
      },
      {
        id: 'hydrorack-sink-organizer',
        slug: 'hydrorack-sink-organizer',
        number: '02',
        title: 'HydroRack Sink System',
        category: 'E-Commerce Product Demo',
        categorySlug: 'ecommerce-product-demo',
        featured: false,
        client: 'Apex Kitchenware',
        year: '2026',
        duration: '15s DTC Video Ad',
        description: 'High-energy e-commerce motion ad demonstrating expandable over-the-sink colander functionality, vegetable washing, and quick-dry dish draining.',
        image: '/src/assets/images/project_sink_organizer_1790284964834.jpg',
        tools: ['Luma Dream Machine', 'Runway Gen-3', 'After Effects', 'DaVinci'],
        metrics: [
          { label: 'Conversion Lift', value: '3.4x' },
          { label: 'Amazon Video ROAS', value: '5.2x' },
          { label: 'CPA Reduction', value: '41%' },
        ],
        overview: 'Crafted a fast-paced Amazon and TikTok DTC video highlighting the Prep · Rinse · Drain workflow.',
        challenge: 'Simulating convincing fluid dynamics and real water interaction without expensive high-speed camera equipment.',
        solution: 'Synthesized high-speed fluid motion in Luma and Runway Gen-3 with custom physical splash masks.',
        path: '/projects/ecommerce-product-demo/hydrorack-sink-organizer',
      },
      {
        id: 'ai-operational-backbone',
        slug: 'ai-operational-backbone',
        number: '01',
        title: 'AI Operational Backbone',
        category: 'Intelligent Automation',
        categorySlug: 'intelligent-automation',
        featured: true,
        client: 'Vanguard Media Group',
        year: '2026',
        duration: 'Full Pipeline Integration',
        description: 'Automated production workflows connecting AI models, brief intake forms, CRM, and real-time asset delivery pipelines.',
        image: '/src/assets/images/project_automation_engine_1790278761343.jpg',
        tools: ['Make', 'n8n', 'Gemini API', 'Airtable', 'Webhooks'],
        metrics: [
          { label: 'Manual Hours Saved', value: '140 hrs/mo' },
          { label: 'Sync Latency', value: '< 2.4s' },
          { label: 'Lead Conversion', value: '+44%' },
        ],
        overview: 'Architected an automated multi-branch operational backbone for a creative studio to eliminate manual handoffs.',
        challenge: 'Team members spent 35% of their working hours manually copy-pasting client creative briefs and transcribing audio.',
        solution: 'Built an autonomous webhook orchestration in n8n connecting Typeform briefs to Gemini 2.5 Flash for instant brief synthesis.',
        path: '/projects/intelligent-automation/ai-operational-backbone',
      },
      {
        id: 'content-automation-engine',
        slug: 'content-automation-engine',
        number: '02',
        title: 'Content Automation Engine',
        category: 'Intelligent Automation',
        categorySlug: 'intelligent-automation',
        featured: false,
        client: 'Synthetix Tech Labs',
        year: '2026',
        duration: 'Continuous Pipeline',
        description: 'Autonomous AI-powered content generation, thumbnail rendering, metadata tagging, and programmatic multi-platform distribution.',
        image: '/src/assets/images/project_content_studio_1790278771221.jpg',
        tools: ['Gemini API', 'Google Cloud', 'Zapier', 'YouTube API'],
        metrics: [
          { label: 'Asset Throughput', value: '180/month' },
          { label: 'Editorial Review', value: '< 5 min' },
          { label: 'Global Reach', value: '12M Views' },
        ],
        overview: 'Architected an end-to-end automated content engine that generates video concepts and compiles final social reels.',
        challenge: 'Producing high volumes of omnichannel technical content weekly without burning out editorial teams in manual export loops.',
        solution: 'Built a Python & n8n orchestration using Gemini 2.5 Flash for script expansion and Cloud Run rendering.',
        path: '/projects/intelligent-automation/content-automation-engine',
      },
    ];
    return fallbackList;
  }

  // Sort by category order and number
  return projects.sort((a, b) => {
    const catA = a.categorySlug || '';
    const catB = b.categorySlug || '';
    if (catA !== catB) {
      return catA.localeCompare(catB);
    }
    return (a.number || '').localeCompare(b.number || '');
  });
}

export function getCategoriesWithFeatured(allProjects: ProjectItem[]): CategoryInfo[] {
  const categoryMap = new Map<string, ProjectItem[]>();

  for (const project of allProjects) {
    const slug = project.categorySlug || 'general';
    const list = categoryMap.get(slug) || [];
    list.push(project);
    categoryMap.set(slug, list);
  }

  // Ensure specified preferred order: AI Video, UGC & Commercial, E-Commerce, Intelligent Automation
  const preferredOrder = [
    'ai-video',
    'ugc-commercial',
    'ecommerce-product-demo',
    'intelligent-automation',
  ];

  const orderedCategorySlugs = Array.from(categoryMap.keys()).sort((a, b) => {
    const idxA = preferredOrder.indexOf(a);
    const idxB = preferredOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  return orderedCategorySlugs.map((slug) => {
    const projects = categoryMap.get(slug) || [];
    // Select the project marked featured: true; fallback to first
    const featuredProject =
      projects.find((p) => p.featured) || projects[0];

    const categoryName = projects[0]?.category || formatCategoryName(slug);

    return {
      slug,
      name: categoryName,
      count: projects.length,
      featuredProject,
      projects,
      path: `/projects/${slug}`,
    };
  });
}
