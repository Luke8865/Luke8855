
import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  user: User;
}

type TimeRange = 'WEEK' | 'MONTH' | 'YEAR';

interface ChartData {
  label: string;
  amount: number;
  growth: string;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState('');
  const [timeRange, setTimeRange] = useState<TimeRange>('WEEK');

  // Mock data generator for different time ranges
  const chartDataMap: Record<TimeRange, ChartData[]> = {
    WEEK: [
      { label: '05/14', amount: 850, growth: '+12%' },
      { label: '05/15', amount: 1200, growth: '+41%' },
      { label: '05/16', amount: 950, growth: '-20%' },
      { label: '05/17', amount: 1800, growth: '+89%' },
      { label: '05/18', amount: 1400, growth: '-22%' },
      { label: '05/19', amount: 2100, growth: '+50%' },
      { label: '05/20', amount: 1650, growth: '-21%' },
    ],
    MONTH: [
      { label: 'W1', amount: 5400, growth: '+15%' },
      { label: 'W2', amount: 6200, growth: '+14%' },
      { label: 'W3', amount: 4800, growth: '-22%' },
      { label: 'W4', amount: 7100, growth: '+47%' },
    ],
    YEAR: [
      { label: 'JAN', amount: 22000, growth: '+5%' },
      { label: 'FEB', amount: 24500, growth: '+11%' },
      { label: 'MAR', amount: 19800, growth: '-19%' },
      { label: 'APR', amount: 28000, growth: '+41%' },
      { label: 'MAY', amount: 31000, growth: '+10%' },
      { label: 'JUN', amount: 27500, growth: '-11%' },
      { label: 'JUL', amount: 35000, growth: '+27%' },
      { label: 'AUG', amount: 38000, growth: '+8%' },
      { label: 'SEP', amount: 32000, growth: '-15%' },
      { label: 'OCT', amount: 42000, growth: '+31%' },
      { label: 'NOV', amount: 45000, growth: '+7%' },
      { label: 'DEC', amount: 51000, growth: '+13%' },
    ]
  };

  const currentData = useMemo(() => chartDataMap[timeRange], [timeRange]);
  const maxAmount = useMemo(() => Math.max(...currentData.map(d => d.amount)), [currentData]);
  
  // Calculate total across ALL data sets, not just the filtered one
  const totalHarvestedOverall = useMemo(() => {
    const allValues = Object.values(chartDataMap).flat();
    return allValues.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!user.isLoggedIn) {
    useEffect(() => { navigate('/login'); }, []);
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 md:pt-40 pb-20">
      <header className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-7xl font-black text-white font-bubbly uppercase tracking-tight">DASHBOARD</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs mt-2">Orbital Operations & Yield Analytics</p>
        </div>
        <div className="lunar-glass px-6 py-4 border-cyan-500/20 bg-cyan-500/5 min-w-[200px]">
           <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Total Harvested (Lifetime)</div>
           <div className="text-3xl font-black text-white font-bubbly">{totalHarvestedOverall.toLocaleString()} <span className="text-cyan-400 text-sm">🧂</span></div>
        </div>
      </header>

      {/* Enhanced K-Line Inspired Spice Analytics Chart */}
      <section className="mb-16">
        <div className="lunar-glass p-8 md:p-12 border-white/5 bg-[#0a0b1e]/60 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 relative z-10">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase font-bubbly tracking-tight">Yield Histogram</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Spice Influx tracking system</p>
            </div>
            
            {/* Time Range Filter */}
            <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10">
               {(['WEEK', 'MONTH', 'YEAR'] as TimeRange[]).map((range) => (
                 <button
                   key={range}
                   onClick={() => setTimeRange(range)}
                   className={`px-4 md:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                     timeRange === range 
                     ? 'bg-cyan-500 text-[#0a0b1e] shadow-lg shadow-cyan-500/20' 
                     : 'text-slate-500 hover:text-white'
                   }`}
                 >
                   {range}
                 </button>
               ))}
            </div>
          </div>

          <div className="relative h-64 md:h-96 flex items-end justify-between gap-2 md:gap-4 px-4 overflow-x-auto no-scrollbar">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 py-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-white/20 relative">
                   <span className="absolute -left-10 -top-2 text-[8px] font-black text-slate-600">{(maxAmount * (1 - i/4)).toFixed(0)}</span>
                </div>
              ))}
            </div>

            {/* Bars with K-line styling */}
            {currentData.map((data, index) => {
              const heightPercentage = (data.amount / maxAmount) * 100;
              const isPositive = data.growth.startsWith('+');
              
              return (
                <div key={`${timeRange}-${index}`} className="flex-1 min-w-[20px] md:min-w-[40px] flex flex-col items-center group relative z-10">
                  {/* Growth Indicator */}
                  <span className={`absolute -top-10 text-[9px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-300 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {data.growth}
                  </span>

                  {/* K-line "Wick" */}
                  <div className={`absolute bottom-0 w-px h-full bg-white/10 pointer-events-none`}></div>
                  
                  {/* The Main Bar (Candle Body) */}
                  <div 
                    className={`w-full max-w-[50px] rounded-t-lg md:rounded-t-xl relative overflow-hidden transition-all duration-700 ease-out hover:scale-x-110 shadow-2xl ${
                      isPositive 
                      ? 'bg-gradient-to-t from-emerald-600/20 via-emerald-500/40 to-cyan-400 shadow-cyan-500/20' 
                      : 'bg-gradient-to-t from-blue-900/40 via-blue-700/60 to-blue-500 shadow-blue-500/10'
                    }`}
                    style={{ height: `${heightPercentage}%` }}
                  >
                    {/* Glass Shine */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-white/30 blur-[1px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]"></div>
                    
                    {/* Tooltip Content */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-[10px] font-black text-white drop-shadow-md">{data.amount}</span>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="mt-6 flex flex-col items-center">
                    <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                      {data.label}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-white/10 mt-2 group-hover:bg-cyan-500 transition-colors"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="lunar-glass p-10 text-center relative overflow-hidden group">
            <div className="w-24 h-24 bg-blue-500/20 rounded-full border-4 border-blue-400/30 flex items-center justify-center mx-auto mb-6 text-4xl shadow-2xl">
              👤
            </div>
            <h2 className="text-2xl font-black text-white mb-2 uppercase font-bubbly">{user.username}</h2>
            <div className="inline-block px-4 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-black text-[#00d2ff] uppercase">
              LV {user.level}
            </div>
          </div>

          <div className="lunar-glass p-6 text-center">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Spice Depot Reset Countdown</p>
             <h3 className="text-4xl font-black text-white font-bubbly tracking-widest bg-white/5 py-4 rounded-2xl">
                {countdown}
             </h3>
          </div>
        </div>

        {/* Assets */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="lunar-glass p-10 flex flex-col justify-between hover:-translate-y-1 transition-all border-white/5 bg-white/[0.02]">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-3xl bg-yellow-400/20 flex items-center justify-center text-4xl shadow-inner">💰</div>
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">GOLD</span>
              </div>
              <span className="text-6xl font-black text-white font-bubbly tabular-nums">{user.gold.toLocaleString()}</span>
           </div>

           <div className="lunar-glass p-10 flex flex-col justify-between hover:-translate-y-1 transition-all border-white/5 bg-white/[0.02]">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-3xl bg-cyan-400/20 flex items-center justify-center text-4xl shadow-inner">🧂</div>
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">SPICE</span>
              </div>
              <span className="text-6xl font-black text-cyan-400 font-bubbly tabular-nums">{user.spice.toLocaleString()}</span>
           </div>

           <div className="lunar-glass p-10 flex flex-col justify-between hover:-translate-y-1 transition-all border-white/5 bg-white/[0.02]">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-3xl bg-emerald-400/20 flex items-center justify-center text-4xl shadow-inner">🐕</div>
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">DOGS</span>
              </div>
              <span className="text-6xl font-black text-white font-bubbly tabular-nums">{user.dogsCount}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
