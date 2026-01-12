
import React, { useState } from 'react';
import { GameItem, User } from '../types';

interface MarketProps {
  user: User;
}

const MARKET_ITEMS: GameItem[] = [
  { 
    id: 'd1', 
    name: 'Cadet Biological Capsule', 
    level: 1, 
    category: 'Dog', 
    price: 4.99, 
    currency: 'USD', 
    image: 'https://cdn.pixabay.com/photo/2021/01/30/15/14/pug-5964247_1280.png', 
    description: 'The baseline unit for orbital deployment. Optimized for high-frequency low-tier synthesis.' 
  },
  { 
    id: 'd2', 
    name: 'Advanced Orbital Capsule', 
    level: 2, 
    category: 'Dog', 
    price: 9.99, 
    currency: 'USD', 
    image: 'https://cdn.pixabay.com/photo/2021/01/30/15/14/pug-5964247_1280.png', 
    description: 'Equipped with enhanced neural processors to accelerate synthesis node generation.' 
  },
  { 
    id: 'd3', 
    name: 'Tactical Recon Capsule', 
    level: 3, 
    category: 'Dog', 
    price: 24.99, 
    currency: 'USD', 
    image: 'https://cdn.pixabay.com/photo/2021/01/30/15/14/pug-5964247_1280.png', 
    description: 'Featuring dual-spectrum optics for identifying rare resource drops during the merge process.' 
  },
  { 
    id: 'd4', 
    name: 'Chrome Infiltrator Capsule', 
    level: 4, 
    category: 'Dog', 
    price: 49.99, 
    currency: 'USD', 
    image: 'https://cdn.pixabay.com/photo/2021/01/30/15/14/pug-5964247_1280.png', 
    description: 'Full chrome shielding and integrated HUD. Dramatically increases SPICE extraction efficiency.' 
  },
  { 
    id: 'd5', 
    name: 'Stellar Voyager Capsule', 
    level: 5, 
    category: 'Dog', 
    price: 99.99, 
    currency: 'USD', 
    image: 'https://cdn.pixabay.com/photo/2021/01/30/15/14/pug-5964247_1280.png', 
    description: 'A deep-space veteran with warp-ready systems. Capable of generating high-density energy nodes.' 
  },
  { 
    id: 'd6', 
    name: 'Cosmic Singularity Capsule', 
    level: 6, 
    category: 'Dog', 
    price: 199.99, 
    currency: 'USD', 
    image: 'https://cdn.pixabay.com/photo/2021/01/30/15/14/pug-5964247_1280.png', 
    description: 'The ultimate synthesis asset. Directly facilitates the generation of pure dimensional SPICE.' 
  },
];

const Market: React.FC<MarketProps> = ({ user }) => {
  const [selectedItem, setSelectedItem] = useState<GameItem | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuthorize = () => {
    setShowPinModal(true);
  };

  const handleFinalConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 6) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      alert('Order Authorized. Unit Deployment Initiated.');
      setIsProcessing(false);
      setShowPinModal(false);
      setSelectedItem(null);
      setPin('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-20">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-10">
        <div className="space-y-2">
           <h1 className="text-4xl md:text-7xl font-bold text-white font-bubbly uppercase tracking-tighter">STORE</h1>
           <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Orbital Asset Acquisition Interface</p>
        </div>
        <div className="lunar-glass px-6 py-3 flex gap-2 bg-white/5">
          <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">Active Units: 6</span>
        </div>
      </header>

      {/* NEW TEASER BANNER - Dual Phase Layout */}
      <section className="mb-20">
        <div className="lunar-glass relative overflow-hidden group border-white/5 bg-black/60 shadow-2xl">
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Phase 1 - Live Now */}
            <div className="flex-1 p-8 md:p-14 space-y-8 relative group/p1">
              <div className="absolute top-0 right-0 p-10 opacity-5 text-8xl pointer-events-none group-hover/p1:scale-110 transition-transform duration-1000">🐕</div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-1.5 bg-emerald-500 text-[#020617] rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest">Live Now</span>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white font-bubbly uppercase tracking-tighter">Phase 1</h2>
                <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
              </div>
              <ul className="space-y-4 text-slate-300 font-bold uppercase tracking-tight text-sm md:text-base">
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400">⚡</span> Merge and collect dogs
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400">⚡</span> All dogs stored in your game account
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400">⚡</span> Start building your collection today
                </li>
              </ul>
            </div>

            {/* Phase 2 - Upcoming */}
            <div className="flex-1 p-8 md:p-14 space-y-8 relative group/p2 bg-gradient-to-br from-cyan-500/5 to-transparent">
              <div className="absolute top-0 right-0 p-10 opacity-5 text-8xl pointer-events-none group-hover/p2:scale-110 transition-transform duration-1000">💎</div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest">Coming Soon</span>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white font-bubbly uppercase tracking-tighter">Phase 2 <span className="text-cyan-400 text-3xl opacity-60">NFT Upgrade</span></h2>
                <div className="h-1 w-20 bg-cyan-500 rounded-full"></div>
              </div>
              <ul className="space-y-4 text-slate-400 font-bold uppercase tracking-tight text-sm md:text-base">
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">✨</span> Convert your collected dogs into NFTs
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">✨</span> Trade on marketplace
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">✨</span> Unlock staking & yield features
                </li>
              </ul>
            </div>
          </div>

          {/* Social Footer inside Banner */}
          <div className="bg-white/[0.03] border-t border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Connect with the Dogeverse Hub</p>
            <div className="flex flex-wrap gap-4">
                 <button className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-400/20 hover:border-blue-400/40 transition-all group">
                    <span className="text-lg group-hover:scale-110 transition-transform">🐦</span>
                    <span>X</span>
                 </button>
                 <button className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500/20 hover:border-red-500/40 transition-all group">
                    <span className="text-lg group-hover:scale-110 transition-transform">📺</span>
                    <span>YouTube</span>
                 </button>
                 <button className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all group">
                    <span className="text-lg group-hover:scale-110 transition-transform">✈️</span>
                    <span>Telegram</span>
                 </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {MARKET_ITEMS.map(item => (
          <div key={item.id} className="lunar-glass group relative overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300 border-white/10 hover:border-cyan-500/30">
            <div className="aspect-square m-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-white/5 relative overflow-hidden flex items-center justify-center">
               <img 
                 src={item.image} 
                 alt={item.name} 
                 className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-all duration-700 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" 
               />
               <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[10px] font-black text-cyan-400 uppercase">TIER_{item.level}</span>
               </div>
            </div>
            
            <div className="px-8 pb-10 pt-2 flex-grow flex flex-col">
               <h3 className="text-2xl font-black text-white font-bubbly mb-3 uppercase tracking-tight leading-none">{item.name}</h3>
               <p className="text-xs text-slate-400 font-bold mb-10 leading-relaxed line-clamp-2 uppercase tracking-wide">{item.description}</p>
               
               <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center">
                 <div className="flex flex-col">
                   <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">CREDIT COST</span>
                   <span className="text-4xl font-black text-white font-bubbly leading-none">${item.price.toFixed(2)}</span>
                 </div>
                 <button 
                   onClick={() => setSelectedItem(item)} 
                   className="btn-cosmic bg-cyan-500 text-[#0a0b1e] px-10 py-5 text-sm font-black uppercase shadow-[0_10px_30px_rgba(6,182,212,0.3)]"
                 >
                   ACQUIRE
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Confirmation Modal */}
      {selectedItem && !showPinModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020617]/95 backdrop-blur-3xl animate-in fade-in" onClick={() => setSelectedItem(null)}>
          <div className="w-full max-w-lg lunar-glass p-12 text-center space-y-12 shadow-[0_0_100px_rgba(6,182,212,0.2)]" onClick={e => e.stopPropagation()}>
            <h2 className="text-5xl font-black font-bubbly uppercase text-white tracking-tighter">SECURE ORDER</h2>
            
            <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <img src={selectedItem.image} className="w-56 h-56 mx-auto object-contain mb-8 drop-shadow-2xl" alt={selectedItem.name} />
              <p className="text-2xl font-black text-white uppercase mb-2 font-bubbly tracking-tight">{selectedItem.name}</p>
              <div className="flex items-center justify-center gap-2">
                 <span className="text-4xl font-black text-cyan-400 font-bubbly">${selectedItem.price.toFixed(2)}</span>
                 <span className="text-xs font-black text-slate-500 uppercase tracking-widest">USD</span>
              </div>
            </div>

            <div className="flex gap-4">
               <button onClick={() => setSelectedItem(null)} className="flex-1 py-6 rounded-2xl bg-white/5 text-slate-400 font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-colors">Abort</button>
               <button onClick={handleAuthorize} className="flex-1 py-6 bg-cyan-500 text-[#0a0b1e] font-black rounded-2xl uppercase text-xs tracking-widest shadow-xl hover:scale-105 transition-all">Authorize</button>
            </div>
          </div>
        </div>
      )}

      {/* Security PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#020617]/98 backdrop-blur-3xl animate-in fade-in">
          <div className="w-full max-w-md lunar-glass p-12 text-center" onClick={e => e.stopPropagation()}>
             <div className="mb-10">
                <div className="w-24 h-24 bg-cyan-500/10 border-2 border-cyan-500/20 text-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
                   <span className="text-5xl">🔐</span>
                </div>
                <h3 className="text-4xl font-black text-white uppercase font-bubbly tracking-tighter">Transaction PIN</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Enter your 6-digit security code</p>
             </div>

             <form onSubmit={handleFinalConfirm} className="space-y-10">
                <input 
                  type="password"
                  autoFocus
                  placeholder="••••••"
                  maxLength={6}
                  className="w-full bg-black/60 border-2 border-white/5 rounded-3xl px-6 py-8 text-center text-5xl tracking-[0.5em] text-white focus:outline-none focus:border-cyan-500 font-black"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                />

                <div className="flex gap-4">
                  <button type="button" onClick={() => setShowPinModal(false)} className="flex-1 py-6 rounded-2xl bg-white/5 text-slate-500 font-black uppercase text-xs">Back</button>
                  <button type="submit" disabled={pin.length < 6 || isProcessing} className="flex-1 bg-cyan-500 text-[#0a0b1e] py-6 rounded-2xl font-black uppercase text-xs">
                    {isProcessing ? 'Verifying...' : 'Verify & Confirm'}
                  </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
