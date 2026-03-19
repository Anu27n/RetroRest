const Navbar = () => {
  return (
    <nav className="w-full pt-8 pb-4 border-b-[3px] border-ink border-double">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
        
        {/* Top metadata row like old labels */}
        <div className="w-full flex justify-between items-center text-xs font-typewriter tracking-widest text-ink-light uppercase border-b border-ink/30 pb-2">
          <span>Est. 1998</span>
          <span className="opacity-50 font-bold">~ No. 4022 ~</span>
          <span>Vellore, India</span>
        </div>
        
        {/* Navigation Links - Centered like a table of contents */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mt-4 text-ink-dark font-medium text-lg uppercase tracking-[0.2em]">
          <a href="#home" className="hover:text-stamp-red transition-colors relative before:content-['*'] before:mr-2 before:opacity-50 after:content-['*'] after:ml-2 after:opacity-50">Appetizer</a>
          <a href="#menu" className="hover:text-stamp-red transition-colors relative before:content-['*'] before:mr-2 before:opacity-50 after:content-['*'] after:ml-2 after:opacity-50">The Menu</a>
          <a href="#about" className="hover:text-stamp-red transition-colors relative before:content-['*'] before:mr-2 before:opacity-50 after:content-['*'] after:ml-2 after:opacity-50">Our Story</a>
          <a href="#contact" className="hover:text-stamp-red transition-colors relative before:content-['*'] before:mr-2 before:opacity-50 after:content-['*'] after:ml-2 after:opacity-50">Reservations</a>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
