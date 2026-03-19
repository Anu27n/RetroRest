import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', guests: '2' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Postcard sent! Reserved for: ${formData.name}`);
  };

  return (
    <section id="contact" className="py-24 max-w-4xl mx-auto px-4 sm:px-6">
      
      <div className="border-[4px] border-double border-ink p-8 md:p-14 relative bg-vintage-light/50">
        
        {/* Postcard styling elements */}
        <div className="absolute top-6 right-6 w-16 h-20 border-2 border-ink border-dashed flex items-center justify-center opacity-70">
          <span className="text-xs font-typewriter uppercase text-center w-full block">Place<br/>Stamp<br/>Here</span>
        </div>
        
        <div className="mb-10 w-fit">
          <h2 className="text-4xl font-serif text-ink tracking-widest uppercase border-b-2 border-ink pb-2">
            Postcard
          </h2>
          <span className="font-typewriter text-xs text-ink-light uppercase mt-1 block">To: Ancient Sip Heritage Teas</span>
        </div>

        <form onSubmit={handleSubmit} className="text-xl md:text-2xl font-serif text-ink leading-[3rem]">
          I humbly request the pleasure of reserving a table for 
          <input 
            type="text" 
            className="fill-blank w-16 text-center mx-2 text-xl" 
            placeholder="2" 
            onChange={(e) => setFormData({...formData, guests: e.target.value})}
          /> 
          guests on this date
          <input 
            type="text" 
            className="fill-blank w-32 md:w-48 text-center mx-2 text-xl" 
            placeholder="DD/MM/YYYY" 
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />. 
          <br/>
          My name is 
          <input 
            type="text" 
            className="fill-blank w-48 md:w-64 text-center mx-2 text-xl" 
            placeholder="John Doe" 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          /> 
          and I can be contacted at 
          <input 
            type="text" 
            className="fill-blank w-48 md:w-64 text-center mx-2 text-xl" 
            placeholder="+91 .." 
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />.
          <br/>
          <span className="opacity-80 block mt-8">With sincere regards,</span>
          <br/>
          
          {/* Submit Button disguised as signature block */}
          <div className="flex justify-end mt-4">
            <button 
              type="submit" 
              className="group relative inline-flex items-center"
            >
              <div className="px-12 py-4 border-2 border-ink text-ink font-typewriter uppercase tracking-widest text-sm bg-transparent group-hover:bg-ink group-hover:text-vintage transition-colors">
                Send by Post
              </div>
            </button>
          </div>
          
        </form>

      </div>
    </section>
  );
};

export default Contact;
