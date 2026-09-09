'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, Text, useTexture } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Artwork, GalleryPreset } from '@/lib/types';
import { mediaUrl } from '@/lib/media';

function CameraWalker({bounds}:{bounds:{x:number;z:number}}){
  const {camera}=useThree(); const keys=useRef<Record<string,boolean>>({});
  useEffect(()=>{const down=(e:KeyboardEvent)=>keys.current[e.code]=true; const up=(e:KeyboardEvent)=>keys.current[e.code]=false; addEventListener('keydown',down); addEventListener('keyup',up); return()=>{removeEventListener('keydown',down);removeEventListener('keyup',up)}},[]);
  useFrame((_,dt)=>{const speed=3.2; const forward=new THREE.Vector3(); camera.getWorldDirection(forward); forward.y=0; forward.normalize(); const right=new THREE.Vector3().crossVectors(forward,new THREE.Vector3(0,1,0)).normalize(); if(keys.current.KeyW||keys.current.ArrowUp)camera.position.addScaledVector(forward,speed*dt); if(keys.current.KeyS||keys.current.ArrowDown)camera.position.addScaledVector(forward,-speed*dt); if(keys.current.KeyA||keys.current.ArrowLeft)camera.position.addScaledVector(right,-speed*dt); if(keys.current.KeyD||keys.current.ArrowRight)camera.position.addScaledVector(right,speed*dt); camera.position.x=THREE.MathUtils.clamp(camera.position.x,-bounds.x,bounds.x); camera.position.z=THREE.MathUtils.clamp(camera.position.z,-bounds.z,bounds.z); camera.position.y=1.65;});
  return null;
}

function Painting({art,position,rotation,onOpen}:{art:Artwork;position:[number,number,number];rotation:[number,number,number];onOpen:(a:Artwork)=>void}){
  const texture=useTexture(mediaUrl(art.image_url)); const h=1.55; const w=Math.max(.7,h*(art.width_cm/art.height_cm));
  return <group position={position} rotation={rotation} onClick={(e)=>{e.stopPropagation();onOpen(art)}}>
    <mesh><boxGeometry args={[w+.09,h+.09,.055]}/><meshStandardMaterial color="#d8d1c4" roughness={.72}/></mesh>
    <mesh position={[0,0,.032]}><planeGeometry args={[w,h]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    <Text position={[0,-h/2-.18,.04]} fontSize={.09} color="#4b4740" anchorX="center" anchorY="middle">{art.title} · {art.year}</Text>
  </group>
}

function Room({preset,arts,onOpen}:{preset:GalleryPreset;arts:Artwork[];onOpen:(a:Artwork)=>void}){
  const {width,length,height,wallColor,floorColor,ambientIntensity,spotIntensity}=preset.room; const map=useMemo(()=>new Map(arts.map(a=>[a.slug,a])),[arts]);
  return <>
    <ambientLight intensity={ambientIntensity}/><directionalLight position={[2,6,3]} intensity={1.3}/>
    {preset.placements.map((p,i)=><spotLight key={i} position={[p.position[0],height-.45,p.position[2]+1.4]} intensity={spotIntensity} angle={.48} penumbra={.8} distance={8}/>) }
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,0]} receiveShadow><planeGeometry args={[width,length]}/><meshStandardMaterial color={floorColor} roughness={.88}/></mesh>
    <mesh position={[0,height/2,-length/2]}><boxGeometry args={[width,height,.12]}/><meshStandardMaterial color={wallColor}/></mesh>
    <mesh position={[-width/2,height/2,0]}><boxGeometry args={[.12,height,length]}/><meshStandardMaterial color={wallColor}/></mesh>
    <mesh position={[width/2,height/2,0]}><boxGeometry args={[.12,height,length]}/><meshStandardMaterial color={wallColor}/></mesh>
    <mesh position={[-width*.32,height/2,length/2]}><boxGeometry args={[width*.36,height,.12]}/><meshStandardMaterial color={wallColor}/></mesh>
    <mesh position={[width*.32,height/2,length/2]}><boxGeometry args={[width*.36,height,.12]}/><meshStandardMaterial color={wallColor}/></mesh>
    {preset.placements.map(p=>{const a=map.get(p.artworkSlug); return a?<Painting key={p.artworkSlug} art={a} position={p.position} rotation={p.rotation} onOpen={onOpen}/>:null})}
    <CameraWalker bounds={{x:width/2-.5,z:length/2-.5}}/><PointerLockControls/>
  </>
}

export default function VirtualGallery({preset,arts}:{preset:GalleryPreset;arts:Artwork[]}){
 const [selected,setSelected]=useState<Artwork|null>(null);
 return <div className="gallery-shell"><div className="gallery-overlay"><div className="eyebrow">Цифровой зал</div><strong>{preset.label}</strong><div className="muted" style={{fontSize:12,marginTop:6}}>Кликните по залу, чтобы включить обзор мышью. Подойдите к работе и нажмите на неё.</div></div><div className="gallery-help">WASD / стрелки · мышь · Esc — освободить курсор</div>
 <Canvas camera={{position:preset.camera.position,fov:preset.camera.fov}} shadows><Room preset={preset} arts={arts} onOpen={setSelected}/></Canvas>
 {selected&&<div className="gallery-card"><button onClick={()=>setSelected(null)} style={{float:'right',border:0,background:'transparent',fontSize:22,cursor:'pointer'}}>×</button><div className="eyebrow">{selected.series}</div><div style={{fontFamily:'var(--heading)',fontSize:30,margin:'5px 0'}}>{selected.title}</div><div className="muted" style={{fontSize:13}}>{selected.year} · {selected.technique} · {selected.width_cm}×{selected.height_cm} см</div><p style={{fontSize:14,lineHeight:1.5}}>{selected.short_description}</p><a className="btn" href={`/works/${selected.slug}`}>Подробнее о работе</a></div>}
 </div>
}
