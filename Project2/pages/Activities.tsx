import React from 'react';
import SectionTitle from '../components/SectionTitle';
import BackButton from '../components/BackButton';
import { useAdminData } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { Terminal, Users, Zap, Brain, ChevronRight, Code2, Globe, Rocket, Cpu } from 'lucide-react';

const Activities: React.FC = () => {
  const { data } = useAdminData();
  const { activities } = data;
  const { t } = useLanguage();

  // Mapping string identifiers to Component references
  const getIconComponent = (iconName: string): React.ElementType => {
    const iconMap: Record<string, React.ElementType> = {
      Terminal,
      Users,
      Zap,
      Brain,
      Code2,
      Globe,
      Rocket,
      Cpu
    };
    return iconMap[iconName] || Terminal;
  };

  return (
    <div className="py-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <SectionTitle 
          title="Club Activities" 
          subtitle={t('activitiesSubtitle')}
        />

        <div className="grid grid-cols-1 gap-12">
          {activities.map((activity, index) => {
            const IconComponent = getIconComponent(activity.icon);

            return (
              <div 
                key={activity.id} 
                className={`flex flex-col lg:flex-row items-center gap-12 p-8 rounded-[40px] border border-blue-50 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-full lg:w-1/3 aspect-square rounded-[32px] bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-logo-gradient group-hover:text-white transition-all duration-500`}>
                  <IconComponent size={100} strokeWidth={1.5} />
                </div>
                <div className="flex-1 space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest">
                    Featured Stream
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-xl text-slate-500 leading-relaxed font-medium">
                    {t(activity.description)}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Expert Mentorship', 'Real-world Projects', 'Certificate of Completion', 'Networking Opportunities'].map((item) => (
                      <li key={item} className="flex items-center text-slate-600 font-bold">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <ChevronRight size={14} className="text-white" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all transform hover:-translate-y-1">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Activities;