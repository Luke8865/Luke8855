
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface TradeverseProps { user: User; }

// Exchange rate: 1 Spice = 0.1 USD
const SPICE_RATE = 0.1;

const Tradeverse: React.FC<TradeverseProps> = ({ user }) => {
  const navigate = useNavigate();
  const [fromAmount, setFromAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [transPassword, setTransPassword] = useState('');

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate('/login');
    }
  }, [user.isLoggedIn, navigate]);

  if (!user.isLoggedIn) return null;

  const currentSpiceBalance = user.spice;
  const toAmount = fromAmount 
    ? (parseFloat(fromAmount) * SPICE_RATE).toFixed(2)
    : '0.00';

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;
    if (parseFloat(fromAmount) > currentSpiceBalance) {
      setStatus('error');
      setMessage('Insufficient Spice balance.');
      return;
    }
    setShowAuthModal(true);
  };

  const executeTransfer = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setMessage(`Trade successful! $${toAmount} USD processing.`);
      setFromAmount('');
      setShowAuthModal(false);
      setTransPassword('');
    }, 1800);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-32 md:pt-48 pb-20 overflow-x-hidden">
      {/* Background with Game Worldview */}
      <div className="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2000&auto=format&fit=crop" 
           alt="Cosmic Tradeverse Background" 
           className="w-full h-full object-cover opacity-30"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/80 to-[#020617]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center space-y-8">
        {/* Compact Header */}
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase font-bubbly tracking-tight">
            TRADE<span className="text-cyan-400">VERSE</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm mt-3">Redeem Dimensional Spice for Utility</p>
        </div>

        {/* Compact Swap Interface */}
        <div className="w-full lunar-glass p-2 bg-[#0a0b1e]/70 border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
          <form onSubmit={handleSwap} className="space-y-1">
            
            {/* Input Module */}
            <div className="p-6 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5">
              <div className="flex justify-between items-center mb-5 px-1">
                <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Available Balance</span>
                <span className="text-xl font-black text-cyan-400 tabular-nums">
                    {currentSpiceBalance.toLocaleString()} <span className="text-sm">🧂</span>
                </span>
              </div>
              
              <div className="flex items-center bg-black/60 rounded-2xl p-2 border border-white/10 focus-within:border-cyan-500/50 transition-colors">
                <input 
                  type="number"
                  placeholder="0"
                  className="flex-grow bg-transparent text-4xl md:text-5xl font-black text-white focus:outline-none px-4 py-3 tabular-nums w-0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setFromAmount(currentSpiceBalance.toString())}
                  className="shrink-0 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a0b1e] text-[11px] font-black rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Compact Junction */}
            <div className="flex justify-center -my-8 relative z-10">
              <div className="w-16 h-16 bg-[#0a0b1e] border-4 border-[#020617] rounded-[1.25rem] flex items-center justify-center text-cyan-400 shadow-xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>

            {/* Output Module */}
            <div className="p-6 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5">
              <div className="flex justify-between items-center mb-5 px-1">
                <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Received Value</span>
              </div>
              <div className="flex items-baseline px-2">
                <span className="text-3xl mr-2 text-slate-500 font-bold">$</span>
                <span className="text-5xl md:text-7xl font-black text-white tabular-nums truncate">{toAmount}</span>
                <span className="ml-3 text-xs font-black text-slate-500 uppercase tracking-widest">USD</span>
              </div>
            </div>

            {/* Confirm Action */}
            <div className="p-4 pt-6">
              <button 
                type="submit"
                disabled={status === 'loading' || !fromAmount || parseFloat(fromAmount) === 0}
                className="w-full h-20 md:h-24 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-[#0a0b1e] rounded-[2rem] font-black text-xl md:text-2xl uppercase tracking-[0.2em] shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                {status === 'loading' ? 'TRADING...' : 'CONFIRM TRADE'}
              </button>
            </div>
          </form>
        </div>

        {message && (
          <div className={`w-full p-5 rounded-3xl text-center text-xs font-black uppercase tracking-[0.2em] animate-in slide-in-from-bottom-2 ${
            status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {message}
          </div>
        )}

        {/* Compact Footer Notices - Scaled Up */}
        <div className="w-full px-6 py-6 lunar-glass border-white/5 text-center bg-black/40">
          <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
            Rate: <span className="text-white">1 Spice = 0.1 USD</span> • Min: <span className="text-white">50 Spice</span> • Delivery: <span className="text-white">24-72h</span>
          </p>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020617]/98 backdrop-blur-3xl animate-in fade-in">
          <div className="w-full max-w-md lunar-glass p-8 md:p-14 text-center shadow-[0_0_100px_rgba(6,182,212,0.15)]">
             <div className="mb-10">
                <div className="w-20 h-20 bg-cyan-500/10 border-2 border-cyan-500/20 text-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                   <span className="text-4xl">🔐</span>
                </div>
                <h3 className="text-4xl font-black text-white uppercase font-bubbly tracking-tight">VERIFY PIN</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Enter your 6-digit security code</p>
             </div>

             <form onSubmit={(e) => { e.preventDefault(); executeTransfer(); }} className="space-y-10">
                <input 
                  type="password"
                  autoFocus
                  placeholder="••••••"
                  maxLength={6}
                  className="w-full bg-black/60 border-2 border-white/10 rounded-[2rem] px-4 py-8 text-center text-5xl tracking-[0.5em] text-white focus:outline-none focus:border-cyan-500 font-black shadow-inner"
                  value={transPassword}
                  onChange={(e) => setTransPassword(e.target.value.replace(/\D/g, ''))}
                />

                <div className="flex gap-4">
                  <button type="button" onClick={() => setShowAuthModal(false)} className="flex-1 py-5 rounded-2xl bg-white/5 text-slate-500 font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-colors">Abort</button>
                  <button type="submit" disabled={transPassword.length < 6} className="flex-1 bg-cyan-500 text-[#0a0b1e] py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all">Verify</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tradeverse;
