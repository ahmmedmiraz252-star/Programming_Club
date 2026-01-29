
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  X, Globe, Home as HomeIcon, Zap, Calendar, PhoneCall, 
  Info, Users, Trophy, Book, Image as ImageIcon, Lock, 
  Menu, LogOut, User as UserIcon, ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { user, profile, signOut } = useAuth();
  
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogoTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      navigate('/president?mode=secret');
    }, 7000);
  };

  const handleLogoTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const drawerLinks = [
    { name: 'Home', path: '/home', icon: <HomeIcon size={18} /> },
    { name: 'Member', path: '/members', icon: <Users size={18} /> },
    { name: 'Activities', path: '/activities', icon: <Zap size={18} /> },
    { name: 'Event', path: '/events', icon: <Calendar size={18} /> },
    { name: 'Achievement', path: '/achievements', icon: <Trophy size={18} /> },
    { name: 'Resources', path: '/resources', icon: <Book size={18} /> },
    { name: 'Gallery', path: '/gallery', icon: <ImageIcon size={18} /> },
    { name: 'Contact', path: '/contact', icon: <PhoneCall size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
  ];

  return (
    <>
      <nav 
        className={`sticky top-0 z-[100] transition-all duration-300 border-b ${
          isScrolled ? 'bg-white/95 backdrop-blur-md py-2 shadow-sm border-slate-100' : 'bg-white py-3 border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-slate-500 hover:text-blue-600 transition-colors p-1"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>

              <div 
                className="flex items-center space-x-3 group cursor-pointer"
                onMouseDown={handleLogoTouchStart}
                onMouseUp={handleLogoTouchEnd}
                onMouseLeave={handleLogoTouchEnd}
                onTouchStart={handleLogoTouchStart}
                onTouchEnd={handleLogoTouchEnd}
              >
                <Logo className="w-9 h-9 transition-transform duration-500 group-hover:scale-105" />
                <Link to="/home" className="flex flex-col">
                  <span className="text-[16px] font-bold text-slate-900 tracking-tight leading-none uppercase">Programming</span>
                  <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] leading-none uppercase mt-1">Club</span>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                to="/home" 
                className={`text-sm font-bold uppercase tracking-widest transition-all ${isActive('/home') ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}
              >
                {t('Home')}
              </Link>
              <Link 
                to="/activities" 
                className={`text-sm font-bold uppercase tracking-widest transition-all ${isActive('/activities') ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}
              >
                {t('Activities')}
              </Link>
              <Link 
                to="/events" 
                className={`text-sm font-bold uppercase tracking-widest transition-all ${isActive('/events') ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}
              >
                {t('Events')}
              </Link>

              <div className="h-6 w-px bg-slate-200 mx-2"></div>

              {user ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/dashboard"
                    className={`flex flex-col items-end group ${isActive('/dashboard') ? 'text-blue-600' : 'text-slate-500'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest group-hover:text-blue-400">Dashboard</span>
                    <span className="text-sm font-black text-slate-900 group-hover:text-blue-600">{profile?.full_name || user.email?.split('@')[0]}</span>
                  </Link>
                  <div className="flex items-center space-x-1 ml-2">
                    <button 
                      onClick={() => signOut()}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="bg-logo-gradient text-white px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                  {t('Join Club')}
                </Link>
              )}
            </div>

            <div className="lg:hidden flex items-center space-x-3">
              {user ? (
                <Link to="/dashboard" className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border border-blue-100">
                  <LayoutDashboard size={20} />
                </Link>
              ) : (
                <Link to="/auth" className="bg-logo-gradient text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`fixed inset-y-0 left-0 w-[300px] bg-white transition-transform duration-500 shadow-2xl flex flex-col ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo className="w-8 h-8" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-900">Navigation</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-rose-500"><X size={20} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all mb-4 ${
                  isActive('/dashboard') ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border border-blue-100'
                }`}
              >
                <LayoutDashboard size={18} />
                <span className="text-sm font-black uppercase tracking-wider">My Dashboard</span>
              </Link>
            )}

            {drawerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all ${
                  isActive(link.path) ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.icon}
                <span className="text-sm font-bold uppercase tracking-wider">{t(link.name)}</span>
              </Link>
            ))}
            
            <Link
              to="/president"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all border-t border-slate-50 mt-4 text-blue-600 hover:bg-blue-50`}
            >
              <ShieldCheck size={18} />
              <span className="text-sm font-bold uppercase tracking-wider">Admin Portal</span>
            </Link>
          </div>

          <div className="p-6 border-t border-slate-50 space-y-3">
            {user ? (
               <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="w-full flex items-center justify-center space-x-3 py-4 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs uppercase tracking-widest">
                 <LogOut size={16} /> <span>Sign Out</span>
               </button>
            ) : (
              <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="w-full flex items-center justify-center space-x-3 py-4 bg-logo-gradient text-white rounded-xl font-bold text-xs uppercase tracking-widest">
                <UserIcon size={16} /> <span>Join Our Community</span>
              </Link>
            )}
            
            <button 
              onClick={() => { setLanguage(language === 'en' ? 'bn' : 'en'); setIsMenuOpen(false); }} 
              className="w-full py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2 text-slate-500"
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
