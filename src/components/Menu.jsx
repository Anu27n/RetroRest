const Menu = () => {
  const menuCategories = [
    {
      title: "Starters",
      items: [
        { name: "Vintage Samosa Platter", desc: "Crisp pastry filled with spiced potatoes and peas, served with mint chutney.", price: "180" },
        { name: "Wood-Fired Garlic Bread", desc: "Artisan bread toasted with herb garlic butter and aged cheese.", price: "220" },
        { name: "Heritage Onion Bhaji", desc: "Thinly sliced onions fried in a spiced gram flour batter.", price: "150" }
      ]
    },
    {
      title: "Main Course",
      items: [
        { name: "Grandmother's Chicken Curry", desc: "Slow-cooked chicken in a rich, aromatic tomato and onion gravy.", price: "450" },
        { name: "Classic Paneer Tikka Masala", desc: "Cubes of cottage cheese smoked and simmered in a spiced cream sauce.", price: "380" },
        { name: "Rustic Dal Makhani", desc: "Black lentils and kidney beans slow-cooked overnight with butter and cream.", price: "290" },
        { name: "Mutton Rogan Josh", desc: "Tender lamb cooked in classic Kashmiri spices and yogurt.", price: "520" }
      ]
    },
    {
      title: "Desserts",
      items: [
        { name: "Saffron Rice Pudding", desc: "Creamy rice pudding infused with pure saffron and almonds.", price: "190" },
        { name: "Rose Water Gulab Jamun", desc: "Deep-fried milk dumplings soaked in a fragrant rose syrup.", price: "160" },
        { name: "Classic Chocolate Mud Cake", desc: "Dense, flourless chocolate cake served with vanilla bean ice cream.", price: "250" }
      ]
    },
    {
      title: "Beverages",
      items: [
        { name: "Ancient Sip Signature Tea", desc: "Our exclusive house blend of premium black tea and secret spices.", price: "120" },
        { name: "Fresh Lime Soda", desc: "Refreshing sweet and salty sparkling lime drink.", price: "90" },
        { name: "Hand-Crafted Cold Coffee", desc: "Rich espresso blended with milk, ice, and a touch of roasted chicory.", price: "180" }
      ]
    }
  ];

  return (
    <section className="relative min-h-screen py-16 md:py-24 px-4 sm:px-6 w-full max-w-7xl mx-auto">
      
      {/* --- DECORATIVE LOW OPACITY CLIENT ASSETS --- */}
      {/* Aeroplane at the top right sky */}
      <img 
        src="/assets/aeroplane.png" 
        alt="Decorative aeroplane" 
        className="fixed top-8 right-8 md:top-12 md:right-12 w-56 md:w-80 opacity-[0.85] blur-[0.5px] contrast-[1.3] brightness-[1.15] saturate-[1.5] mix-blend-multiply rotate-[-6deg] pointer-events-none z-0"
      />
      {/* Bicycle anchored at the bottom left */}
      <img 
        src="/assets/bicycle.png" 
        alt="Decorative bicycle" 
        className="fixed bottom-6 left-6 md:bottom-12 md:left-12 w-72 md:w-[450px] opacity-[0.85] blur-[0.5px] contrast-[1.3] brightness-[1.15] saturate-[1.5] mix-blend-multiply rotate-[-8deg] pointer-events-none z-0" 
      />
      {/* Teapot sitting midway on the right (watermark feel) */}
      <img 
        src="/assets/teapot.png" 
        alt="Decorative teapot" 
        className="fixed top-[35%] right-[-5%] md:right-4 w-72 md:w-[500px] opacity-[0.75] blur-[0.8px] contrast-[1.3] brightness-[1.15] saturate-[1.5] mix-blend-multiply rotate-[12deg] pointer-events-none z-0" 
      />
      {/* Leaves balancing the corners */}
      <img 
        src="/assets/leaves.png" 
        alt="Decorative leaves top left" 
        className="fixed -top-10 -left-10 md:-top-16 md:-left-16 w-64 md:w-[400px] opacity-[0.75] blur-[1px] contrast-[1.3] brightness-[1.15] saturate-[1.5] mix-blend-multiply rotate-[-25deg] pointer-events-none z-0" 
      />
      <img 
        src="/assets/leaves.png" 
        alt="Decorative leaves bottom right" 
        className="fixed -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-80 md:w-[500px] opacity-[0.75] blur-[1px] contrast-[1.3] brightness-[1.15] saturate-[1.5] mix-blend-multiply rotate-[145deg] pointer-events-none z-0" 
      />

      {/* --- MAIN MENU CONTENT UI --- */}
      <div className="relative z-10 w-full max-w-4xl mx-auto border-4 border-ink p-8 md:p-16 bg-transparent">
        
        {/* Corner Ornaments for the border */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>

        <div className="text-center mb-16">
          <div className="inline-block relative">
             <h1 className="text-6xl md:text-8xl font-serif text-ink uppercase tracking-[0.1em] mb-4">
                Ancient Sip Bistro
             </h1>
             <div className="absolute -left-12 top-1/2 -mt-[1px] w-8 border-t-2 border-ink hidden md:block"></div>
             <div className="absolute -right-12 top-1/2 -mt-[1px] w-8 border-t-2 border-ink hidden md:block"></div>
          </div>
          <p className="font-typewriter text-sm tracking-[0.3em] text-ink-light uppercase border-y border-ink py-2 inline-block">
            Est. 1998 • First Class Fare
          </p>
        </div>

        <div className="space-y-16">
          {menuCategories.map((category, catIdx) => (
            <div key={catIdx} className="relative">
              
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-serif italic text-ink inline-block bg-vintage/90 px-6 border-b-2 border-double border-ink relative z-10">
                  {category.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col group relative">
                    
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-serif font-bold text-xl text-ink pr-2">
                        {item.name}
                      </h3>
                      <div className="flex-grow border-b-2 border-dotted border-ink/40 mx-2 relative top-[-6px]"></div>
                      <span className="font-typewriter font-bold text-lg text-ink pl-2 whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>
                    
                    <p className="font-typewriter text-xs text-ink-light tracking-wide italic opacity-85 leading-snug mb-4">
                      {item.desc}
                    </p>

                    <button 
                      type="button"
                      className="mt-auto self-start px-4 py-1.5 border border-ink text-[10px] font-sans font-bold uppercase tracking-widest bg-vintage hover:bg-ink hover:text-vintage transition-colors shadow-[2px_2px_0px_#2C1A12] hover:shadow-[1px_1px_0px_#2C1A12] hover:translate-x-[1px] hover:translate-y-[1px]"
                      onClick={() => alert(`Added ${item.name} to cart`)}
                    >
                      Add to Cart
                    </button>
                    
                  </div>
                ))}
              </div>
              
              {catIdx < menuCategories.length - 1 && (
                <div className="w-full flex justify-center mt-12 mb-[-1rem] opacity-50">
                  <span className="text-ink">☙ ✤ ❧</span>
                </div>
              )}

            </div>
          ))}
        </div>

        <div className="mt-20 pt-6 border-t-[3px] border-double border-ink text-center font-typewriter text-xs tracking-widest text-ink-light">
          ««««o»»»» PLEASE ORDER AT THE COUNTER ««««o»»»»
        </div>

      </div>
    </section>
  );
};

export default Menu;
