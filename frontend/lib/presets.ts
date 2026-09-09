import type { GalleryPreset, ThemePreset } from './types';

export const themePresets: Record<string, ThemePreset> = {
  airy: {
    id: 'airy', label: 'Airy',
    colors: { background: '#f8f6f1', surface: '#fffefa', text: '#201f1b', muted: '#706d65', accent: '#7f715e', border: '#e6e0d6' },
    typography: { heading: 'Georgia, Times New Roman, serif', body: 'Inter, Arial, sans-serif' },
    radius: '22px', shadow: '0 18px 60px rgba(60,48,34,.08)'
  },
  warmPaper: {
    id: 'warm-paper', label: 'Warm paper',
    colors: { background: '#f1eadf', surface: '#fbf6ed', text: '#2c261f', muted: '#786b5c', accent: '#8f624d', border: '#ddcfbd' },
    typography: { heading: 'Georgia, Times New Roman, serif', body: 'Arial, sans-serif' },
    radius: '14px', shadow: '0 16px 44px rgba(74,50,31,.10)'
  },
  museum: {
    id: 'museum', label: 'Museum',
    colors: { background: '#f2f2ef', surface: '#ffffff', text: '#151515', muted: '#666663', accent: '#222222', border: '#deded8' },
    typography: { heading: 'Times New Roman, serif', body: 'Arial, sans-serif' },
    radius: '4px', shadow: '0 12px 40px rgba(0,0,0,.06)'
  }
};

export const galleryPresets: Record<string, GalleryPreset> = {
  airyRoom: {
    id: 'airy-room', label: 'Airy room',
    room: { width: 14, length: 20, height: 5.2, wallColor: '#f4f1e9', floorColor: '#d8cdbd', ambientIntensity: 1.15, spotIntensity: 4.5 },
    camera: { position: [0, 1.65, 7.8], fov: 58 },
    placements: [
      { artworkSlug: 'quiet-morning', position: [-3.6, 2.05, -9.86], rotation: [0, 0, 0], wall: 'north' },
      { artworkSlug: 'between-seasons', position: [0, 2.05, -9.86], rotation: [0, 0, 0], wall: 'north' },
      { artworkSlug: 'blue-silence', position: [3.7, 2.05, -9.86], rotation: [0, 0, 0], wall: 'north' },
      { artworkSlug: 'garden-after-rain', position: [-6.86, 2.05, -2.5], rotation: [0, Math.PI / 2, 0], wall: 'west' },
      { artworkSlug: 'light-study', position: [6.86, 2.05, -2.0], rotation: [0, -Math.PI / 2, 0], wall: 'east' }
    ]
  },
  whiteCube: {
    id: 'white-cube', label: 'White cube',
    room: { width: 16, length: 22, height: 5.8, wallColor: '#fbfbf8', floorColor: '#eceae4', ambientIntensity: .9, spotIntensity: 5.5 },
    camera: { position: [0, 1.7, 8.6], fov: 54 },
    placements: []
  }
};
