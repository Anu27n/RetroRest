const Features = () => {
  // Custom thin line SVGs to mimic hand-sketched art
  const sketchedIconClass = "w-12 h-12 stroke-ink fill-transparent stroke-[0.8]";
  
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className={sketchedIconClass}>
          <path d="M12 2C7 2 4 8 4 13c0 4 3 7 8 7s8-3 8-7c0-5-3-11-8-11z" strokeDasharray="1 1"/>
          <path d="M12 2v20 M7 9l5 4 5-2" />
        </svg>
      ),
      title: "Fresh Ingredients",
      desc: "Sourced daily from local farmers in Vellore."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className={sketchedIconClass}>
          <path d="M4 11h16 M5 11c0 5 2 9 7 9s7-4 7-9" strokeDasharray="3 1" />
          <path d="M12 20v2M10 22h4 M8 6v5 M12 4v7 M16 6v5" />
        </svg>
      ),
      title: "Traditional Recipes",
      desc: "Ancestral methods honed over generations."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className={sketchedIconClass}>
          <circle cx="12" cy="12" r="10" strokeDasharray="2 2" />
          <path d="M8 12l3 3 5-5 M12 2v2 M12 20v2 M2 12h2 M20 12h2" />
        </svg>
      ),
      title: "No Preservatives",
      desc: "Pure taste, untainted by modern chemicals."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className={sketchedIconClass}>
          <path d="M4 18h16 M6 18c0-4 2-8 6-8s6 4 6 8 M10 10v-4 M14 10v-6 M12 10v-8" strokeDasharray="4 2" />
          <path d="M8 18v3h8v-3" />
        </svg>
      ),
      title: "Wood-Fired Ovens",
      desc: "Slow-cooked perfection in earthen clay."
    }
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
      <div className="absolute top-0 right-10 text-ink opacity-[0.03] text-9xl pointer-events-none rotate-[25deg] font-serif">
        ☙
      </div>
      
      <div className="border-[3px] border-double border-ink py-10 px-6 rotate-[0.5deg] relative shadow-[4px_4px_0px_#2C1A12] bg-vintage">
        
        {/* Decorative corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-ink font-serif text-[8px] flex justify-center items-center">*</div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-ink font-serif text-[8px] flex justify-center items-center">*</div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-ink font-serif text-[8px] flex justify-center items-center">*</div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-ink font-serif text-[8px] flex justify-center items-center">*</div>

        <h3 className="text-center font-typewriter text-xs uppercase tracking-widest mb-10 border-b border-dashed border-ink/60 pb-2 w-max mx-auto px-8 rotate-[-1deg]">
          — The Bistro Promise —
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          
          {features.map((feature, i) => (
            <div key={i} className={`flex flex-col items-center md:items-start text-center md:text-left group ${i%2===0 ? '-rotate-[0.5deg]' : 'rotate-[1deg] translate-y-2'} transition-all duration-700 hover:scale-[1.03]`}>
              <div className="mb-6 text-ink opacity-80 border border-ink rounded-full w-24 h-24 flex items-center justify-center transition-colors shadow-sm">
                {feature.icon}
              </div>
              <h4 className="font-serif text-xl font-bold uppercase tracking-widest mb-3 leading-tight border-b-2 border-dotted border-ink/50 pb-2 w-full">
                {feature.title}
              </h4>
              <p className="font-typewriter text-xs text-ink-dark uppercase tracking-[0.15em] leading-loose opacity-90 pl-1">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;
