import React from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';

export default function Header({navigate, page, cartCount, openCart, mobileMenuOpen, setMobileMenuOpen}) {
  const links=[['home','Home'],['shop','Shop'],['about','About']];
  return <header className={`header ${page==='home'?'header-home':''}`}>
    <a className="brand" href="/" onClick={e=>{e.preventDefault();navigate('home')}} aria-label="Littlefinger home">
      <span className="brand-word">littlefinger<span className="brand-dot">.</span></span>
    </a>
    <nav className={`nav ${mobileMenuOpen?'nav-open':''}`} aria-label="Main navigation">
      {links.map(([key,label])=><a key={key} className={page===key?'active':''} href={key==='home'?'/':`/${key}`} onClick={e=>{e.preventDefault();navigate(key)}}>{label}</a>)}
    </nav>
    <div className="header-actions">
      <button className="icon-button search-toggle" aria-label="Go to shop" onClick={()=>navigate('shop')}><Search size={20}/></button>
      <button className="icon-button cart-icon-button" aria-label={`Open shopping bag, ${cartCount} items`} onClick={openCart}><ShoppingBag size={20}/><b>{cartCount}</b></button>
      <button className="icon-button menu-toggle" aria-label="Toggle menu" onClick={()=>setMobileMenuOpen(v=>!v)}>{mobileMenuOpen?<X size={21}/>:<Menu size={21}/>}</button>
    </div>
  </header>;
}
