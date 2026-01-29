
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import BackButton from '../components/BackButton';
import { useAdminData } from '../context/AdminContext';
import { BookOpen, ExternalLink, Code2 } from 'lucide-react';

const Resources: React.FC = () => {
  const { data } = useAdminData();
  const resourcesList = data.resources;
  const categories = Array.from(new Set(resourcesList.map(r => r.category)));

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <SectionTitle title="Knowledge Hub" subtitle="Curated resources to help you master programming languages and algorithms." />

        <div className="space-y-16">
          {categories.map(cat => (
            <div key={cat}>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-2xl font-bold text-blue-950 uppercase tracking-wide">{cat}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourcesList.filter(r => r.category === cat).map(res => (
                  <a 
                    key={res.id} 
                    href={res.link}
                    className="block p-6 bg-white border border-gray-100 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      {res.language ? (
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold flex items-center">
                          <Code2 size={12} className="mr-1" /> {res.language}
                        </span>
                      ) : (
                        <div />
                      )}
                      <ExternalLink size={18} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h4 className="text-lg font-bold text-blue-950 mb-2 group-hover:text-blue-700 transition-colors">{res.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {res.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
