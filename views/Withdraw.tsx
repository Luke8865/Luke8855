
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface WithdrawProps { user: User; }

// Updated exchange rate as requested: 1 Spice = 0.1 USD
const SPICE_RATE = 0.1;

const Withdraw: React.FC<WithdrawProps> = ({ user }) => {
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
      setMessage('Insufficient Spice balance for this extraction.');
      return;
    }
    setShowAuthModal(true);
  };

  const executeTransfer = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setMessage(`Extraction protocol initiated! Your request for $${toAmount} USD is being processed.`);
      setFromAmount('');
      setShowAuthModal(false);
      setTransPassword('');
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 md:pt-40 pb-24 flex flex-col items-center">
      <div className="w-full max-w-lg mb-16 text-center">
        <h1 className="text-6xl md:text-8xl font-black text-white uppercase font-bubbly">
          VAULT
        </h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-4">Convert Spice into Real-World Utility</p>
        <div className="mt-8 inline-block px-8 py-4 bg-cyan-500/10 border border-cyan-500/30 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.1)]">
           <span className="text-cyan-400 font-black text-sm md:text-base uppercase tracking-[0.2em]">Current Rate: 1 SPICE = 0.1 USD</span>
        </div>
      </div>

      <div className="w-full max-w-lg">
        <div className="lunar-glass p-2 bg-[#0a0b1e]/90 border-white/5 shadow-2xl overflow-hidden">
          <form onSubmit={handleSwap} className="space-y-1">
            
            {/* Input Module */}
            <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5">
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Available Spice</span>
                <span className="text-2xl font-black text-cyan-400 tabular-nums">
                    {currentSpiceBalance.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center bg-black/50 rounded-2xl p-2 border border-white/10">
                <input 
                  type="number"
                  placeholder="0"
                  className="flex-grow bg-transparent text-5xl font-black text-white focus:outline-none px-4 py-3 tabular-nums"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setFromAmount(currentSpiceBalance.toString())}
                  className="px-6 py-4 bg-cyan-500 text-[#0a0b1e] text-xs font-black rounded-xl uppercase"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Junction */}
            <div className="flex justify-center -my-8 relative z-10">
              <div className="w-16 h-16 bg-[#0a0b1e] border-4 border-[#020617] rounded-3xl flex items-center justify-center text-cyan-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>

            {/* Output Module */}
            <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5">
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Estimated Value (USD)</span>
              </div>
              <div className="flex items-baseline p-4">
                <span className="text-4xl mr-3 text-slate-600 font-bold">$</span>
                <span className="text-7xl font-black text-white tabular-nums truncate">{toAmount}</span>
              </div>
            </div>

            {/* Confirm Action */}
            <div className="p-6">
              <button 
                type="submit"
                disabled={status === 'loading' || !fromAmount || parseFloat(fromAmount) === 0}
                className="w-full h-24 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-[#0a0b1e] rounded-[2rem] font-black text-2xl uppercase tracking-[0.2em]"
              >
                {status === 'loading' ? 'COMMUNICATING...' : 'CONFIRM EXTRACTION'}
              </button>
            </div>
          </form>
        </div>

        {message && (
          <div className={`mt-6 p-6 rounded-3xl text-center text-xs font-black uppercase tracking-[0.3em] ${
            status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-12 p-8 lunar-glass border-white/5 space-y-4">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Notices:</h4>
          <ul className="text-[10px] font-bold text-slate-400 space-y-2 uppercase leading-relaxed tracking-wider">
            <li>• Processing time: 24-72 hours post-verification.</li>
            <li>• Minimum extraction threshold: 50 Spice.</li>
            <li>• Exchange rate: 1 Spice = 0.1 USD (Fixed Protocol).</li>
          </ul>
        </div>
      </div>

      {/* Auth Modal Overlay */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020617]/98 backdrop-blur-3xl animate-in fade-in">
          <div className="w-full max-w-md lunar-glass p-12 text-center">
             <div className="mb-10">
                <div className="w-24 h-24 bg-cyan-500/10 border-2 border-cyan-500/20 text-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
                   <span className="text-5xl">🔐</span>
                </div>
                <h3 className="text-4xl font-black text-white uppercase font-bubbly">Security PIN</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Required for Authorization</p>
             </div>

             <form onSubmit={(e) => { e.preventDefault(); executeTransfer(); }} className="space-y-10">
                <input 
                  type="password"
                  autoFocus
                  placeholder="••••••"
                  maxLength={6}
                  className="w-full bg-black/60 border-2 border-white/5 rounded-3xl px-6 py-8 text-center text-5xl tracking-[0.5em] text-white focus:outline-none focus:border-cyan-500 font-black"
                  value={transPassword}
                  onChange={(e) => setTransPassword(e.target.value)}
                />

                <div className="flex gap-4">
                  <button type="button" onClick={() => setShowAuthModal(false)} className="flex-1 py-6 rounded-2xl bg-white/5 text-slate-500 font-black uppercase text-xs">Abort</button>
                  <button type="submit" disabled={transPassword.length < 6} className="flex-1 bg-cyan-500 text-[#0a0b1e] py-6 rounded-2xl font-black uppercase text-xs">Verify</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
