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
      tools: Array.isArray(rawData.tools) ? rawData.tools : [],
      metrics: Array.isArray(rawData.metrics) ? rawData.metrics : [],
      overview: rawData.overview || rawData.description || '',
      challenge: rawData.challenge || '',
      solution: rawData.solution || '',
      path: `/projects/${categorySlug}/${projectSlug}`,
    };

    projects.push(project);
  }

  // Sort by category order and number
  return projects.sort((a, b) => {
    if (a.categorySlug !== b.categorySlug) {
      return a.categorySlug.localeCompare(b.categorySlug);
    }
    return a.number.localeCompare(b.number);
  });
}

export function getCategoriesWithFeatured(allProjects: ProjectItem[]): CategoryInfo[] {
  const categoryMap = new Map<string, ProjectItem[]>();

  for (const project of allProjects) {
    const list = categoryMap.get(project.categorySlug) || [];
    list.push(project);
    categoryMap.set(project.categorySlug, list);
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
