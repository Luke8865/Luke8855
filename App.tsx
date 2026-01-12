
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Market from './views/Market';
import Login from './views/Login';
import Tradeverse from './views/Tradeverse';
import Profile from './views/Profile';
import Gameplay from './views/Gameplay';
import TransactionSettings from './views/TransactionSettings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { User, Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('EN');
  const [user, setUser] = useState<User>({
    username: 'Guest',
    level: 1,
    exp: 0,
    maxExp: 100,
    gems: 0,
    gold: 0,
    spice: 1000,
    dogsCount: 0,
    isLoggedIn: false
  });

  const handleLogin = (username: string) => {
    setUser({
      username,
      level: 15,
      exp: 750,
      maxExp: 1000,
      gems: 250,
      gold: 45000,
      spice: 12800,
      dogsCount: 24,
      isLoggedIn: true
    });
  };

  const handleLogout = () => {
    setUser({
      username: 'Guest',
      level: 1,
      exp: 0,
      maxExp: 100,
      gems: 0,
      gold: 0,
      spice: 1000,
      dogsCount: 0,
      isLoggedIn: false
    });
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-blue-500 selection:text-white">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          currentLang={lang} 
          onLangChange={setLang} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market user={user} />} />
            <Route path="/tradeverse" element={<Tradeverse user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/gameplay" element={<Gameplay />} />
            <Route path="/login" element={<Login onLogin={handleLogin} isLoggedIn={user.isLoggedIn} />} />
            <Route path="/settings/transaction-password" element={<TransactionSettings />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
