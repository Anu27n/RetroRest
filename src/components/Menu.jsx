const Menu = () => {
  const menuSections = [
    {
      title: "Starters & Appetizers",
      items: [
        { name: "Rustic Garlic Hearth Bread", desc: "Fire-baked sourdough with vintage herb butter", price: "240" },
        { name: "Heritage Stuffed Mushrooms", desc: "Earthy mushrooms with house-cured cheese and spice", price: "320" },
        { name: "Spiced Lentil Croquettes", desc: "Golden fried, served with tamarind reduction", price: "280" }
      ]
    },
    {
      title: "The Main Course",
      items: [
        { name: "Slow-Braised Root Stew", desc: "Simmered for 12 hours with ground native spices", price: "550" },
        { name: "Clay Oven Roasted Heritage Fowl", desc: "Smoked over wood chips, glazed in wild honey", price: "720" },
        { name: "Artisan Hand-rolled Pasta", desc: "Tossed in burnt butter, sage, and aged hard cheese", price: "480" }
      ]
    },
    {
      title: "Desserts & Confections",
      items: [
        { name: "Classic Saffron Pudding", desc: "Rich reduced milk, pistachios, pure saffron threads", price: "320" },
        { name: "Wood-fired Fruit Tart", desc: "Seasonal berries in a crumbly shortcrust pastry", price: "290" }
      ]
    },
    {
      title: "Beverages",
      items: [
        { name: "Bistro's House Brew", desc: "Our signature dark roast filter coffee", price: "180" },
        { name: "Spiced Apple Cider", desc: "Pressed apples, cinnamon bark, served warm", price: "220" }
      ]
    }
  ];

  return (
    <section id="menu" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 relative">
      
      {/* Decorative background sketch watermarks */}
      <div className="absolute top-10 left-0 text-ink opacity-[0.04] text-[12rem] pointer-events-none rotate-[30deg] font-serif">
        ❦
      </div>
      <div className="absolute bottom-[20%] right-[-5%] text-ink opacity-[0.04] text-[15rem] pointer-events-none -rotate-[15deg] font-serif">
        ☙
      </div>

      <div className="text-center mb-16 relative rotate-1">
        <h2 className="text-5xl lg:text-6xl font-serif text-ink uppercase tracking-[0.2em] relative z-10 inline-block bg-vintage px-8 border-[3px] border-double border-ink py-4">
          The Menu Board
        </h2>
        <div className="absolute top-1/2 left-0 w-full h-[2px] border-y border-ink border-dashed z-0 opacity-50"></div>
      </div>

      <div className="space-y-16">
        {menuSections.map((section, idx) => (
          <div key={idx} className={`relative p-8 border border-ink/40 shadow-[4px_4px_0px_#2C1A12] ${idx % 2 === 0 ? '-rotate-[1deg] bg-ink/5' : 'rotate-[1deg] bg-vintage-light/20'}`}>
            
            <h3 className="text-3xl lg:text-4xl font-serif text-ink mb-8 pb-4 border-b-[3px] border-double border-ink text-center uppercase tracking-widest flex items-center justify-center gap-4">
              <span className="text-xl opacity-60">✤</span>
              {section.title}
              <span className="text-xl opacity-60">✤</span>
            </h3>
            
            <ul className="space-y-8">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex flex-col group pl-2 border-l-2 border-ink/20 hover:border-ink/60 transition-colors">
                  <div className="flex justify-between items-baseline w-full">
                    {/* Item Name */}
                    <span className="font-serif font-bold text-2xl text-ink bg-transparent pr-2 flex items-center gap-2">
                       {item.name}
                    </span>
                    
                    {/* Dotted Leader */}
                    <span className="flex-grow border-b-2 border-dotted border-ink/60 mx-4 relative top-[-8px]"></span>
                    
                    {/* Price */}
                    <span className="font-typewriter text-xl font-bold text-ink bg-transparent pl-2">
                      ₹{item.price}
                    </span>
                  </div>
                  {/* Item Description */}
                  <span className="font-typewriter text-sm text-ink-light tracking-wide mt-2 italic opacity-90 inline-block w-3/4">
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
            
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default Menu;
