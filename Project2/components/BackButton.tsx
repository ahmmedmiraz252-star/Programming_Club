
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the back button if we are already on the Landing or Home page
  if (location.pathname === '/' || location.pathname === '/home') return null;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if we are at a point where going back would take us out of the app
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/home');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="group flex items-center space-x-3 text-slate-500 hover:text-blue-600 transition-all mb-8 outline-none"
      aria-label="Go back"
    >
      <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-lg group-hover:border-blue-300 group-hover:bg-blue-50/50 transition-all duration-300">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-400 transition-colors mb-1">Previous</span>
        <span className="text-sm font-black text-slate-700 group-hover:text-blue-700 uppercase tracking-tight">Section</span>
      </div>
    </button>
  );
};

export default BackButton;
