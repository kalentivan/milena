import { siteConfig } from './config';
export function mediaUrl(path:string){
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.mediaBase}${path.startsWith('/')?'':'/'}${path}`;
}
