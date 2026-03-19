const Hero = () => {
  return (
    <section id="home" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
      
      {/* Outer Decorative Frame mimicking a Menu Cover */}
      <div className="border-[4px] border-double border-ink p-2 md:p-4 relative">
        {/* Corner Ornaments */}
        <div className="absolute top-0 left-0 w-8 h-8 border-r-2 border-b-2 border-ink"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-ink"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-r-2 border-t-2 border-ink"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-l-2 border-t-2 border-ink"></div>

        {/* Inner Frame */}
        <div className="border-[2px] border-ink relative p-6 md:p-12 flex flex-col items-center bg-transparent -rotate-[0.5deg]">
          
          {/* Faint Background Watermark Illustration */}
          <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] opacity-[0.04] mix-blend-multiply pointer-events-none -rotate-[15deg]">
            <img 
               src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Vintage_illustration_of_a_plate_of_food.jpg" 
               alt="" 
               className="w-full h-full object-cover filter grayscale"
               style={{ clipPath: 'circle(45%)' }}
            />
          </div>

          <div className="absolute top-8 left-8 text-3xl font-serif opacity-70">❦</div>
          <div className="absolute top-8 right-8 text-3xl font-serif opacity-70">❦</div>
          <div className="absolute bottom-8 left-8 text-3xl font-serif opacity-70 scale-y-[-1]">❦</div>
          <div className="absolute bottom-8 right-8 text-3xl font-serif opacity-70 scale-y-[-1]">❦</div>
          
          {/* Main Content Area */}
          <div className="w-full max-w-4xl flex flex-col items-center">
            
            {/* Stamp Logo Region - Keep Centered */}
            <div className="mb-12 flex flex-col items-center -rotate-1 origin-bottom-left">
              <div className="mb-2 uppercase font-typewriter tracking-[0.3em] text-sm border-y border-ink py-1 px-8 hover:bg-ink hover:text-vintage transition-colors cursor-default">
                Fine Dining & Provisions
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl tracking-widest text-ink-dark uppercase leading-none mt-4 font-serif scale-y-110">
                Ancient Sip
              </h1>
              <h2 className="text-4xl md:text-5xl font-serif text-ink tracking-[0.3em] uppercase mt-2 border-b-2 border-ink pb-4 block w-full text-center">
                Bistro
              </h2>
            </div>
            
            {/* Content Layout - Split Left/Right for less perfect symmetry */}
            <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-8 relative z-10 text-center md:text-left">
              
              <div className="w-full md:w-1/2 px-4">
                <h3 className="text-4xl md:text-5xl font-light italic text-ink rotate-[-2deg] scale-105 mb-6 font-serif leading-tight">
                  Authentic Flavors, <br/> Timeless Taste
                </h3>
                
                <p className="font-typewriter text-sm md:text-base text-ink-dark mt-4 leading-relaxed border-t border-b border-dashed border-ink/40 py-6 uppercase tracking-widest">
                  Experiencing traditional recipes handed down through generations. Prepared with the finest seasonal ingredients.
                </p>
                
                <a href="#menu" className="mt-8 inline-block border-2 border-ink px-8 py-3 font-typewriter uppercase tracking-widest text-sm hover:bg-ink hover:text-vintage transition-all duration-500 shadow-[4px_4px_0px_#2C1A12] hover:shadow-[0px_0px_0px_#2C1A12] hover:translate-x-1 hover:translate-y-1">
                  View The Menu
                </a>
              </div>
            
              <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center relative -mt-4 md:-mt-10">
                <div className="relative w-full max-w-[280px] mix-blend-multiply opacity-85 hover:opacity-100 transition-opacity rotate-[3deg]">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Vintage_illustration_of_a_plate_of_food.jpg" 
                    alt="Vintage sketch of dining"
                    className="w-full h-auto filter grayscale contrast-[1.4] sepia-[0.7] brightness-[0.85] rounded-full border-2 border-dashed border-ink p-1"
                    style={{ clipPath: 'circle(48%)' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544378730-7e44e21a20c3?q=80&w=600&auto=format&fit=crop';
                      e.target.style.clipPath = 'inset(10%)';
                    }}
                  />
                  {/* Vintage badge seal overlay */}
                  <div className="absolute bottom-0 right-0 flex flex-col items-center justify-center -rotate-12 opacity-95 w-24 h-24 border-[3px] border-double border-ink rounded-full bg-vintage z-10 p-2 shadow-sm">
                    <span className="text-2xl font-serif font-bold text-stamp-red">1st</span>
                    <span className="text-[10px] font-typewriter uppercase border-t border-ink text-center text-stamp-red">Class<br/>Fare</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
        
        {/* Footer of the label */}
        <div className="p-3 text-center text-xs font-typewriter tracking-widest opacity-80 flex justify-between overflow-hidden whitespace-nowrap bg-ink text-vintage">
          <span>««««o»»»»</span>
          <span>THE BISTRO</span>
          <span>««««o»»»»</span>
          <span>VELLORE</span>
          <span>««««o»»»»</span>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
