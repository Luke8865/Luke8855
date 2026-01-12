
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Gameplay: React.FC = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const gameScreenshots = [
    { url: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=800&h=500&auto=format&fit=crop', title: 'Cosmic Kennel' },
    { url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&h=500&auto=format&fit=crop', title: 'The Merge Grid' },
    { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&h=500&auto=format&fit=crop', title: 'Refinery Station' },
    { url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=800&h=500&auto=format&fit=crop', title: 'Spice Rewards' },
    { url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4b519?q=80&w=800&h=500&auto=format&fit=crop', title: 'Rankings Hub' },
  ];

  const scrollGallery = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 md:pt-40 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page Header */}
        <header className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
             <span className="text-cyan-400 font-black uppercase tracking-[0.4em] text-xs">Knowledge Base</span>
             <h1 className="text-5xl md:text-8xl font-black text-white uppercase font-bubbly tracking-tighter leading-none">
                GAMEPLAY <span className="text-cyan-400">MANIFESTO</span>
             </h1>
          </div>
          <button onClick={() => navigate('/')} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-slate-400 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border border-white/10">
             [ BACK TO HOME ]
          </button>
        </header>

        {/* Content Section */}
        <div className="space-y-32">
          
          {/* Core Loop Section */}
          <section className="space-y-12">
            <div className="space-y-4">
               <span className="text-cyan-400 font-black uppercase tracking-[0.4em] text-xs">Phase 01-02</span>
               <h3 className="text-4xl font-black text-white uppercase tracking-tighter font-bubbly">CORE REVENUE LOOP</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="lunar-glass p-10 border-blue-500/10 bg-white/5">
                <div className="w-16 h-16 rounded-3xl bg-blue-500/20 flex items-center justify-center text-4xl mb-8 shadow-inner">🐕</div>
                <h4 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">1) ADOPT & PRODUCE</h4>
                <p className="text-slate-400 font-bold leading-relaxed text-sm md:text-base">
                  Adopt interstellar dogs to start your production line. Every dog periodically generates "Merge Items". 
                  Higher rarity dogs offer significantly increased production speeds and massive Spice yield potential.
                </p>
              </div>
              <div className="lunar-glass p-10 border-cyan-500/10 bg-white/5">
                <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 flex items-center justify-center text-4xl mb-8 shadow-inner">⬆️</div>
                <h4 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">2) MERGE TO EVOLVE</h4>
                <p className="text-slate-400 font-bold leading-relaxed text-sm md:text-base">
                  Drag and drop identical items to synthesize higher-tier versions. 
                  Evolution is the key—upgraded items generate exponentially higher returns and boost your overall efficiency across the grid.
                </p>
              </div>
            </div>
          </section>

          {/* Economy Section */}
          <section className="space-y-12">
            <div className="space-y-4">
               <span className="text-purple-400 font-black uppercase tracking-[0.4em] text-xs">The Economy</span>
               <h3 className="text-4xl font-black text-white uppercase tracking-tighter font-bubbly">RESOURCE TYPES</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="p-12 bg-gradient-to-br from-[#0a0b1e] to-black border border-white/5 rounded-[3.5rem] relative overflow-hidden group">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-4xl shadow-xl">💰</div>
                    <h4 className="text-3xl font-black text-white uppercase font-bubbly tracking-tight">SHITCOIN</h4>
                  </div>
                  <p className="text-slate-400 font-bold text-sm md:text-base leading-relaxed mb-10">
                    The standard currency of the Star Alliance. Essential for the survival and growth of your pack.
                  </p>
                  <ul className="grid grid-cols-1 gap-4 text-xs font-black text-slate-500 uppercase tracking-widest">
                     <li className="bg-white/5 p-4 rounded-2xl border border-white/5">● Buy Dog Food & Maintenance</li>
                     <li className="bg-white/5 p-4 rounded-2xl border border-white/5">● Unlock Kennel Slots</li>
                     <li className="bg-white/5 p-4 rounded-2xl border border-white/5">● Speed-up Synthesis Cycles</li>
                  </ul>
               </div>

               <div className="p-12 bg-gradient-to-br from-[#0a0b1e] to-black border border-white/5 rounded-[3.5rem] relative overflow-hidden group">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-4xl shadow-xl">🧂</div>
                    <h4 className="text-3xl font-black text-white uppercase font-bubbly tracking-tight">SPICE</h4>
                  </div>
                  <p className="text-slate-400 font-bold text-sm md:text-base leading-relaxed mb-10">
                    Extracted during the refinement of high-tier items. Pure liquid wealth used for real-world utility.
                  </p>
                  <ul className="grid grid-cols-1 gap-4 text-xs font-black text-slate-500 uppercase tracking-widest">
                     <li className="bg-white/5 p-4 rounded-2xl border border-white/5">● Convert to Real-world Value</li>
                     <li className="bg-white/5 p-4 rounded-2xl border border-white/5">● Unlock Legendary Skins</li>
                     <li className="bg-white/5 p-4 rounded-2xl border border-white/5">● Stake for Production Multipliers</li>
                  </ul>
               </div>
            </div>
          </section>

          {/* Screenshot Gallery Section */}
          <section className="space-y-12 pb-20">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-xs">Visuals</span>
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter font-bubbly">ORBITAL PREVIEWS</h3>
              </div>
              <div className="flex gap-4">
                <button onClick={() => scrollGallery('left')} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-xl">←</button>
                <button onClick={() => scrollGallery('right')} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-xl">→</button>
              </div>
            </div>
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10"
            >
              {gameScreenshots.map((img, i) => (
                <div key={i} className="min-w-[90%] md:min-w-[65%] lg:min-w-[50%] snap-center rounded-[3rem] overflow-hidden bg-black/40 border-2 border-white/5 aspect-video group relative shadow-2xl">
                   <img src={img.url} alt={img.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                   <div className="absolute bottom-10 left-10">
                      <span className="bg-cyan-500 text-[#0a0b1e] px-6 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl">{img.title}</span>
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Final Call to Action */}
        <footer className="mt-20 text-center">
           <button 
             onClick={() => navigate('/market')}
             className="w-full max-w-2xl py-8 bg-cyan-500 text-[#0a0b1e] font-black rounded-[2.5rem] uppercase tracking-[0.3em] text-xl shadow-[0_20px_60px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-transform"
           >
             Adopt Your First Interstellar Unit
           </button>
        </footer>
      </div>
    </div>
  );
};

export default Gameplay;
