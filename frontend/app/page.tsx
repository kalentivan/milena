import Link from 'next/link';
import ArtworkCard from '@/components/ArtworkCard';
import InquiryForm from '@/components/InquiryForm';
import { getArtworks } from '@/lib/api';
import { siteConfig } from '@/lib/config';
import { mediaUrl } from '@/lib/media';


export const dynamic = 'force-dynamic';
export default async function Home(){
  const works = await getArtworks();
  const featured = works.filter(w=>w.featured).slice(0,6);
  return <main>
    <section className="container hero">
      <div><div className="eyebrow">Художник · современная живопись</div><h1>{siteConfig.artistName}</h1><p className="lead">{siteConfig.subtitle}. Персональная коллекция работ, серии и цифровое выставочное пространство, в котором живопись можно увидеть в масштабе настоящего зала.</p><div className="actions"><Link className="btn" href="/works">Смотреть работы</Link><Link className="btn secondary" href="/gallery">Войти в галерею</Link></div></div>
      <div className="hero-art"><img src={featured[0] ? mediaUrl(featured[0].image_url) : '/images/quiet-morning.svg'} alt="Работа художника"/></div>
    </section>
    <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">Избранное</div><h2 className="section-title">Последние работы</h2></div><Link className="muted" href="/works">Все работы →</Link></div><div className="grid">{featured.map(a=><ArtworkCard key={a.id} art={a}/>)}</div></div></section>
    <section className="section"><div className="container" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:28}}><div className="panel"><div className="eyebrow">Виртуальная выставка</div><h2 className="section-title" style={{fontSize:48}}>Не листать. Войти.</h2><p className="lead">Отдельный 3D-режим позволяет пройти по залу, увидеть реальный масштаб работ и открыть описание прямо возле картины.</p><Link className="btn" href="/gallery">Открыть выставку</Link></div><div className="panel" id="contact"><div className="eyebrow">Связаться</div><h2 style={{fontFamily:'var(--heading)',fontWeight:400,fontSize:40}}>Приобретение и проекты</h2><InquiryForm/></div></div></section>
  </main>
}
