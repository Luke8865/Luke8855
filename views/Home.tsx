
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] selection:bg-cyan-500/30">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-60 blur-[2px]"
          >
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/40 to-[#020617] z-10"></div>
        </div>

        <div className="relative z-20 px-6 text-center max-w-7xl mx-auto w-full pt-20">
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter mb-20 text-white uppercase font-bubbly">
            PROJECT<span className="text-cyan-400 font-black">：DOG</span>
          </h1>
          
          <div className="flex justify-center">
            <button 
              onClick={() => setShowDownloadModal(true)}
              className="btn-cosmic relative group bg-cyan-500 text-[#0a0b1e] text-xl px-16 py-6 shadow-[0_0_40px_rgba(34,211,238,0.4)]"
            >
              <span className="relative z-10 uppercase tracking-widest font-black">Play Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Game Overview Section */}
      <section className="px-6 py-24 md:py-40 max-w-7xl mx-auto w-full relative">
        <header className="text-center mb-20">
            <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] font-bubbly uppercase">
                WHAT'S <span className="text-cyan-400">PROJECT DOG</span>
            </h2>
        </header>

        {/* Large Merged Interface Card */}
        <div className="lunar-glass overflow-hidden border-white/5 bg-[#0a0b1e]/40">
          <div className="flex flex-col lg:flex-row">
            {/* Left Content: Info */}
            <div className="flex-1 p-8 md:p-16 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { title: 'BUY', icon: '🐕', text: 'Purchase your own cosmic dogs from the store to begin building your pack.' },
                  { title: 'MERGE', icon: '💩', text: 'Dogs produce poop of various levels; merge identical droppings to upgrade to higher tiers.' },
                  { title: 'REFINE', icon: '🧂', text: 'Feed droppings into the refinery to extract valuable Spice resources.' },
                  { title: 'FEED', icon: '🦴', text: 'Regularly restore your dogs\' stamina to keep them happy and productive for more resources.' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{item.icon}</span>
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter">{item.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm font-bold leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-8 border-t border-white/5">
                <button 
                  onClick={() => navigate('/gameplay')}
                  className="w-full md:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-cyan-400 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border border-white/10"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Side: Large Illustration */}
            <div className="flex-1 min-h-[400px] lg:min-h-full relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b1e] to-transparent z-10 hidden lg:block"></div>
               <img 
                 src="https://images.unsplash.com/photo-1611095777215-996e30aa54d0?auto=format&fit=crop&q=80&w=1200&h=1200" 
                 alt="Project Dog Illustration" 
                 className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-80"
               />
               <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-24 h-24 bg-cyan-500/20 backdrop-blur-xl rounded-full border border-cyan-500/40 flex items-center justify-center animate-pulse">
                     <span className="text-4xl">💎</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refine Your Wealth Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto w-full">
        <div className="lunar-glass p-12 md:p-20 border-emerald-500/20 bg-gradient-to-br from-[#061712]/60 to-[#0a0b1e]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl">🧂</div>
            <div className="max-w-3xl relative z-10">
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-10 font-bubbly leading-none">REFINE YOUR WEALTH</h3>
                <div className="space-y-8">
                    <p className="text-xl md:text-2xl font-bold text-slate-200 leading-relaxed uppercase tracking-tight">
                        In Project Dog, your dogs will continuously produce <span className="text-emerald-400">Spice resources</span>.
                    </p>
                    <div className="h-px w-20 bg-emerald-500/40"></div>
                    <p className="text-slate-400 text-sm md:text-lg font-bold leading-relaxed uppercase tracking-wide">
                        Spice can be used for merging upgrades, unlocking new content, and can be redeemed for corresponding rewards in the <span className="text-cyan-400">Reward Center</span> according to event rules.
                    </p>
                    <p className="text-slate-500 text-xs md:text-sm font-bold leading-relaxed uppercase tracking-widest italic">
                        As your game progress improves, you can unlock higher-tier synthesis chains and even more reward content.
                    </p>
                </div>
                <div className="mt-12">
                   <button 
                     onClick={() => navigate('/market')}
                     className="px-10 py-5 bg-emerald-500 text-[#0a0b1e] rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform"
                   >
                     Visit Store
                   </button>
                </div>
            </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto w-full">
        <header className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white/40 tracking-tighter font-bubbly uppercase">
                COMING <span className="text-blue-500/40">SOON</span>
            </h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: 'GATEWAY', icon: '🌀', color: 'border-purple-500/20' },
                { title: 'HOLO', icon: '📺', color: 'border-blue-500/20' },
                { title: 'BREEDING', icon: '🧬', color: 'border-pink-500/20' }
            ].map((item, idx) => (
                <div key={idx} className={`lunar-glass p-12 text-center border-2 ${item.color} grayscale opacity-50 relative group overflow-hidden`}>
                    <div className="absolute top-4 right-6 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Locked</div>
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                    <h3 className="text-2xl font-black text-white font-bubbly uppercase tracking-widest">{item.title}</h3>
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-blue-500/20"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#020617]/98 backdrop-blur-2xl animate-in fade-in" onClick={() => setShowDownloadModal(false)}>
          <div className="relative w-full max-w-xl lunar-glass p-12 text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-4xl font-black font-bubbly uppercase mb-10 text-white">Select Device</h2>
            <div className="grid grid-cols-2 gap-6">
              <button className="p-10 bg-white/5 hover:bg-cyan-500/20 border-2 border-white/10 rounded-[2rem] flex flex-col items-center transition-all group">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🤖</span>
                <span className="font-black text-white uppercase tracking-widest">Android</span>
              </button>
              <button className="p-10 bg-white/5 hover:bg-cyan-500/20 border-2 border-white/10 rounded-[2rem] flex flex-col items-center transition-all group">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🍎</span>
                <span className="font-black text-white uppercase tracking-widest">iOS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
