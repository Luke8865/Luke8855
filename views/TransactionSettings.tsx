
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionSettings: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { setError('6 characters required.'); return; }
    if (password !== confirmPassword) { setError('No match.'); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setTimeout(() => navigate('/'), 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center">
          <h2 className="text-5xl font-black text-white font-bubbly uppercase">PIN</h2>
        </div>

        <form onSubmit={handleSubmit} className="lunar-glass p-12 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="space-y-6">
            <input 
              type="password" 
              required
              maxLength={6}
              className="w-full bg-black/40 border-2 border-white/5 rounded-3xl px-6 py-6 font-black text-white focus:outline-none focus:border-cyan-500 text-center text-4xl tracking-[0.5em]"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input 
              type="password" 
              required
              maxLength={6}
              className="w-full bg-black/40 border-2 border-white/5 rounded-3xl px-6 py-6 font-black text-white focus:outline-none focus:border-cyan-500 text-center text-4xl tracking-[0.5em]"
              placeholder="••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-400 text-center text-xs font-black uppercase">{error}</div>}
          {status === 'success' && <div className="text-emerald-400 text-center text-xs font-black uppercase">SAVED</div>}

          <button 
            type="submit"
            disabled={isSubmitting || status === 'success'}
            className="w-full bg-cyan-500 text-[#0a0b1e] py-6 rounded-full font-black uppercase tracking-widest shadow-xl disabled:opacity-30"
          >
            {isSubmitting ? 'SAVING...' : 'SAVE'}
          </button>
        </form>

        <div className="text-center">
          <button onClick={() => navigate('/')} className="text-slate-500 hover:text-white uppercase text-xs font-black tracking-widest">[ BACK ]</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSettings;
