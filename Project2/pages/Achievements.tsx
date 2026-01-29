
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import BackButton from '../components/BackButton';
import { useAdminData } from '../context/AdminContext';
import { Trophy, Award, Star, Medal } from 'lucide-react';

const Achievements: React.FC = () => {
  const { data } = useAdminData();
  const achievementsList = data.achievements;

  return (
    <div className="py-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <SectionTitle 
          title="Milestones of Excellence" 
          subtitle="Celebrating our members' dedication and hard-earned successes in global arenas."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {achievementsList.map((ach) => (
            <div key={ach.id} className="p-8 border-2 border-blue-50 rounded-3xl bg-white hover:border-blue-600 transition-all group flex items-start space-x-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex-shrink-0 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {ach.icon === 'Trophy' && <Trophy size={32} />}
                {ach.icon === 'Award' && <Award size={32} />}
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-bold text-blue-950">{ach.title}</h3>
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">{ach.date}</span>
                </div>
                <p className="text-blue-700 font-bold text-lg mb-3">{ach.result}</p>
                <p className="text-gray-600 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-3xl p-12 text-center border-2 border-blue-100 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Want your achievement listed here?</h3>
            <p className="text-blue-700 max-w-xl mx-auto mb-8">
              Every month we honor a student who showed exceptional growth and contribution to the community. Participate, lead, and code!
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg">
              Check Hall of Fame
            </button>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Star size={120} />
          </div>
          <div className="absolute bottom-0 left-0 p-8 opacity-10">
            <Medal size={120} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
