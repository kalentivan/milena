import Link from 'next/link';
import InquiryForm from '@/components/InquiryForm';
import { getArtwork } from '@/lib/api';
import { mediaUrl } from '@/lib/media';


export const dynamic = 'force-dynamic';
export default async function ArtworkPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const a=await getArtwork(slug);
 return <main className="container detail"><div className="detail-visual"><img className="detail-image" src={mediaUrl(a.image_url)} alt={a.title}/></div><aside><div className="eyebrow">{a.series}</div><h1 className="artwork-title">{a.title}</h1><div className="facts"><div className="fact"><span className="muted">Год</span><br/>{a.year}</div><div className="fact"><span className="muted">Размер</span><br/>{a.width_cm} × {a.height_cm} см</div><div className="fact"><span className="muted">Техника</span><br/>{a.technique}</div><div className="fact"><span className="muted">Основа</span><br/>{a.material}</div></div><p className="description">{a.description}</p><div className="panel" style={{marginTop:28}}><h3 style={{fontFamily:'var(--heading)',fontSize:28,fontWeight:400}}>Узнать о приобретении</h3><InquiryForm artworkSlug={a.slug}/></div><div className="actions"><Link className="btn secondary" href="/gallery">Увидеть в галерее</Link><Link className="btn secondary" href="/works">← Все работы</Link></div></aside></main>
}
