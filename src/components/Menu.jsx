import { useEffect, useRef, useState } from 'react';
import CamelCourierBanner from './CamelCourierBanner';
import ProductSlider from './ProductSlider';

/* ─── TYPEWRITER COMPONENT — word by word ─── */
function TypewriterText({ text, className = '', delayMs = 180, startDelay = 0 }) {
  const [visibleWords, setVisibleWords] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    let timer;
    const start = setTimeout(() => {
      let count = 0;
      timer = setInterval(() => {
        count++;
        setVisibleWords(count);
        if (count >= words.length) clearInterval(timer);
      }, delayMs);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [words.length, delayMs, startDelay]);

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="typewriter-word"
          style={{
            opacity: i < visibleWords ? 1 : 0,
            transform: i < visibleWords ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            display: 'inline-block',
            marginRight: '0.28em',
          }}
        >
          {word}
        </span>
      ))}
      <span
        className="typewriter-cursor"
        style={{
          display: visibleWords < words.length ? 'inline-block' : 'none',
          animation: 'blink-cursor 0.75s step-end infinite',
          borderRight: '3px solid var(--color-ink)',
          marginLeft: '2px',
          height: '0.85em',
          verticalAlign: 'text-bottom',
        }}
      />
    </span>
  );
}

const Menu = ({ introComplete = true }) => {
  const menuCategories = [
    {
      title: "Hot Sips",
      desc: "Sunset Ingredients, High Quality Sugar, Full Cream Milk / No Water",
      funny: "Chai Peene Se Kaale hota hai kya? Chalo Aaj PK Dekhte Hai",
      items: [
        { name: "Desi Chai", desc: "", tall: 15, grande: 20 },
        { name: "Adrak Chai", desc: "Chef Special", tall: 20, grande: 25 },
        { name: "Adrak Elaichi Chai", desc: "", tall: 25, grande: 30 },
        { name: "Masala Chai", desc: "", tall: 25, grande: 30 }
      ]
    },
    {
      title: "Coffee-Sips",
      desc: "Brown Sugar / Sulphur Free Sugar, Toned Milk",
      funny: "Kanpuriya Style",
      items: [
        { name: "Espresso", desc: "Beans Shot", tall: 29, grande: 49 },
        { name: "Doppio", desc: "Espresso + Espresso", tall: 29, grande: 49 },
        { name: "Americano", desc: "Hot Water + Espresso Shot", tall: 29, grande: 49 },
        { name: "Desi Coffee", desc: "Milk Base Coffee", tall: 29, grande: 49 },
        { name: "Cappuccino", desc: "Foam + Milk + Espresso", tall: 39, grande: 59 },
        { name: "Irish Coffee", desc: "Foam + Irish + Milk + Espresso", tall: 59, grande: 79 },
        { name: "Latte Macchiato", desc: "Foam + Espresso + Milk", tall: 79, grande: 99 }
      ]
    },
    {
      title: "Hue of Teas",
      desc: "Non-Milk Base, No-Sugar No-Honey, Bitter in Taste",
      funny: "Ye PK Star Banuga",
      items: [
        { name: "Black Tea", desc: "Elaichi / Black Pepper / Mood Booster", tall: 29, grande: 39 },
        { name: "Green Tea", desc: "High in Antioxidant", tall: 39, grande: 59 },
        { name: "Blue Tea", desc: "Aparajita Phool... Good for Kidney", tall: 59, grande: 69 },
        { name: "Pink Tea", desc: "Rose Hibiscus Tea... Good for Immunity System", tall: 69, grande: 89 },
        { name: "Hung Chow Tea", desc: "Chinese Tea... Good for Skin/Hair", tall: 69, grande: 89 }
      ]
    },
    {
      title: "Detox Sip",
      desc: "Slow steeped for 24 hours in processed water",
      funny: "Aaj Body ki Servicing Karani Hai",
      items: [
        { name: "Detox - Box", desc: "", tall: 49, grande: 79 },
        { name: "Fruit - Detox", desc: "", tall: 79, grande: 99 },
        { name: "Giloye - Gun", desc: "", tall: 49, grande: 79 }
      ]
    },
    {
      title: "Milk Corner",
      desc: "Full Cream / Toned Milk, Sulphur Free Sugar",
      funny: "Teste Ke Saath, Health Bhi Dekho",
      items: [
        { name: "Chocolate Milk", desc: "", tall: 69, grande: 79 },
        { name: "Dry-Hard Milk", desc: "Dry Fruits", tall: 79, grande: 89 },
        { name: "Kesar Badam Milk", desc: "Chef Special", tall: 89, grande: 99 }
      ]
    },
    {
      title: "Bonceless Cocktails",
      desc: "Premium Soda / Diet Soda, Sulphur Free Sugar, Premium Flavours",
      funny: "Dosto Ye Wala Cocktail Kaisa Hota Hai",
      items: [
        { name: "Pacific Blue Temperance", desc: "", tall: 49, grande: 59 },
        { name: "Virgin Mojito", desc: "", tall: 59, grande: 69 },
        { name: "Green Mint", desc: "Chef Special", tall: 59, grande: 69 },
        { name: "Green Apple", desc: "", tall: 69, grande: 79 },
        { name: "Watermelon", desc: "", tall: 69, grande: 79 }
      ]
    },
    {
      title: "Cold Brew",
      desc: "Slow Steeped for 18 hours",
      funny: "Coffee Walo Ka Pagalpan",
      items: [
        { name: "Iced Americano", desc: "", tall: 59, grande: 69 },
        { name: "Irish Iced Americano", desc: "", tall: 69, grande: 79 },
        { name: "Cold Brew Dark Hard", desc: "", tall: 69, grande: 79 },
        { name: "Vanilla Cold Brew", desc: "", tall: 79, grande: 89 },
        { name: "Premium Cold Brew Coffee", desc: "Chef Special", tall: 89, grande: 99 }
      ]
    },
    {
      title: "Shakes",
      desc: "Brown/Sulphur Free Sugar, Toned Milk, Raw Flavours, Ice-Cream",
      funny: "Chalo Kuch Meetha Ho Jaye",
      items: [
        { name: "Iced Chocolate", desc: "", tall: 69, grande: 79 },
        { name: "Butter Scotch", desc: "", tall: 79, grande: 89 },
        { name: "Oreo-Oak", desc: "", tall: 89, grande: 99 },
        { name: "Strawberry", desc: "Chef Special", tall: 99, grande: 119 },
        { name: "Iced Blue Berry", desc: "Chef Special", tall: 119, grande: 129 }
      ]
    },
    {
      title: "Frappuccino",
      desc: "Premium Cocoa Powder, Dark Chocolate, Fat Free Milk, Premium Sugar, Top Notch Blended Flavours",
      funny: "Chalo Style Maarte Aate Hai",
      items: [
        { name: "Cafe Frappe with Cloudy Cream", desc: "Chef Special", tall: 79, grande: 99 },
        { name: "Mocha with Chocochip", desc: "Chef Special", tall: 89, grande: 109 },
        { name: "Java Chip", desc: "", tall: 89, grande: 109 },
        { name: "Hazelnut Mocha with Crackers", desc: "", tall: 99, grande: 119 },
        { name: "Caramel Crown Mocha with Vanilla Chip", desc: "", tall: 99, grande: 119 }
      ]
    },
    {
      title: "Smoothies",
      desc: "Chia Seeds, Fresh Fruit (Organic Farms), Toned/Full Cream Milk",
      funny: "Fruit Khane Ka Naya Style",
      items: [
        { name: "Strawberry Smoothies", desc: "", tall: 99, grande: 119 },
        { name: "Blueberry Smoothies", desc: "Chef Special", tall: 99, grande: 119 }
      ]
    },
    {
      title: "Fresh FruitBall",
      desc: "Fresh bowls and crunch, straight from the cart",
      funny: "Thoda meetha, thoda chatpata",
      items: [
        { name: "Cream Berry Granola", desc: "", tall: 89, grande: 109 },
        { name: "Blue Berry and Grapes", desc: "", tall: 89, grande: 109 }
      ]
    },
    {
      title: "Smoothie Sip",
      desc: "Blended fruit, full cream or toned milk — sip slow",
      funny: "Gala taazaa, mood halka",
      items: [
        { name: "Blue Berry Smoothie", desc: "", tall: 99, grande: 119 },
        { name: "Cream Berry Smoothie", desc: "", tall: 99, grande: 119 },
        { name: "Strawberry Smoothie", desc: "", tall: 99, grande: 119 },
        { name: "Mix Berry Smoothie", desc: "", tall: 99, grande: 119 }
      ]
    }
  ];

  return (
    <section className="relative min-h-screen py-16 md:py-24 px-4 sm:px-6 w-full max-w-7xl mx-auto">

      {/* --- DECORATIVE LOW OPACITY CLIENT ASSETS --- */}
      {/* Aeroplane — top right */}
      <div className="fixed top-6 right-6 md:top-10 md:right-10 z-0 pointer-events-none animate-float opacity-[0.55] mix-blend-multiply" style={{ animationDelay: '0s' }}>
        <img
          src="/assets/aeroplane.png"
          alt=""
          className="decor-img w-56 md:w-80 rotate-[-6deg]"
        />
      </div>
      {/* Bicycle — bottom left */}
      <div className="fixed bottom-6 left-4 md:bottom-12 md:left-10 z-0 pointer-events-none animate-float-slow opacity-[0.5] mix-blend-multiply" style={{ animationDelay: '1s' }}>
        <img
          src="/assets/bicycle.png"
          alt=""
          className="decor-img w-72 md:w-[450px] rotate-[-8deg]"
        />
      </div>
      {/* Teapot — middle right */}
      <div className="fixed top-[48%] right-0 md:right-6 z-0 pointer-events-none animate-float opacity-[0.48] mix-blend-multiply" style={{ animationDelay: '2.5s' }}>
        <img
          src="/assets/teapot.png"
          alt=""
          className="decor-img w-72 md:w-[500px] rotate-[12deg]"
        />
      </div>
      {/* Leaves — top left */}
      <div className="fixed -top-6 -left-6 md:-top-10 md:-left-10 z-0 pointer-events-none animate-float-slow opacity-[0.45] mix-blend-multiply" style={{ animationDelay: '0.5s' }}>
        <img
          src="/assets/leaves.png"
          alt=""
          className="decor-img w-64 md:w-[400px] rotate-[-25deg]"
        />
      </div>
      {/* Leaves — bottom right */}
      <div className="fixed -bottom-6 -right-6 md:-bottom-12 md:-right-12 z-0 pointer-events-none animate-float opacity-[0.45] mix-blend-multiply" style={{ animationDelay: '1.5s' }}>
        <img
          src="/assets/leaves.png"
          alt=""
          className="decor-img w-80 md:w-[500px] rotate-[145deg]"
        />
      </div>

      {/* --- MAIN MENU CONTENT UI --- */}
      <div
        className={`relative z-10 w-full max-w-4xl lg:max-w-5xl mx-auto border-4 border-ink p-6 sm:p-8 md:p-16 bg-transparent ${introComplete ? 'animate-menu-reveal' : 'opacity-0 pointer-events-none select-none'}`}
      >

        {/* Corner Ornaments for the border */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>

        {/* ─── TITLE with typewriter animation ─── */}
        <div className="text-center mb-6">
          <div className="inline-block relative">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif italic font-medium text-ink uppercase tracking-wider mb-2 drop-shadow-sm">
              {introComplete ? (
                <TypewriterText text="Ancient Sip" delayMs={280} startDelay={400} />
              ) : (
                'Ancient Sip'
              )}
            </h1>
            <div className="absolute -left-10 md:-left-16 top-1/2 -mt-[1px] w-8 md:w-12 border-t-[3px] border-ink hidden sm:block"></div>
            <div className="absolute -right-10 md:-right-16 top-1/2 -mt-[1px] w-8 md:w-12 border-t-[3px] border-ink hidden sm:block"></div>
          </div>
        </div>

        {/* ─── CARAVAN BANNER — reduced top margin ─── */}
        <div className="mb-4 max-w-2xl mx-auto flex justify-center">
          <CamelCourierBanner active={introComplete} />
        </div>

        {/* ─── PRODUCT SLIDER ─── */}
        <div className="mb-16">
          <ProductSlider />
        </div>

        <div className="space-y-20">
          {menuCategories.map((category, catIdx) => (
            <div key={catIdx} className="relative">

              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-serif italic text-ink inline-block px-6 border-b-2 border-double border-ink relative z-10 mb-4">
                  {category.title}
                </h2>
                {category.desc && (
                  <p className="font-typewriter text-[10px] md:text-xs tracking-widest uppercase text-ink-light mx-auto max-w-2xl px-4 opacity-80 mb-2">
                    {category.desc}
                  </p>
                )}
                {category.funny && (
                  <p className="font-serif italic text-sm md:text-base text-ink mx-auto max-w-xl px-4 opacity-90">
                    "{category.funny}"
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col group relative">
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="flex-1 pr-4 text-left">
                        <h3 className="font-serif font-bold text-xl text-ink leading-tight">
                          {item.name}
                        </h3>
                        {item.desc && (
                          <p className="font-typewriter text-xs text-ink-light italic opacity-85 leading-snug mt-1">
                            ({item.desc})
                          </p>
                        )}
                      </div>

                      {/* Dotted Leader (hidden on mobile, visible on larger screens) */}
                      <div className="hidden sm:flex flex-grow border-b-2 border-dotted border-ink/40 mx-4 relative top-[-8px]"></div>

                      {/* Prices layout */}
                      <div className="flex items-center space-x-6 shrink-0 text-right">
                        <div className="flex flex-col items-center">
                          <span className="font-typewriter text-[9px] uppercase tracking-widest opacity-60 mb-0.5">Tall</span>
                          <span className="font-serif font-bold text-lg text-ink whitespace-nowrap">₹{item.tall}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="font-typewriter text-[9px] uppercase tracking-widest opacity-60 mb-0.5">Grande</span>
                          <span className="font-serif font-bold text-lg text-ink whitespace-nowrap">₹{item.grande}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {catIdx < menuCategories.length - 1 && (
                <div className="w-full flex justify-center mt-14 mb-[-1rem] opacity-50">
                  <span className="text-ink">☙ ✤ ❧</span>
                </div>
              )}

            </div>
          ))}
        </div>

        <div className="mt-24 pt-6 border-t-[3px] border-double border-ink text-center font-typewriter text-xs tracking-widest text-ink-light">
          ««««o»»»» PLEASE ORDER AT THE COUNTER ««««o»»»»
        </div>

      </div>
    </section>
  );
};

export default Menu;
