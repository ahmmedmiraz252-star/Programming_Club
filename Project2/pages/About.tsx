
import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import BackButton from '../components/BackButton';
import { useAdminData } from '../context/AdminContext';
import { Target, Eye, Clock, Terminal, ShieldCheck, X, MessageCircleCode, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const { data } = useAdminData();
  const { clubInfo, members } = data;
  const advisors = members.filter(m => m.category === 'Executive' || m.role.toLowerCase().includes('advisor'));
  
  const [showDevMessage, setShowDevMessage] = useState(false);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <SectionTitle title={`About ${clubInfo.name}`} subtitle="Dedicated to building the next generation of algorithmic masterminds." />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl">
              <h3 className="text-xl font-bold text-blue-900 flex items-center mb-3">
                <Clock className="mr-2" /> Our History
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {clubInfo.history}
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed font-medium">
              We started as a small group of friends who loved solving puzzles and building things with code. Today, {clubInfo.name} serves as the primary technical hub for {clubInfo.institute}.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src={clubInfo.aboutImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"} 
              alt="Club History" 
              className="relative rounded-2xl shadow-2xl transition-all duration-500 border border-slate-100"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold text-blue-950 mb-4">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {clubInfo.mission}
            </p>
          </div>
          <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-950 text-white rounded-2xl flex items-center justify-center mb-6">
              <Eye size={32} />
            </div>
            <h3 className="text-2xl font-bold text-blue-950 mb-4">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {clubInfo.vision}
            </p>
          </div>
        </div>

        {/* Advisors */}
        <section className="mb-24">
          <SectionTitle title="Our Guidance" subtitle="Experienced faculty advisors and core executive members." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisors.map(member => (
              <div key={member.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all text-center p-8">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-50" />
                <h4 className="text-xl font-bold text-blue-950">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Credits Section */}
        <section className="bg-slate-950 rounded-[40px] p-12 lg:p-20 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <div className="inline-flex items-center space-x-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-4">
                <Terminal size={14} />
                <span>Developer & Designer Unit</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-6">Built for Logic, Crafted for Impact.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Our digital hub is meticulously crafted by our in-house technical lead to provide a seamless experience for every aspiring programmer in the institute.
              </p>
            </div>
            
            <div className="flex-shrink-0 grid grid-cols-1 gap-4 w-full lg:w-auto">
              {/* Clickable Card */}
              <button 
                onClick={() => setShowDevMessage(true)}
                className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-[32px] flex items-center space-x-6 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all text-left group shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Sparkles size={24} className="text-blue-400" />
                </div>
                
                <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-0.5">Developer & Designer</h4>
                  <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] group-hover:text-blue-300">Jr. Assistant</p>
                </div>
              </button>
              
              <div className="p-4 text-center">
                <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.4em]">Optimized Performance — React 19</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Developer Message Modal (Popup) */}
      {showDevMessage && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[40px] p-10 lg:p-14 max-w-lg w-full relative shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] border border-slate-100 animate-scale-in">
            {/* Close Button */}
            <button 
              onClick={() => setShowDevMessage(false)}
              className="absolute top-8 right-8 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
            >
              <X size={28} />
            </button>
            
            <div className="text-center">
              {/* Animated Icon Container */}
              <div className="relative w-24 h-24 mx-auto mb-10">
                <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-6 opacity-10 animate-pulse"></div>
                <div className="relative bg-blue-50 text-blue-600 rounded-3xl w-full h-full flex items-center justify-center shadow-inner">
                  <MessageCircleCode size={48} />
                </div>
              </div>
              
              {/* The Bengali Message with beautiful spacing */}
              <div className="space-y-4 mb-12">
                <p className="text-[28px] font-black text-slate-900 leading-tight tracking-tight">নতুন হলে সমস্যা নেই।</p>
                <p className="text-[28px] font-black text-slate-900 leading-tight tracking-tight">না বুঝলে জিজ্ঞেস করো।</p>
                <p className="text-[28px] font-black text-blue-600 leading-tight tracking-tight">নিয়মিত থাকো — বাকিটা হয়ে যাবে।</p>
              </div>
              
              {/* Refined Signature Section */}
              <div className="pt-8 border-t border-slate-100 flex flex-col items-center">
                <div className="w-12 h-1 bg-blue-100 rounded-full mb-6"></div>
                <p className="text-xl font-black text-slate-900 tracking-tight">- Miraz Ahmmed</p>
                <p className="text-[11px] text-blue-500 font-black uppercase tracking-[0.3em] mt-1.5 px-4 py-1.5 bg-blue-50 rounded-full">Jr. Assistant</p>
              </div>
            </div>
            
            {/* Action Button */}
            <button 
              onClick={() => setShowDevMessage(false)}
              className="w-full mt-12 py-5 bg-logo-gradient text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 active:scale-95 transition-all hover:-translate-y-1"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
