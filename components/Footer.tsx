
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="lunar-glass mx-4 md:mx-12 my-8 py-10 px-8 md:px-12 border-t-0 bg-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bubbly font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-white text-xl tracking-tight font-bubbly">PROJECT DOG</span>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed font-medium text-xs">
            The ultimate canine merge game. Breed unique dogs, trade items, and climb the global leaderboard.
          </p>
          <div className="flex items-center gap-4 pt-2">
             <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition-all cursor-pointer border border-white/5 text-lg">🐦</div>
             <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition-all cursor-pointer border border-white/5 text-lg">👾</div>
             <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition-all cursor-pointer border border-white/5 text-lg">🛸</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Support</h4>
          <ul className="space-y-2 text-slate-300 text-xs font-bold">
            <li><a href="#" className="hover:text-[#00d2ff] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#00d2ff] transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-[#00d2ff] transition-colors">Help Center</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em]">
        <span>&copy; 2024 PROJECT DOG // ALL RIGHTS RESERVED</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="text-[#00d2ff]">v2.4.1 Build</span>
          <span>Security Verified</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
