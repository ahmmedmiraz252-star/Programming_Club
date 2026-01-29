
import React, { useState } from 'react';
import { CLUB_INFO } from '../data';
import { Github, Linkedin, MessageSquare, Mail, MapPin, Lock, Terminal, X, MessageCircleCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [showDevMessage, setShowDevMessage] = useState(false);

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Logo className="w-12 h-12" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight leading-none">Programming</span>
                <span className="text-xs font-bold text-blue-400 tracking-widest leading-none uppercase">Club</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t(CLUB_INFO.slogan)} Dedicated to excellence in algorithmic thinking.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={CLUB_INFO.socials.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <Github size={20} />
              </a>
              <a href={CLUB_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 text-white">{t('Navigation')}</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">{t('About')}</Link></li>
              <li><Link to="/events" className="hover:text-blue-400 transition-colors">{t('Events')}</Link></li>
              <li><Link to="/resources" className="hover:text-blue-400 transition-colors">{t('Resources')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 text-white">{t('Members')}</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/members" className="hover:text-blue-400 transition-colors">{t('Members')}</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">{t('Contact')}</Link></li>
              <li className="pt-4 mt-4 border-t border-slate-800">
                <Link to="/president" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-bold transition-colors">
                  <Lock size={14} />
                  <span>{t('Admin Portal')}</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 text-white">Location</h3>
            <ul className="space-y-5 text-slate-400 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="mt-0.5 flex-shrink-0 text-blue-500" />
                <span className="leading-relaxed">{CLUB_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0 text-blue-500" />
                <span>{CLUB_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {CLUB_INFO.name} — OFFICIAL PLATFORM
          </p>
          <button 
            onClick={() => setShowDevMessage(true)}
            className="flex items-center space-x-2 text-slate-500 text-[10px] font-black uppercase tracking-widest bg-slate-800/30 px-4 py-2 rounded-full border border-slate-700/50 hover:bg-slate-700 hover:text-blue-400 transition-all active:scale-95 group"
          >
            <Terminal size={12} className="text-blue-400 group-hover:animate-pulse" />
            <span>Developed by Jr. Assistant</span>
          </button>
        </div>
      </div>

      {showDevMessage && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[40px] p-10 lg:p-14 max-w-lg w-full relative shadow-2xl border border-slate-100 animate-scale-in">
            <button onClick={() => setShowDevMessage(false)} className="absolute top-8 right-8 p-2 text-slate-300 hover:text-rose-500 rounded-full transition-all">
              <X size={28} />
            </button>
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
                <MessageCircleCode size={48} />
              </div>
              <div className="space-y-4 mb-12">
                <p className="text-[24px] font-black text-slate-900 leading-tight">নতুন হলে সমস্যা নেই। না বুঝলে জিজ্ঞেস করো। নিয়মিত থাকো — বাকিটা হয়ে যাবে।</p>
              </div>
              <div className="pt-8 border-t border-slate-100 flex flex-col items-center">
                <p className="text-xl font-black text-slate-900">- Miraz Ahmmed</p>
                <p className="text-[11px] text-blue-500 font-black uppercase tracking-[0.3em] mt-1.5">Jr. Assistant</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
