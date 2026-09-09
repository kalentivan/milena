export const siteConfig = {
  artistName: 'Milena',
  subtitle: 'Живопись как пространство переживания',
  themePreset: process.env.NEXT_PUBLIC_THEME_PRESET || 'airy',
  galleryPreset: process.env.NEXT_PUBLIC_GALLERY_PRESET || 'airy-room',
  apiBase: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  mediaBase: process.env.NEXT_PUBLIC_MEDIA_BASE ?? 'http://localhost:8000',
};
