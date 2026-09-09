import type { Artwork } from './types';

const serverApiBase = process.env.INTERNAL_API_URL || 'http://localhost:8000/api';

export async function getArtworks(): Promise<Artwork[]> {
  const res = await fetch(`${serverApiBase}/artworks`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load artworks');
  return res.json();
}

export async function getArtwork(slug: string): Promise<Artwork> {
  const res = await fetch(`${serverApiBase}/artworks/${slug}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Artwork not found');
  return res.json();
}
