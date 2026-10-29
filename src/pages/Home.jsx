import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home({ products, money, onShop, onProduct, onAdd, onContact }) {
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
    let closestIndex = 0;
    let closestDistance = Infinity;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const distance = Math.abs((rect.left + rect.width / 2) - viewportCenter);
      if (distance < closestDistance) { closestDistance = distance; closestIndex = index; }
    });
    setActiveIndex(current => current === closestIndex ? current : closestIndex);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const handleKeys = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); goToProduct(activeIndex + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); goToProduct(activeIndex - 1); }
      if (event.key === 'Home') { event.preventDefault(); goToProduct(0); }
      if (event.key === 'End') { event.preventDefault(); goToProduct(featured.length - 1); }
    };
    slider.addEventListener('keydown', handleKeys);
    return () => slider.removeEventListener('keydown', handleKeys);
  }, [activeIndex, featured.length, goToProduct]);

  return <div className="page-home">
    <section className="hero hero-phone-launch hero-product-launch">
      <div className="hero-launch-copy">
        <p className="eyebrow">PREMIUM GADGETS. BETTER LIVING.</p>
        <h1>The latest tech,<br />for your world.</h1>
        <p className="hero-description">Phones, laptops, gaming and more — trusted brands, curated for you.</p>
        <div className="hero-buttons">
          <button className="button button-dark" onClick={onShop}>Shop Now <ArrowRight size={17} /></button>
          <button className="button button-light" onClick={onContact}>Get in touch</button>
        </div>
        <div className="hero-proof"><span className="proof-check"><Check size={14} /></span><span>Personal service. Multi-brand choice. Easy WhatsApp enquiries.</span></div>
      </div>

      <div className="hero-product-area" aria-label="Featured products">
        <button className="hero-product-arrow hero-product-arrow-left" type="button" onClick={() => goToProduct(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous product"><ChevronLeft size={22} /></button>
        <div className="hero-product-viewport" ref={sliderRef} onScroll={updateActiveFromScroll} tabIndex={0} role="region" aria-label="Featured products carousel. Use left and right arrow keys to browse.">
          <div className="hero-product-track">
            {featured.map((product, index) => <article className={`hero-product-card${index === activeIndex ? ' is-active' : ''}`} key={product.id} ref={node => { cardRefs.current[index] = node; }}>
              <button className="hero-product-select" type="button" onClick={() => { if (index === activeIndex) onProduct(product); else goToProduct(index); }} aria-label={index === activeIndex ? `View ${product.name} details` : `Feature ${product.name}`}>
                <span className="hero-product-image"><img src={product.image} alt={product.name} loading={index > 1 ? 'lazy' : 'eager'} /></span>
                <span className="hero-product-name">{product.name}</span>
                <span className="hero-product-price">{money(product.price)}</span>
              </button>
              {index === activeIndex && <button className="hero-product-details" type="button" onClick={() => onProduct(product)}>View details <ArrowRight size={13} /></button>}
            </article>)}
          </div>
        </div>
        <button className="hero-product-arrow hero-product-arrow-right" type="button" onClick={() => goToProduct(activeIndex + 1)} disabled={activeIndex === featured.length - 1} aria-label="Next product"><ChevronRight size={22} /></button>
        <div className="hero-product-pagination" aria-label="Choose featured product">{featured.map((product, index) => <button key={product.id} type="button" onClick={() => goToProduct(index)} className={index === activeIndex ? 'is-active' : ''} aria-label={`Show ${product.name}`} aria-current={index === activeIndex ? 'true' : undefined} />)}</div>
      </div>
    </section>

    <section className="category-strip" aria-label="Shop categories">
      <button onClick={onShop}>Phones <ArrowRight size={16} /></button>
      <button onClick={onShop}>Laptops <ArrowRight size={16} /></button>
      <button onClick={onShop}>Gaming & accessories <ArrowRight size={16} /></button>
    </section>

    <section className="why-section section-pad"><div className="why-intro"><p className="eyebrow">THE LITTLEFINGER WAY</p><h2>Buying tech should feel <em>simple.</em></h2><p>Not sure which device is right for you? Ask questions before you decide. We want choosing technology to feel clear and personal.</p></div><div className="why-points"><div><span>01</span><section><b>Choose with confidence</b><p>Ask questions about products before you order.</p></section></div><div><span>02</span><section><b>Easy ordering</b><p>Send your enquiry straight to WhatsApp.</p></section></div><div><span>03</span><section><b>Personal service</b><p>Confirm availability and delivery directly with the store.</p></section></div></div></section>

    <section className="guides-section section-pad"><div className="section-heading"><div><p className="eyebrow">THE LITTLEFINGER JOURNAL</p><h2>Small tips. <em>Smarter tech.</em></h2><p className="section-subtitle">Helpful ideas for getting more from your devices.</p></div></div><div className="guide-grid"><article className="guide-card"><div className="guide-number">01 / IPHONE</div><h3>Help your iPhone battery last longer</h3><p>Understand battery health, heat and charging habits.</p></article><article className="guide-card"><div className="guide-number">02 / MAC</div><h3>Getting started with a MacBook</h3><p>Updates, backups and shortcuts for everyday work.</p></article><article className="guide-card"><div className="guide-number">03 / BUYING GUIDE</div><h3>What to check before buying a used phone</h3><p>Verify model, storage, network status and condition.</p></article></div></section>
  </div>;
}
