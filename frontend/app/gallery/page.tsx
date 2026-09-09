'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/lib/config';
import type { Artwork, GalleryPreset } from '@/lib/types';
const VirtualGallery=dynamic(()=>import('@/components/VirtualGallery'),{ssr:false});
export default function GalleryPage(){
 const [arts,setArts]=useState<Artwork[]>([]); const [preset,setPreset]=useState<GalleryPreset|null>(null);
 useEffect(()=>{Promise.all([fetch(`${siteConfig.apiBase}/artworks`).then(r=>r.json()),fetch(`${siteConfig.apiBase}/presets/galleries/${siteConfig.galleryPreset}`).then(r=>r.json())]).then(([a,p])=>{setArts(a);setPreset(p)})},[]);
 return <main>{arts.length&&preset?<VirtualGallery preset={preset} arts={arts}/>:<div className="container section">Загрузка выставки…</div>}</main>
}
