import '@/styles/globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Milena — художник', description: 'Работы, серии и виртуальная выставка художника Milena' };

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ru"><body><ThemeProvider><Header/>{children}<Footer/></ThemeProvider></body></html>
}
