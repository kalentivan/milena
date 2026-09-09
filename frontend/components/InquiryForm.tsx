'use client';
import { FormEvent, useState } from 'react'; import { siteConfig } from '@/lib/config';
export default function InquiryForm({artworkSlug}:{artworkSlug?:string}){
 const [status,setStatus]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault(); const f=new FormData(e.currentTarget); setStatus('Отправляем…'); const res=await fetch(`${siteConfig.apiBase}/inquiries`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:f.get('name'),contact:f.get('contact'),message:f.get('message'),artwork_slug:artworkSlug||null})}); setStatus(res.ok?'Спасибо. Запрос отправлен.':'Не удалось отправить запрос.'); if(res.ok)e.currentTarget.reset()}
 return <form className="form" onSubmit={submit}><div className="field"><label>Имя</label><input name="name" required/></div><div className="field"><label>Telegram / WhatsApp / Email</label><input name="contact" required/></div><div className="field"><label>Сообщение</label><textarea name="message" placeholder="Хочу узнать стоимость и условия приобретения"/></div><button className="btn" type="submit">Отправить запрос</button>{status&&<div className="muted">{status}</div>}</form>
}
