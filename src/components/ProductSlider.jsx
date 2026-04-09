import { useEffect, useRef, useState } from 'react';

const PRODUCTS = [
  {
    name: 'Baklava Tea',
    tagline: 'A royal blend of Turkish heritage',
    img: '/assets/baklavatea.png',
  },
  {
    name: 'English Breakfast Tea',
    tagline: 'Classic malt, morning ritual',
    img: '/assets/englishbreakfasttea.png',
  },
  {
    name: 'Mineral Water',
    tagline: 'Pure mountain spring, zero impurities',
    img: '/assets/water.png',
  },
  {
    name: 'Organic Honey',
    tagline: 'Raw, unfiltered sweetness from the hive',
    img: '/assets/honey.png',
  },
];

export default function ProductSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1=right, -1=left
  const timerRef = useRef(null);

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % PRODUCTS.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Reset timer on manual nav
  const handleNav = (fn) => () => {
    clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(next, 5000);
  };

  const product = PRODUCTS[current];

  return (
    <div className="product-slider">
      <h2 className="product-slider__heading">Our Products</h2>
      <div className="product-slider__ornament">☙ ✤ ❧</div>

      <div className="product-slider__viewport">
        {/* Card */}
        <div
          className="product-slider__card"
          key={current}
          style={{
            animation: `product-slide-in-${direction === 1 ? 'right' : 'left'} 0.55s ease-out`,
          }}
        >
          <div className="product-slider__img-wrap">
            <img
              src={product.img}
              alt={product.name}
              className="product-slider__img"
            />
          </div>
          <div className="product-slider__info">
            <h3 className="product-slider__name">{product.name}</h3>
            <p className="product-slider__tagline">{product.tagline}</p>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="product-slider__dots">
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`product-slider__dot ${i === current ? 'product-slider__dot--active' : ''}`}
            onClick={handleNav(() => goTo(i))}
            aria-label={`Go to product ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
