'use client';
import { useEffect, useMemo, useState } from 'react';
import ArtworkCard from '@/components/ArtworkCard';
import type { Artwork } from '@/lib/types';
import { siteConfig } from '@/lib/config';

export default function Works(){
 const [items,setItems]=useState<Artwork[]>([]); const [series,setSeries]=useState('Все'); const [tech,setTech]=useState('Все'); const [year,setYear]=useState('Все');
 useEffect(()=>{fetch(`${siteConfig.apiBase}/artworks`).then(r=>r.json()).then(setItems)},[]);
 const seriesList=['Все',...Array.from(new Set(items.map(x=>x.series)))]; const techList=['Все',...Array.from(new Set(items.map(x=>x.technique)))]; const years=['Все',...Array.from(new Set(items.map(x=>String(x.year))))];
 const filtered=useMemo(()=>items.filter(x=>(series==='Все'||x.series===series)&&(tech==='Все'||x.technique===tech)&&(year==='Все'||String(x.year)===year)),[items,series,tech,year]);
 return <main className="container section"><div className="eyebrow">Коллекция</div><h1 className="section-title">Работы</h1><p className="lead">Каталог можно фильтровать по сериям, техникам и годам. Те же данные используются в виртуальной выставке.</p><div className="filters"><select className="filter" value={series} onChange={e=>setSeries(e.target.value)}>{seriesList.map(x=><option key={x}>{x}</option>)}</select><select className="filter" value={tech} onChange={e=>setTech(e.target.value)}>{techList.map(x=><option key={x}>{x}</option>)}</select><select className="filter" value={year} onChange={e=>setYear(e.target.value)}>{years.map(x=><option key={x}>{x}</option>)}</select></div><div className="grid">{filtered.map(a=><ArtworkCard key={a.id} art={a}/>)}</div></main>
}
