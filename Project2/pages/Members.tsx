import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import BackButton from '../components/BackButton';
import { useAdminData } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { Github, Linkedin, Search, UserCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Member } from '../types';

const Members: React.FC = () => {
  const { data } = useAdminData();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'All' | 'Executive' | 'Core' | 'Volunteer'>('All');
  const [dbMembers, setDbMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;

        if (profiles) {
          const mapped: Member[] = profiles.map(p => ({
            id: p.id,
            name: p.full_name || 'New Member',
            roll: p.roll,
            role: 'General Member',
            category: 'Volunteer',
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.full_name || 'U')}&background=E0F2FE&color=0047FF&bold=true&rounded=true`,
            github: '#',
            linkedin: '#'
          }));
          setDbMembers(mapped);
        }
      } catch (err) {
        console.error("Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Filter official members from data.members
  const officialMembers = data.members.filter(m => {
    const matchesTab = activeTab === 'All' || m.category === activeTab;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Filter registered members (excluding those already in official list if any overlap)
  const officialIds = new Set(data.members.map(m => m.id));
  const newRegistrations = dbMembers.filter(m => {
    if (officialIds.has(m.id)) return false;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (m.roll && m.roll.includes(searchQuery));
    return matchesSearch;
  });

  const categories = ['All', 'Executive', 'Core', 'Volunteer'];

  return (
    <div className="py-20 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        
        <div className="mb-16">
           <SectionTitle title={t('communityTitle')} subtitle={t('communitySubtitle')} />
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat as any)}
                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white text-slate-500 border border-slate-100 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search members..." 
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Official Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 animate-fade-in-up">
          {officialMembers.map(member => (
            <div key={member.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all group flex flex-col h-full">
              <div className="p-8 pb-4">
                <div className="relative aspect-square rounded-[32px] overflow-hidden bg-slate-100 shadow-inner">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="px-8 pb-8 text-center flex flex-col flex-grow">
                {/* Category Badge - Moved below image */}
                <div className="mb-3">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                    {member.category}
                  </span>
                </div>
                
                <h4 className="text-xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{member.name}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{member.role}</p>
                
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest"># ID: {member.id}</span>
                  <div className="flex space-x-2">
                    {member.github && (
                      <a href={member.github} className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                        <Github size={14} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all">
                        <Linkedin size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newly Registered Members Section */}
        <div className="space-y-16">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative bg-[#F8FAFC] px-8">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Newly Registered Members</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
              {newRegistrations.map(member => (
                <div key={member.id} className="group bg-white rounded-[32px] p-6 border border-slate-100 flex items-center space-x-5 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center font-black text-2xl shrink-0 group-hover:scale-105 transition-transform">
                    {member.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h4>
                    
                    <div className="flex flex-col space-y-1 mt-1">
                      <div className="flex items-center text-blue-600 space-x-1.5">
                        <span className="text-[10px] font-black uppercase tracking-tighter"># ROLL:{member.roll || member.id.slice(0, 6).toUpperCase()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">General Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {newRegistrations.length === 0 && (
                <div className="col-span-full text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                  <UserCheck className="mx-auto text-slate-200 mb-4" size={48} />
                  <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No new registrations yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;