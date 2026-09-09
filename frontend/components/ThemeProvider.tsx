'use client';
import { useEffect } from 'react';
import { siteConfig } from '@/lib/config';
import type { ThemePreset } from '@/lib/types';

export default function ThemeProvider({children}:{children:React.ReactNode}) {
  useEffect(() => {
    fetch(`${siteConfig.apiBase}/presets/themes/${siteConfig.themePreset}`)
      .then(r=>r.ok?r.json():Promise.reject())
      .then((p:ThemePreset)=>{
        const r=document.documentElement.style;
        r.setProperty('--bg',p.colors.background); r.setProperty('--surface',p.colors.surface); r.setProperty('--text',p.colors.text);
        r.setProperty('--muted',p.colors.muted); r.setProperty('--accent',p.colors.accent); r.setProperty('--border',p.colors.border);
        r.setProperty('--radius',p.radius); r.setProperty('--shadow',p.shadow); r.setProperty('--heading',p.typography.heading); r.setProperty('--body',p.typography.body);
      }).catch(()=>{});
  }, []);
  return <>{children}</>;
}
