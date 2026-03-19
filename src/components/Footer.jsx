const Footer = () => {
  return (
    <footer className="border-t-[8px] border-double border-ink pt-8 pb-4">
      
      {/* Heavy Typographic Divider */}
      <div className="w-full overflow-hidden whitespace-nowrap text-center font-typewriter text-ink opacity-70 mb-8 border-b border-ink/40 pb-4">
        ««««o»»»»  P U R E S T &nbsp; H E R I T A G E &nbsp; T E A S  ««««o»»»»
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left text-ink-dark font-serif pl-8 pr-8 pb-8">
        
        <div className="border-r-0 md:border-r border-ink/40 pr-0 md:pr-8">
          <h4 className="border-b border-ink/40 pb-2 mb-4 font-bold uppercase tracking-widest">
            The Apothecary
          </h4>
          <p className="font-typewriter text-xs leading-relaxed opacity-80">
            Ancient Sip <br/>
            1998 Heritage Lane, <br/>
            Tea Estate View, Darjeeling <br/>
            WB 734101, India
          </p>
        </div>
        
        <div className="border-r-0 md:border-r border-ink/40 pr-0 md:pr-8">
          <h4 className="border-b border-ink/40 pb-2 mb-4 font-bold uppercase tracking-widest">
            Registry
          </h4>
          <ul className="space-y-2 font-typewriter text-xs opacity-80 uppercase">
            <li><a href="#home" className="hover:line-through">I. Front Label</a></li>
            <li><a href="#about" className="hover:line-through">II. Provenance</a></li>
            <li><a href="#menu" className="hover:line-through">III. Tasting Catalog</a></li>
            <li><a href="#contact" className="hover:line-through">IV. Dispatch Post</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="border-b border-ink/40 pb-2 mb-4 font-bold uppercase tracking-widest">
            Communications
          </h4>
          <p className="font-typewriter text-xs leading-relaxed opacity-80">
            Tele. : +91 (987) 654-3210 <br/>
            Cables: hello@ancientsip.com <br/>
            <br/>
            Printed locally by Ancient Sip Press. <br/>
            No. 235123
          </p>
        </div>

      </div>

      {/* Bottom Legal / Watermark */}
      <div className="text-center bg-ink text-vintage p-2 font-typewriter text-[10px] uppercase tracking-[0.3em]">
        © {new Date().getFullYear()} Ancient Sip — Preserving the Old Ways
      </div>
      
    </footer>
  );
};

export default Footer;
