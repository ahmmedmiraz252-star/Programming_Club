
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Cpu, Globe, Rocket, Terminal } from 'lucide-react';
import { useAdminData } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import Logo from '../components/Logo';

const Home: React.FC = () => {
  const { data } = useAdminData();
  const { clubInfo, activities } = data;
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Code2 size={32} />;
      case 'Users': return <Globe size={32} />;
      case 'Zap': return <Rocket size={32} />;
      case 'Brain': return <Cpu size={32} />;
      default: return <Code2 size={32} />;
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none select-none">
          <div className="grid grid-cols-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center p-12">
                <span className="text-[14px] font-mono font-bold whitespace-nowrap -rotate-45 block">
                  #include &lt;logic.h&gt;
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 opacity-40 z-0"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-50 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 opacity-30 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-10 text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-50/80 backdrop-blur-sm text-blue-600 rounded-full font-black text-[10px] uppercase tracking-wider border border-blue-100 shadow-sm">
                <Terminal size={14} />
                <span>// {t('officialClub')}</span>
              </div>
              
              <h1 className="text-6xl md:text-[110px] font-black text-slate-900 leading-[0.9] tracking-[-0.03em] whitespace-pre-line">
                {t(clubInfo.heroTitle).split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line.includes('Triumph') || line.includes('বিজয়') ? <span className="text-logo-gradient">{line}</span> : line}
                    {i < t(clubInfo.heroTitle).split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              
              <p className="text-xl text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-semibold">
                {t(clubInfo.heroSubtitle)}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
                <Link to="/contact" className="w-full sm:w-auto px-12 py-5 bg-logo-gradient text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all flex items-center justify-center group">
                  {t('Start Coding')} <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                </Link>
                <Link to="/events" className="w-full sm:w-auto px-12 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black text-lg hover:bg-slate-50 shadow-lg shadow-slate-200/40 transition-all text-center">
                  {t('View Events')}
                </Link>
              </div>
            </div>
            
            {/* Right Visual: The Code Window */}
            <div className="hidden lg:block relative animate-scale-in delay-300">
               <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-50 rounded-3xl z-0 animate-bounce">
                  <Logo className="w-full h-full p-4 opacity-50" />
               </div>

               <div className="relative z-20 bg-[#0d1117] p-10 rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-800/80">
                  <div className="flex items-center space-x-3 mb-10 border-b border-slate-800 pb-6">
                    <div className="flex space-x-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-rose-500"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-500"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="ml-4 text-slate-500 font-mono text-[11px] uppercase tracking-[0.25em] font-black opacity-60">COMPILER V2.5.0</div>
                  </div>
                  
                  <pre className="text-blue-400 font-mono text-[17px] leading-[1.8] overflow-x-auto scrollbar-hide">
                    <code className="block text-slate-300">
                      {clubInfo.heroCode}
                    </code>
                  </pre>
               </div>
               <div className="absolute -bottom-10 -right-10 w-full h-full bg-blue-600/20 rounded-[48px] -z-10 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title={t('Beyond Just Syntax')} 
            subtitle={t('featureSubtitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group animate-fade-in-up"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[20px] flex items-center justify-center mb-8 group-hover:bg-logo-gradient group-hover:text-white transition-all duration-500 shadow-sm">
                  {getIcon(activity.icon)}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{t(activity.title)}</h3>
                <p className="text-slate-500 leading-relaxed font-semibold text-sm">
                  {t(activity.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
