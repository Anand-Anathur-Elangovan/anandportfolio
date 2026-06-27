import type { MetadataRoute } from 'next';

const BASE_URL = 'https://anand.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/ai-lab',
    '/architecture',
    '/data-science',
    '/skills',
    '/certifications',
    '/blog',
    '/contact',
    '/recruiter-mode',
    '/ai-journey',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes = [
    'vzgpt', 'vzsql-editor', 'vzgenie', 'vzflix',
    'cam-to-code', 'living-fire-australia', 'prompt-gallery',
  ].map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
