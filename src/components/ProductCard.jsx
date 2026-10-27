import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
export default function ProductCard({product, money, onProduct, onEnquire, onAdd}) {
 return <article className="product-card" key={product.id}>
  <div className="product-image" onClick={()=>onProduct(product)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' ')onProduct(product)}} aria-label={`View ${product.name} details`}>
   <img src={product.image} alt={product.name} loading="lazy"/>{product.tag&&<span className="product-tag">{product.tag}</span>}
   {onAdd&&<button className="quick-add" aria-label={`Add ${product.name} to bag`} onClick={e=>{e.stopPropagation();onAdd(product)}}><Plus size={19}/></button>}
  </div>
  <div className="product-meta"><span>{product.category}</span><span className="availability"><i/> Ask for availability</span></div>
  <h3 className="product-title-click" onClick={()=>onProduct(product)}>{product.name}</h3><p className="product-description">{product.description}</p>
  <div className="product-bottom"><strong>{money(product.price)}</strong><button className="product-order" onClick={()=>onEnquire(product)}>Enquire <ArrowRight size={15}/></button></div>
 </article>;
}
