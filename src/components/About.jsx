const About = () => {
  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Decorative text block representing the 'story' inside a panel */}
      <div className="border border-ink p-8 md:p-20 relative -rotate-[0.5deg] scale-[0.98]">
        
        {/* Corner dots */}
        <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-ink rounded-full"></div>
        <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-ink rounded-full"></div>
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-ink rounded-full"></div>
        <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-ink rounded-full"></div>

        {/* Faint botanical watermark */}
        <div className="absolute top-10 left-10 text-[10rem] opacity-[0.03] font-serif rotate-[20deg] pointer-events-none">
          ❧
        </div>

        {/* Heading - Kept Centered */}
        <div className="text-center mb-16 rotate-1">
          <span className="font-typewriter text-[10px] tracking-widest uppercase border-y border-ink py-1 px-4 inline-block mb-6 hover:bg-ink hover:text-vintage transition-colors cursor-default">
            Our Story
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-ink italic leading-[1.1] pb-4 border-b-[3px] border-double border-ink max-w-lg mx-auto">
            The Culinary Heritage
          </h2>
          <div className="mt-6 flex justify-center items-center gap-4 opacity-70">
            <span className="w-20 h-px border-t border-dashed border-ink"></span>
            <span className="text-2xl">☙</span>
            <span className="w-20 h-px border-t border-dashed border-ink"></span>
          </div>
        </div>

        {/* Content - Left Aligned to Break Symmetry */}
        <div className="md:grid grid-cols-5 gap-16 text-ink-dark/90 leading-[2] text-xl font-medium mt-8 text-left">
          
          <div className="col-span-3 space-y-8">
            <p className="first-letter:text-7xl first-letter:leading-[0.8] first-letter:pr-3 first-letter:font-serif first-letter:text-stamp-red first-letter:float-left">
              Established in 1998, Ancient Sip Bistro was born from a desire to resurrect the forgotten recipes of the subcontinent. Deep in the heart of Vellore, we set out to create a dining experience that rejects modern shortcuts in favor of the patient, wood-fired hearths of our ancestors.
            </p>
            <p>
              Our kitchens operate precisely as they did a century ago. We stone-grind our spices daily, smoke our meats over aromatic native woods, and knead our breads entirely by hand. There are no preservatives, no artificial enhancers, merely the raw, unyielding heat of the clay oven and the expertise of our master cooks.
            </p>
          </div>

          <div className="col-span-2 pt-10 md:pt-0 flex flex-col items-start border-t md:border-t-0 md:border-l border-ink/30 mt-8 md:mt-0 pt-8 md:pl-10">
            <p className="font-serif italic text-2xl text-ink leading-relaxed border-l-4 border-ink pl-6 py-2 bg-vintage-light/40">
              "To dine at Ancient Sip Bistro is to step back into an era where food was a deliberate craft rather than a rapid convenience."
            </p>
            <p className="mt-8">
               We invite you to sit at our heavy oak tables, break fresh sourdough, and taste history. Enjoy the ambiance of our culinary sanctuary.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
