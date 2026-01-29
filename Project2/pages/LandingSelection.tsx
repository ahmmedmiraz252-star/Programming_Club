
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { User, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';

interface LandingSelectionProps {
  onEnter: () => void;
}

const LandingSelection: React.FC<LandingSelectionProps> = ({ onEnter }) => {
  const navigate = useNavigate();

  const handleEntry = (path: string) => {
    onEnter();
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
      <div className="w-full max-w-lg z-10 text-center space-y-12 animate-scale-in">
        <Logo className="w-32 h-32 mx-auto" />
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Welcome to <span className="text-blue-400">Club</span></h1>
        </div>
        <div className="grid grid-cols-1 gap-4 w-full">
          <button onClick={() => handleEntry('/auth?view=login')} className="group flex items-center justify-between p-6 bg-logo-gradient rounded-[24px] text-white shadow-2xl transition-all">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center"><User size={28} /></div>
              <h3 className="font-black text-xl uppercase tracking-tight">Member Login</h3>
            </div>
            <ArrowRight size={24} />
          </button>
          <button onClick={() => handleEntry('/auth?view=signup')} className="group flex items-center justify-between p-6 bg-slate-800/50 border border-slate-700 rounded-[24px] text-white transition-all">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center"><UserPlus size={28} /></div>
              <h3 className="font-black text-xl uppercase tracking-tight">New Member</h3>
            </div>
            <ArrowRight size={24} />
          </button>
          <button onClick={() => handleEntry('/home')} className="py-4 text-slate-500 hover:text-white font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center space-x-2">
            <ShieldCheck size={16} /><span>Continue as Guest</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingSelection;
