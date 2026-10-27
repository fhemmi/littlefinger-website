import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, ChevronLeft, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { products } from './products';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Guides from './pages/Guides';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import './App.css';

const WHATSAPP_NUMBER='2348125679373';
const money=(amount)=>new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(amount);
const pageFromPath=()=>({ '/':'home','/shop':'shop','/about':'about','/guides':'guides','/faq':'faq','/contact':'contact' })[window.location.pathname.replace(/\/$/,'')||'/']||'home';

export default function App(){
 const [page,setPage]=useState(pageFromPath);
 const [category,setCategory]=useState('All products');
 const [search,setSearch]=useState('');
 const [cart,setCart]=useState({});
 const [cartOpen,setCartOpen]=useState(false);
 const [mobileMenuOpen,setMobileMenuOpen]=useState(false);
 const [selectedProduct,setSelectedProduct]=useState(null);
 const navigate=(next)=>{const path=next==='home'?'/':`/${next}`;window.history.pushState({},'',path);setPage(next);setMobileMenuOpen(false);setSelectedProduct(null);window.scrollTo({top:0,behavior:'smooth'});};
 useEffect(()=>{document.body.dataset.page=page;},[page]);
 useEffect(()=>{
  // Reveal sections as they enter the viewport. The observer is cleaned up on navigation.
  const sections=document.querySelectorAll('main section:not(.hero-phone-launch)');
  sections.forEach(section=>section.classList.add('reveal-on-scroll'));
  if(!('IntersectionObserver' in window)){
   sections.forEach(section=>section.classList.add('is-visible'));
   return;
  }
  const observer=new IntersectionObserver((entries)=>{
   entries.forEach(entry=>{
    if(entry.isIntersecting){
     entry.target.classList.add('is-visible');
     observer.unobserve(entry.target);
    }
   });
  },{threshold:0.12,rootMargin:'0px 0px -35px 0px'});
  sections.forEach(section=>observer.observe(section));
  return()=>observer.disconnect();
 },[page,selectedProduct]);
 useEffect(()=>{const pop=()=>{setPage(pageFromPath());setSelectedProduct(null);};window.addEventListener('popstate',pop);return()=>window.removeEventListener('popstate',pop);},[]);
 const visibleProducts=useMemo(()=>products.filter(p=>(category==='All products'||p.category===category)&&(`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.trim().toLowerCase()))),[category,search]);
 const cartItems=products.filter(p=>cart[p.id]).map(p=>({...p,quantity:cart[p.id]}));
 const cartCount=cartItems.reduce((s,p)=>s+p.quantity,0);
 const cartTotal=cartItems.reduce((s,p)=>s+p.price*p.quantity,0);
 const changeQuantity=(id,delta)=>setCart(current=>{const q=(current[id]||0)+delta;const next={...current};if(q<=0)delete next[id];else next[id]=q;return next;});
 const whatsapp=(message='Hello Littlefinger! I have a question about your gadgets.')=>`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
 const directEnquiry=(p)=>window.open(whatsapp(`Hello Littlefinger! I'm interested in the ${p.name} listed at ${money(p.price)}. Is it available?`),'_blank','noopener,noreferrer');
 const orderOnWhatsApp=()=>{if(!cartItems.length)return;const lines=cartItems.map(p=>`• ${p.name} x${p.quantity} — ${money(p.price*p.quantity)}`);window.open(whatsapp(`Hello Littlefinger! I'd like to order:\n\n${lines.join('\n')}\n\nEstimated total: ${money(cartTotal)}\n\nPlease confirm availability and delivery details.`),'_blank','noopener,noreferrer');};
 let content;
 if(page==='home') content=<Home products={products} money={money} onShop={()=>navigate('shop')} onContact={()=>navigate('contact')} onProduct={setSelectedProduct} onEnquire={directEnquiry} onAdd={(p)=>changeQuantity(p.id,1)}/>;
 else if(page==='shop') content=<Shop products={visibleProducts} money={money} category={category} setCategory={setCategory} search={search} setSearch={setSearch} onProduct={setSelectedProduct} onEnquire={directEnquiry} onAdd={(p)=>changeQuantity(p.id,1)}/>;
 else if(page==='about') content=<About/>;
 else if(page==='guides') content=<Guides/>;
 else if(page==='faq') content=<FAQ whatsapp={whatsapp()}/>;
 else content=<Contact whatsapp={whatsapp()}/>;

 return <div className="site-shell">
  <Header navigate={navigate} page={page} cartCount={cartCount} openCart={()=>setCartOpen(true)} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>
  <main id="top">{content}</main>
  <Footer navigate={navigate} whatsapp={whatsapp()}/>
  {selectedProduct&&<div className="product-modal-backdrop" onClick={()=>setSelectedProduct(null)}><section className="product-modal" onClick={e=>e.stopPropagation()}><button className="icon-button product-modal-close" onClick={()=>setSelectedProduct(null)} aria-label="Close product details"><X/></button><div className="product-modal-image"><img src={selectedProduct.image} alt={selectedProduct.name}/></div><div className="product-modal-info"><p className="eyebrow">{selectedProduct.category}</p><h2>{selectedProduct.name}</h2><p>{selectedProduct.description}</p><strong className="product-modal-price">{money(selectedProduct.price)}</strong><p className="content-note">Please confirm exact specifications, colour and availability with the store.</p><button className="button button-dark" onClick={()=>{changeQuantity(selectedProduct.id,1);setSelectedProduct(null);setCartOpen(true)}}><ShoppingBag size={17}/> Add to bag <ArrowRight size={17}/></button><button className="detail-enquire" onClick={()=>directEnquiry(selectedProduct)}>Ask about this product on WhatsApp <ArrowRight size={15}/></button></div></section></div>}
  {cartOpen&&<div className="drawer-backdrop" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-heading"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={()=>setCartOpen(false)} aria-label="Close bag"><X size={20}/></button></div>
   {!cartItems.length?<div className="cart-empty"><ShoppingBag size={34}/><b>Your bag is waiting</b><p>Add a few gadgets and they'll show up here.</p><button className="button button-dark" onClick={()=>{setCartOpen(false);navigate('shop')}}>Continue shopping</button></div>:<><div className="cart-items">{cartItems.map(item=><div className="cart-item" key={item.id}><img src={item.image} alt=""/><div className="cart-item-info"><b>{item.name}</b><span>{money(item.price)}</span><div className="quantity-control"><button onClick={()=>changeQuantity(item.id,-1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.quantity}</span><button onClick={()=>changeQuantity(item.id,1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><strong>{money(item.price*item.quantity)}</strong></div>)}</div><div className="cart-summary"><div><span>Estimated total</span><strong>{money(cartTotal)}</strong></div><p>Availability, delivery fees and final price will be confirmed by the store.</p><button className="button button-whatsapp" onClick={orderOnWhatsApp}>Send order to WhatsApp <ArrowRight size={17}/></button><button className="continue-button" onClick={()=>setCartOpen(false)}>Continue shopping</button></div></>}
  </aside></div>}
 </div>;
}
