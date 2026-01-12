
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (username: string) => void;
  isLoggedIn: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoggedIn }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendCode = () => {
    if (!email || timer > 0) return;
    setTimer(60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'login') {
      if (email === '123' && password === '123') {
        onLogin(email);
        navigate('/');
      } else {
        setError('Invalid: Use 123 / 123');
      }
      return;
    }
    onLogin(email);
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-12 lunar-glass p-16 shadow-2xl relative overflow-hidden group">
          <div className="w-24 h-24 bg-blue-500/10 text-blue-400 rounded-[2.5rem] border border-blue-500/20 flex items-center justify-center mx-auto text-5xl">✓</div>
          <h2 className="text-4xl font-bold text-white font-bubbly uppercase tracking-tight">Access Granted</h2>
          <button onClick={() => navigate('/')} className="w-full bg-cyan-500 text-[#0a0b1e] py-5 rounded-full font-black uppercase tracking-widest">ENTER</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-32 relative">
      <div className="w-full space-y-12 z-10 max-w-md">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white font-bubbly uppercase tracking-tight">
            {mode === 'signup' ? 'SIGN UP' : mode === 'forgot' ? 'RESET' : 'LOGIN'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="lunar-glass p-12 space-y-8 shadow-2xl">
          <div className="space-y-6">
            <input 
              type="text" 
              required
              className="w-full bg-black/40 border-2 border-white/5 rounded-2xl px-6 py-4 font-bold text-white focus:outline-none focus:border-cyan-500"
              placeholder="ACCOUNT / EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            {(mode === 'signup' || mode === 'forgot') && (
              <div className="flex gap-2">
                <input 
                  type="text" 
                  required
                  className="flex-grow bg-black/40 border-2 border-white/5 rounded-2xl px-6 py-4 font-bold text-white focus:outline-none"
                  placeholder="CODE"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                />
                <button type="button" onClick={handleSendCode} className="px-6 bg-white/5 rounded-2xl text-xs font-black uppercase text-white border border-white/10">{timer > 0 ? timer : 'SEND'}</button>
              </div>
            )}

            <input 
              type="password" 
              required
              className="w-full bg-black/40 border-2 border-white/5 rounded-2xl px-6 py-4 font-bold text-white focus:outline-none focus:border-cyan-500"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {mode === 'signup' && (
              <input 
                type="text" 
                required
                className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-4 font-bold text-yellow-400 focus:outline-none"
                placeholder="INVITE CODE"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
            )}
          </div>

          {error && <div className="text-red-400 text-center text-xs font-black uppercase">{error}</div>}

          <button type="submit" className="w-full bg-cyan-500 text-[#0a0b1e] py-5 rounded-full font-black uppercase tracking-widest shadow-xl">
            {mode === 'signup' ? 'REGISTER' : mode === 'forgot' ? 'SUBMIT' : 'SIGN IN'}
          </button>
        </form>

        <div className="text-center">
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-cyan-400 hover:text-white transition-colors uppercase text-sm tracking-widest font-black">
            {mode === 'login' ? '[ NEW ACCOUNT ]' : '[ BACK TO LOGIN ]'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
