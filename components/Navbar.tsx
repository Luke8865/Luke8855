
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Language } from '../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, currentLang, onLangChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSocial, setShowSocial] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const isActive = (path: string) => location.pathname === path;

  const languages = [
    { code: 'EN' as Language, label: 'English', flag: '🇺🇸' },
    { code: 'ZH' as Language, label: '简体中文', flag: '🇨🇳' },
    { code: 'JP' as Language, label: '日本語', flag: '🇯🇵' },
    { code: 'KR' as Language, label: '한국어', flag: '🇰🇷' },
  ];

  const translations = {
    EN: { home: 'Home', store: 'Store', tradeverse: 'Tradeverse', social: 'Social', login: 'Log In' },
    ZH: { home: '首页', store: '商店', tradeverse: '交易宇宙', social: '社区', login: '登录' },
    JP: { home: 'ホーム', store: 'ストア', tradeverse: 'トレードバース', social: 'コミュニティ', login: 'ログイン' },
    KR: { home: '홈', store: '상점', tradeverse: '트레이드버스', social: '소셜', login: '로그인' },
  }[currentLang];

  const socialLinks = [
    { label: 'X (Twitter)', icon: '🐦', url: '#' },
    { label: 'YouTube', icon: '📺', url: '#' },
    { label: 'Telegram', icon: '✈️', url: '#' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    onLogout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] max-w-5xl">
      <div className="lunar-glass px-3 md:px-6 py-2 md:py-3 flex justify-between items-center shadow-2xl relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
            <span className="text-white font-bubbly font-bold text-lg md:text-xl">D</span>
          </div>
          <span className="font-bubbly text-lg md:text-xl font-bold tracking-tight text-white hidden sm:block uppercase">
            PROJECT<span className="text-[#00d2ff]">：DOG</span>
          </span>
        </Link>

        {/* Main Nav */}
        <div className="flex items-center gap-0.5 md:gap-4">
          <Link to="/" className={`px-2.5 md:px-4 py-2 rounded-lg md:rounded-xl text-[11px] md:text-sm font-bold transition-all ${isActive('/') ? 'bg-blue-500/10 text-[#00d2ff] shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>{translations.home}</Link>
          <Link to="/market" className={`px-2.5 md:px-4 py-2 rounded-lg md:rounded-xl text-[11px] md:text-sm font-bold transition-all ${isActive('/market') ? 'bg-blue-500/10 text-[#00d2ff] shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>{translations.store}</Link>
          <Link to="/tradeverse" className={`px-2.5 md:px-4 py-2 rounded-lg md:rounded-xl text-[11px] md:text-sm font-bold transition-all ${isActive('/tradeverse') ? 'bg-blue-500/10 text-[#00d2ff] shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>{translations.tradeverse}</Link>

          <div className="relative" onMouseEnter={() => setShowSocial(true)} onMouseLeave={() => setShowSocial(false)}>
            <button className={`px-2.5 md:px-4 py-2 rounded-lg md:rounded-xl text-[11px] md:text-sm font-bold transition-all flex items-center gap-1.5 ${showSocial ? 'bg-white/5 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {translations.social}
              <svg className={`w-3 h-3 transition-transform duration-300 ${showSocial ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showSocial && (
              <div className="absolute top-full left-0 pt-2 w-48 animate-in fade-in zoom-in-95 duration-200">
                <div className="lunar-glass p-2 bg-[#0a0b1e]/90 backdrop-blur-2xl border border-white/10 shadow-2xl">
                  {socialLinks.map((link) => (
                    <a key={link.label} href={link.url} className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-blue-500/20 transition-all group">
                      <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                      <span className="tracking-widest uppercase text-[10px]">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {user.isLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-white/5 transition-all outline-none">
                <div className="hidden lg:flex items-center bg-blue-900/30 border border-blue-500/20 px-4 py-1.5 rounded-full">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">{user.username}</span>
                </div>
                <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all border-2 ${showUserMenu || isActive('/profile') ? 'bg-blue-500 border-blue-400' : 'bg-blue-500/20 border-blue-500/40 text-blue-400'}`}>
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute top-full right-0 pt-2 w-64 animate-in fade-in zoom-in-95 duration-200 z-[60]">
                  <div className="lunar-glass p-2 bg-[#0a0b1e]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/10">
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                       <p className="text-white font-bold truncate text-sm text-center uppercase">{user.username}</p>
                    </div>
                    
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-blue-500/30 transition-all group" onClick={() => setShowUserMenu(false)}>
                      <span className="text-xl group-hover:scale-110 transition-transform">💎</span>
                      <span className="tracking-widest uppercase text-[10px]">ASSETS</span>
                    </Link>

                    <Link to="/settings/transaction-password" title="Settings" className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-blue-500/30 transition-all group" onClick={() => setShowUserMenu(false)}>
                      <span className="text-xl group-hover:scale-110 transition-transform text-blue-400">🛡️</span>
                      <span className="tracking-widest uppercase text-[10px]">PIN</span>
                    </Link>
                    
                    <button onClick={handleLogoutClick} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold text-red-400 hover:text-white hover:bg-red-500/30 transition-all group mt-1">
                      <span className="text-xl group-hover:scale-110 transition-transform">🚪</span>
                      <span className="tracking-widest uppercase text-[10px]">Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-cosmic bg-[#00d2ff] text-[#0a0b1e] text-[10px] md:text-xs px-4 md:px-6 py-2 shadow-[0_0_20px_rgba(0,210,255,0.4)]">{translations.login}</Link>
          )}

          <div className="relative" ref={langMenuRef}>
             <button 
               onClick={() => setShowLangMenu(!showLangMenu)}
               className="w-10 h-10 md:w-11 md:h-11 rounded-full lunar-glass flex items-center justify-center hover:bg-white/5 transition-all group border border-white/10"
             >
                <div className="flex flex-col items-center">
                   <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" /></svg>
                   <span className="text-[7px] font-bold text-[#00d2ff] tracking-tighter mt-0.5">{currentLang}</span>
                </div>
             </button>

             {showLangMenu && (
                <div className="absolute top-full right-0 pt-2 w-48 animate-in fade-in zoom-in-95 duration-200 z-[70]">
                  <div className="lunar-glass p-2 bg-[#0a0b1e]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/10">
                     {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            onLangChange(l.code);
                            setShowLangMenu(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all group mb-0.5 last:mb-0 ${currentLang === l.code ? 'bg-blue-600/20 text-[#00d2ff]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                          <div className="flex items-center gap-3">
                             <span className="text-base grayscale group-hover:grayscale-0 transition-all">{l.flag}</span>
                             <span className="uppercase tracking-widest text-[10px]">{l.label}</span>
                          </div>
                          {currentLang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]"></div>}
                        </button>
                     ))}
                  </div>
                </div>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
