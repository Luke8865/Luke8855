
import React, { useState } from 'react';
import { User } from '../types';

interface RedeemProps {
  user: User;
}

const RECENT_REWARDS = [
  { id: 1, name: 'Welcome Pack', code: 'HELLO-DOG', reward: '500 Gold + 10 Gems', time: '2h ago' },
  { id: 2, name: 'Beta Reward', code: 'PROJECT-ALPHA', reward: 'Unique Collar Skin', time: '5h ago' },
  { id: 3, name: 'Milestone 1M', code: 'ONE-MILLION', reward: 'Elite Mystery Box', time: '1d ago' },
];

const Redeem: React.FC<RedeemProps> = ({ user }) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      if (code.toUpperCase() === 'LUCKY-DOG') {
        setStatus('success');
        setMessage('Voucher confirmed: 100 Gems added.');
        setCode('');
      } else {
        setStatus('error');
        setMessage('Voucher code not recognized.');
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Redeem Rewards</h1>
        <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
          Enter your voucher codes below to unlock exclusive gear and resource boosts.
        </p>
      </header>

      <div className="w-full max-w-xl mx-auto">
        <div className="clean-card p-10 shadow-xl">
          <form onSubmit={handleRedeem} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Voucher Input</label>
              <input 
                type="text" 
                placeholder="E.G. ALPHA-2024"
                className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-5 text-xl font-bold tracking-widest text-center focus:outline-none transition-all ${
                  status === 'error' ? 'border-red-500/30 text-red-500' : 
                  status === 'success' ? 'border-emerald-500/30 text-emerald-500' : 'border-slate-100 focus:border-indigo-500 text-slate-900'
                }`}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setStatus('idle');
                }}
                disabled={status === 'loading'}
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'loading' || !code.trim()}
              className="w-full btn-flat btn-primary py-5 text-lg disabled:opacity-50"
            >
              {status === 'loading' ? 'Verifying...' : 'Validate Code'}
            </button>

            {message && (
              <div className={`p-4 rounded-xl text-center text-sm font-bold ${
                status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>

        <div className="mt-16 space-y-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest px-4">Active Vouchers</h2>
          <div className="space-y-3">
            {RECENT_REWARDS.map((reward) => (
              <div key={reward.id} className="clean-card p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg">
                    🎁
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight">{reward.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{reward.reward}</p>
                  </div>
                </div>
                <div className="text-right">
                  <code className="text-indigo-600 font-bold text-xs block mb-1">{reward.code}</code>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">{reward.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-slate-100 flex items-start gap-4">
          <span className="text-lg">ℹ️</span>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            <strong>Policy:</strong> Codes are typically valid for 30 days and can only be applied once per registered account. For support, please contact help@projectdog.io.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Redeem;
