const Menu = () => {
  const menuCategories = [
    {
      title: "Starters",
      items: [
        { name: "Jaipuri Pyaaz Kachori", desc: "Crisp, flaky pastry stuffed with a spiced, caramelized onion filling.", price: "120" },
        { name: "Jodhpuri Mirchi Bada", desc: "Large green chilies stuffed with tangy potatoes, battered and golden fried.", price: "90" },
        { name: "Bikaneri Bhujia Chaat", desc: "Crispy lentil strings tossed with fresh tomatoes, coriander, and tamarind.", price: "140" }
      ]
    },
    {
      title: "Main Course",
      items: [
        { name: "Authentic Dal Bati Churma", desc: "Fire-baked wheat rounds served with pancha-mel dal and sweet crumbled churma.", price: "380" },
        { name: "Shahi Gatte Ki Sabzi", desc: "Tender gram flour dumplings simmered in a royal, spiced yogurt gravy.", price: "320" },
        { name: "Traditional Ker Sangri", desc: "Desert beans and wild berries slow-cooked in mustard oil and rustic spices.", price: "350" },
        { name: "Marwadi Kadhi Pakora", desc: "Spiced buttermilk curry with soft chickpea flour fritters.", price: "280" }
      ]
    },
    {
      title: "Desserts",
      items: [
        { name: "Mawa Malpua with Rabri", desc: "Golden fried pancakes soaked in saffron syrup, topped with clotted cream.", price: "220" },
        { name: "Moong Dal Halwa", desc: "Decadent yellow lentil pudding slow-roasted in pure desi ghee.", price: "240" },
        { name: "Classic Jaipur Ghevar", desc: "A honeycomb-like traditional sweet topped with silver leaf and pistachios.", price: "280" }
      ]
    },
    {
      title: "Beverages",
      items: [
        { name: "Ancient Sip Signature Tea", desc: "Our exclusive house blend of premium black tea and secret spices.", price: "120" },
        { name: "Kulhad Wali Lassi", desc: "Thick, churned sweet yogurt served chilled in an earthen clay pot.", price: "140" },
        { name: "Mint & Cumin Jaljeera", desc: "A deeply refreshing, spiced cooler perfect for the desert heat.", price: "90" }
      ]
    }
  ];

  return (
    <section className="relative min-h-screen py-16 md:py-24 px-4 sm:px-6 w-full max-w-7xl mx-auto">
      
      {/* --- DECORATIVE LOW OPACITY CLIENT ASSETS --- */}
      {/* Maharaja - Central Watermark/Theme */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-[0.2] mix-blend-multiply animate-float-slow">
        <img 
          src="/assets/maharaja.png" 
          alt="Traditional Maharaja" 
          className="w-[300px] md:w-[600px] contrast-[1.4] brightness-[1.1]"
        />
      </div>
      
      {/* Aeroplane floating in the top right sky */}
      <div className="fixed top-8 right-8 md:top-12 md:right-12 z-0 pointer-events-none animate-float opacity-[0.85] mix-blend-multiply" style={{ animationDelay: '0s' }}>
        <img 
          src="/assets/aeroplane.png" 
          alt="Decorative aeroplane" 
          className="w-56 md:w-80 blur-[0.2px] rotate-[-6deg] contrast-[1.8] brightness-[1.15]"
        />
      </div>
      {/* Bicycle anchored with a slow sway */}
      <div className="fixed bottom-6 left-6 md:bottom-12 md:left-12 z-0 pointer-events-none animate-float-slow opacity-[0.85] mix-blend-multiply" style={{ animationDelay: '1s' }}>
        <img 
          src="/assets/bicycle.png" 
          alt="Decorative bicycle" 
          className="w-72 md:w-[450px] blur-[0.2px] rotate-[-8deg] contrast-[1.8] brightness-[1.15]" 
        />
      </div>
      {/* Teapot sitting with subtle breath */}
      <div className="fixed top-[45%] right-[-5%] md:right-4 z-0 pointer-events-none animate-float opacity-[0.85] mix-blend-multiply" style={{ animationDelay: '2.5s' }}>
        <img 
          src="/assets/teapot.png" 
          alt="Decorative teapot" 
          className="w-72 md:w-[500px] blur-[0.2px] rotate-[12deg] contrast-[1.8] brightness-[1.15]" 
        />
      </div>
      {/* Leaves balancing the corners with opposing floats */}
      <div className="fixed -top-10 -left-10 md:-top-16 md:-left-16 z-0 pointer-events-none animate-float-slow opacity-[0.85] mix-blend-multiply" style={{ animationDelay: '0.5s' }}>
        <img 
          src="/assets/leaves.png" 
          alt="Decorative leaves top left" 
          className="w-64 md:w-[400px] blur-[0.2px] rotate-[-25deg] contrast-[1.8] brightness-[1.15]" 
        />
      </div>
      <div className="fixed -bottom-10 -right-10 md:-bottom-20 md:-right-20 z-0 pointer-events-none animate-float opacity-[0.85] mix-blend-multiply" style={{ animationDelay: '1.5s' }}>
        <img 
          src="/assets/leaves.png" 
          alt="Decorative leaves bottom right" 
          className="w-80 md:w-[500px] blur-[0.2px] rotate-[145deg] contrast-[1.8] brightness-[1.15]" 
        />
      </div>

      {/* --- MAIN MENU CONTENT UI --- */}
      <div 
        className="relative z-10 w-full max-w-4xl mx-auto border-4 border-ink p-8 md:p-16 bg-transparent animate-fade-in-up" 
        style={{ animationDelay: '0.2s' }}
      >
        
        {/* Corner Ornaments for the border */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-[3px] border-ink bg-vintage rotate-45"></div>

        <div className="text-center mb-16">
          <div className="inline-block relative">
             <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif italic font-medium text-ink uppercase tracking-wider mb-2 drop-shadow-sm">
                Ancient Sip
             </h1>
             <div className="absolute -left-10 md:-left-16 top-1/2 -mt-[1px] w-8 md:w-12 border-t-[3px] border-ink hidden sm:block"></div>
             <div className="absolute -right-10 md:-right-16 top-1/2 -mt-[1px] w-8 md:w-12 border-t-[3px] border-ink hidden sm:block"></div>
          </div>
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
