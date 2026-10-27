import React from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
const categories=['All products','Phones','Laptops','Accessories'];
export default function Shop({products, money, category, setCategory, search, setSearch, onProduct, onEnquire, onAdd}) {
 return <div className="page-content"><section className="inner-page-hero page-hero-shop"><p className="eyebrow">LITTLEFINGER / THE COLLECTION</p><h1>Find your next <em>favourite.</em></h1><p>Explore phones, laptops and accessories from different brands. Ask us to confirm current price and availability.</p></section>
 <section className="shop-section section-pad"><div className="shop-toolbar"><div className="category-tabs">{categories.map(c=><button key={c} className={category===c?'tab active':'tab'} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search gadgets..."/></label></div><div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p} money={money} onProduct={onProduct} onEnquire={onEnquire} onAdd={onAdd}/>)}</div>{!products.length&&<div className="empty-state">No gadgets found. Try another search or category.</div>}<p className="demo-note">Demo catalogue: confirm actual product models, prices and availability with Littlefinger before publishing.</p></section></div>;
}
