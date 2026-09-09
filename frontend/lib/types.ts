export type Artwork = {
  id: string;
  slug: string;
  title: string;
  year: number;
  width_cm: number;
  height_cm: number;
  depth_cm?: number | null;
  technique: string;
  material: string;
  series: string;
  description: string;
  short_description: string;
  status: 'available' | 'sold' | 'private_collection' | 'not_for_sale';
  image_url: string;
  detail_images: string[];
  featured: boolean;
};

export type ThemePreset = {
  id: string;
  label: string;
  colors: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    accent: string;
    border: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  radius: string;
  shadow: string;
};

export type GalleryArtworkPlacement = {
  artworkSlug: string;
  position: [number, number, number];
  rotation: [number, number, number];
  wall: 'north' | 'south' | 'east' | 'west';
};

export type GalleryPreset = {
  id: string;
  label: string;
  room: {
    width: number;
    length: number;
    height: number;
    wallColor: string;
    floorColor: string;
    ambientIntensity: number;
    spotIntensity: number;
  };
  camera: {
    position: [number, number, number];
    fov: number;
  };
  placements: GalleryArtworkPlacement[];
};
