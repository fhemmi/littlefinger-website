import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const categories = [
  { name:'Phones', image:'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=85' },
  { name:'Laptops', image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=85' },
  { name:'Headsets', image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85' },
  { name:'Earbuds', image:'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=85' },
  { name:'Gaming', image:'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85' },
  { name:'Accessories', image:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=85' },
];
const brands = ['Apple','Samsung','Dell','HP','Sony','JBL','Microsoft'];

export default function Home({ products, money, onShop, onProduct, onAdd, onContact, onEnquire }) {
  const featured = products.slice(0,4);
  return <div className="page-home">
    <section className="home-hero">
      <div className="home-hero-shade" aria-hidden="true" />
      <div className="home-hero-content">
        <p className="home-eyebrow">PREMIUM GADGETS. BETTER LIVING.</p>
        <h1>The latest tech,<br/>for your world.</h1>
        <p className="home-hero-description">Phones, laptops, headsets and more — trusted brands, curated for you.</p>
        <div className="home-hero-actions"><button className="button home-button-primary" onClick={onShop}>Shop now <ArrowRight size={17}/></button><button className="button home-button-secondary" onClick={onContact}>Get in touch</button></div>
      </div>
      <a className="hero-scroll-cue" href="#home-categories" aria-label="Scroll to categories"><span/></a>
    </section>

    <section className="home-categories section-pad" id="home-categories">
      <div className="home-section-heading"><div><p className="eyebrow">SHOP BY CATEGORY</p><h2>Find what you need.</h2></div><button className="home-text-link" onClick={onShop}>Explore the shop <ArrowRight size={16}/></button></div>
      <div className="home-category-grid">{categories.map(item=><button className="home-category-card" key={item.name} onClick={onShop}><span className="home-category-image"><img src={item.image} alt="" loading="lazy"/></span><span>{item.name}<ArrowRight size={15}/></span></button>)}</div>
    </section>

    <section className="home-brands section-pad"><div className="home-section-heading"><div><p className="eyebrow">TRUSTED NAMES</p><h2>Brands you know.</h2></div></div><div className="home-brand-list">{brands.map(brand=><span key={brand}>{brand}</span>)}</div></section>

    <section className="home-featured section-pad"><div className="home-section-heading"><div><p className="eyebrow">A FEW CUSTOMER FAVOURITES</p><h2>Popular gadgets.</h2><p className="home-section-subtitle">A few things worth taking a closer look at.</p></div><button className="home-text-link" onClick={onShop}>View all products <ArrowRight size={16}/></button></div><div className="product-grid home-featured-grid">{featured.map(product=><ProductCard key={product.id} product={product} money={money} onProduct={onProduct} onEnquire={onEnquire} onAdd={onAdd}/>)}</div></section>

  </div>;
}
