import Link from 'next/link';
export default function Header(){return <header className="header"><div className="container header-inner"><Link className="brand" href="/">MILENA</Link><nav className="nav"><Link href="/works">Работы</Link><Link href="/gallery">Виртуальная выставка</Link><Link href="/about">О художнике</Link><a href="/#contact">Контакты</a></nav></div></header>}
