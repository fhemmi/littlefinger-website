import React, { useCallback, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function Home({ products, money, onShop, onProduct, onEnquire, onAdd, onContact }) {
  const featured = products.slice(0, 6);
  const sliderRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(1);

  const goToProduct = useCallback((index) => {
    const safeIndex = Math.max(0, Math.min(index, featured.length - 1));
    setActiveIndex(safeIndex);
    cardRefs.current[safeIndex]?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [featured.length]);

  const updateActiveFromScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const viewportCenter = sliderRef.current.getBoundingClientRect().left + sliderRef.current.clientWidth / 2;
    let closestIndex = activeIndex;
    let closestDistance = Infinity;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const distance = Math.abs((rect.left + rect.width / 2) - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveIndex(current => current === closestIndex ? current : closestIndex);
  }, [activeIndex]);

  return <div className="page-home">
    <section className="hero hero-phone-launch">
      <div className="hero-launch-copy">
        <p className="eyebrow">LITTLEFINGER · YOUR EVERYDAY TECH STORE</p>
        <h1>Good tech.<br/><em>Better living.</em></h1>
        <p className="hero-description">Explore phones, laptops and accessories from the brands you love — thoughtfully presented, easy to compare, and just one message away.</p>
        <div className="hero-buttons hero-buttons-centered">
          <button className="button button-light" onClick={onContact}>Get in touch <ArrowRight size={17}/></button>
          <button className="button button-dark" onClick={onShop}>Explore the collection <ArrowRight size={17}/></button>
        </div>
        <div className="hero-proof"><span className="proof-check"><Check size={14}/></span><span>Personal service. Multi-brand choice. Easy WhatsApp enquiries.</span></div>
      </div>
    </section>

    <section className="category-strip" aria-label="Shop categories">
      <button onClick={onShop}>Phones <ArrowRight size={16}/></button>
      <button onClick={onShop}>Laptops <ArrowRight size={16}/></button>
      <button onClick={onShop}>Accessories <ArrowRight size={16}/></button>
    </section>

    <section className="shop-section section-pad homepage-showcase">
      <div className="section-heading">
        <div><p className="eyebrow">THE LITTLEFINGER EDIT</p><h2>Find your next <em>favourite.</em></h2><p className="section-subtitle">A considered selection of tech for everyday life.</p></div>
        <button className="view-all" onClick={onShop}>View all products <ArrowRight size={16}/></button>
      </div>

      <div className="showcase-controls" aria-label="Product carousel controls">
        <p>Explore the collection</p>
        <div>
          <button type="button" onClick={() => goToProduct(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous product"><ArrowLeft size={18}/></button>
          <button type="button" onClick={() => goToProduct(activeIndex + 1)} disabled={activeIndex === featured.length - 1} aria-label="Next product"><ArrowRight size={18}/></button>
        </div>
      </div>

      <div className="showcase-viewport" ref={sliderRef} onScroll={updateActiveFromScroll}>
        <div className="showcase-track">
          {featured.map((product, index) => <article
            className={`showcase-product${index === activeIndex ? ' is-active' : ''}`}
            key={product.id}
            ref={node => { cardRefs.current[index] = node; }}
          >
            <button className="showcase-product-open" type="button" onClick={() => onProduct(product)} aria-label={`View ${product.name} details`}>
              <span className="showcase-image"><img src={product.image} alt={product.name} loading={index > 1 ? 'lazy' : 'eager'} /></span>
              <span className="showcase-product-copy"><span className="showcase-category">{product.category}</span><strong>{product.name}</strong><span className="showcase-price">{money(product.price)}</span></span>
            </button>
            <button className="showcase-quick-add" type="button" onClick={() => onAdd(product)}>Add to bag <ArrowRight size={14}/></button>
          </article>)}
        </div>
      </div>
      <div className="showcase-pagination" aria-label="Choose featured product">
        {featured.map((product, index) => <button key={product.id} type="button" onClick={() => goToProduct(index)} className={index === activeIndex ? 'is-active' : ''} aria-label={`Show ${product.name}`} aria-current={index === activeIndex ? 'true' : undefined} />)}
      </div>
    </section>

    <section className="why-section section-pad"><div className="why-intro"><p className="eyebrow">THE LITTLEFINGER WAY</p><h2>Buying tech should feel <em>simple.</em></h2><p>Not sure which device is right for you? Ask questions before you decide. We want choosing technology to feel clear and personal.</p></div><div className="why-points"><div><span>01</span><section><b>Choose with confidence</b><p>Ask questions about products before you order.</p></section></div><div><span>02</span><section><b>Easy ordering</b><p>Send your enquiry straight to WhatsApp.</p></section></div><div><span>03</span><section><b>Personal service</b><p>Confirm availability and delivery directly with the store.</p></section></div></div></section>

    <section className="guides-section section-pad"><div className="section-heading"><div><p className="eyebrow">THE LITTLEFINGER JOURNAL</p><h2>Small tips. <em>Smarter tech.</em></h2><p className="section-subtitle">Helpful ideas for getting more from your devices.</p></div></div><div className="guide-grid"><article className="guide-card"><div className="guide-number">01 / IPHONE</div><h3>Help your iPhone battery last longer</h3><p>Understand battery health, heat and charging habits.</p></article><article className="guide-card"><div className="guide-number">02 / MAC</div><h3>Getting started with a MacBook</h3><p>Updates, backups and shortcuts for everyday work.</p></article><article className="guide-card"><div className="guide-number">03 / BUYING GUIDE</div><h3>What to check before buying a used phone</h3><p>Verify model, storage, network status and condition.</p></article></div></section>
  </div>;
}
