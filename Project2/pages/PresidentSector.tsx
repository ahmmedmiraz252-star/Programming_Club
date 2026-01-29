import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/AdminContext';
import { supabase } from '../lib/supabase';
import BackButton from '../components/BackButton';
import { 
  Users, Calendar, Trophy, Book, Image as ImageIcon, 
  Plus, Lock, LogOut, Eye, EyeOff, Save, RefreshCw, 
  Search, Edit3, ShieldCheck,
  Home as HomeIcon, Zap, Trash, X, Info, Mail, Upload, Link as LinkIcon, Loader2
} from 'lucide-react';

const PresidentSector: React.FC = () => {
  const { 
    data, 
    isLoading: isGlobalLoading,
    persistToSupabase
  } = useAdminData();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isSecretMode = searchParams.get('mode') === 'secret';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const [stagedData, setStagedData] = useState(data);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Database Management
  const [profiles, setProfiles] = useState<any[]>([]);
  const [dbGallery, setDbGallery] = useState<any[]>([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  useEffect(() => {
    setStagedData(data);
    setIsDirty(false);
  }, [data]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfiles();
      fetchDbGallery();
      const interval = setInterval(fetchProfiles, 5000); 
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchProfiles = async () => {
    try {
      const { data: p, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .order('last_seen', { ascending: false });
      if (pError) throw pError;
      setProfiles(p || []);
    } catch (err) {
      console.error("Profile refresh failed:", err);
    }
  };

  const fetchDbGallery = async () => {
    setIsGalleryLoading(true);
    try {
      const { data: g, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setDbGallery(g || []);
    } catch (err) {
      console.error("Gallery fetch failed:", err);
    } finally {
      setIsGalleryLoading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaveStatus('saving');
    const success = await persistToSupabase(stagedData);
    if (success) {
      setSaveStatus('saved');
      setIsDirty(false);
      setTimeout(() => setSaveStatus('idle'), 2000);
    } else {
      setSaveStatus('idle');
      alert('Failed to deploy changes to cloud.');
    }
  };

  const activeTab = (searchParams.get('tab') as any) || 'users';
  const setActiveTab = (tab: string) => {
    setSearchParams({ tab: tab, mode: searchParams.get('mode') || '' }, { replace: false });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPassword = isSecretMode ? stagedData.secretPassword : stagedData.adminPassword;
    if (passwordInput === targetPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect Access Key');
      setPasswordInput('');
    }
  };

  const updateList = (key: keyof typeof stagedData, newList: any[]) => {
    setStagedData({ ...stagedData, [key]: newList });
    setIsDirty(true);
  };

  // Gallery Specific Logic
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        await addToGallery(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const addToGallery = async (url: string) => {
    try {
      const { error } = await supabase.from('gallery').insert({ url });
      if (error) throw error;
      fetchDbGallery();
    } catch (err) {
      alert("Failed to add to gallery");
    }
  };

  const deleteFromGallery = async (id: string) => {
    if (!confirm("Delete this image forever?")) return;
    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      fetchDbGallery();
    } catch (err) {
      alert("Failed to delete image");
    }
  };

  const openUserEditor = (profile: any) => {
    const dashboard = stagedData.userStorage[profile.id] || {
      courses: [],
      stats: { completedLessons: 0, attendanceRate: '0%' },
      isAccountRestricted: false
    };
    setSelectedUser({ ...profile, dashboard });
    setIsUserModalOpen(true);
  };

  const saveUserModal = () => {
    if (!selectedUser) return;
    setStagedData(prev => ({
      ...prev,
      userStorage: {
        ...prev.userStorage,
        [selectedUser.id]: selectedUser.dashboard
      }
    }));
    setIsDirty(true);
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  if (isGlobalLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <RefreshCw className="text-blue-600 animate-spin mb-4" size={48} />
        <p className="font-black text-xs uppercase tracking-widest text-slate-400">Syncing Cloud Database...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 border border-slate-100 animate-scale-in">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Lock size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Admin Portal</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="ENTER ACCESS KEY"
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-center tracking-[0.3em] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button className="w-full py-5 rounded-2xl bg-logo-gradient text-white font-black text-lg shadow-xl active:scale-95 transition-all">AUTHENTICATE</button>
            {error && <div className="text-rose-500 font-black text-[10px] uppercase text-center tracking-widest mt-4 animate-bounce">{error}</div>}
          </form>
        </div>
      </div>
    );
  }

  const TabButton = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button onClick={() => setActiveTab(id)} className={`flex items-center space-x-4 px-6 py-4 rounded-2xl font-black transition-all w-full text-left ${activeTab === id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-100'}`}>
      <Icon size={18} />
      <span className="text-[11px] uppercase tracking-widest">{label}</span>
    </button>
  );

  const inputClass = "w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-bold text-slate-900";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2 block";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <BackButton />
          <button 
            onClick={handleSaveAll}
            disabled={!isDirty || saveStatus === 'saving'}
            className={`flex items-center space-x-3 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
              !isDirty ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20'
            }`}
          >
            {saveStatus === 'saving' ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
            <span>{saveStatus === 'saving' ? 'Saving...' : 'Deploy Changes'}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-72 shrink-0 space-y-1">
            <TabButton id="users" icon={Users} label="Member Control" />
            <div className="h-4"></div>
            <TabButton id="home" icon={HomeIcon} label="Hero Editor" />
            <TabButton id="about" icon={Info} label="Vision & History" />
            <TabButton id="activities" icon={Zap} label="Activities" />
            <TabButton id="events" icon={Calendar} label="Events" />
            <TabButton id="achievements" icon={Trophy} label="Achievements" />
            <TabButton id="resources" icon={Book} label="Resources" />
            <TabButton id="gallery" icon={ImageIcon} label="Gallery" />
            <TabButton id="contact" icon={Mail} label="Contact Info" />
            <div className="h-4"></div>
            <TabButton id="security" icon={ShieldCheck} label="Security" />
            <div className="pt-8 border-t border-slate-200 mt-8">
              <button onClick={() => navigate('/')} className="flex items-center space-x-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-slate-100 w-full text-left font-black text-[11px] uppercase">
                <LogOut size={18} /> <span>Exit CMS</span>
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 lg:p-12 min-h-[700px]">
            {activeTab === 'users' && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase">Registered Members ({profiles.length})</h2>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      className="pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none w-full md:w-64 font-bold text-sm" 
                      placeholder="Search Roll / Name"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-50">
                        <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile</th>
                        <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Roll ID</th>
                        <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Status</th>
                        <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {profiles.filter(p => p.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.roll?.includes(searchQuery)).map(p => {
                        const lastSeen = p.last_seen ? new Date(p.last_seen).getTime() : 0;
                        const isOnline = (Date.now() - lastSeen) < 45000;
                        const isRestricted = stagedData.userStorage[p.id]?.isAccountRestricted;

                        return (
                          <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-5">
                              <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm relative ${isRestricted ? 'bg-rose-100 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                                  {p.full_name?.charAt(0)}
                                  {isOnline && !isRestricted && (
                                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-black text-slate-900 text-sm">{p.full_name || 'No Name'}</p>
                                  <p className="text-[10px] text-slate-400 uppercase font-bold">{p.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-5 font-bold text-slate-600 text-sm tracking-widest">{p.roll || 'N/A'}</td>
                            <td className="py-5">
                              {isRestricted ? (
                                <span className="px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-[9px] font-black uppercase border border-rose-100">BANNED</span>
                              ) : isOnline ? (
                                <div className="flex items-center space-x-2">
                                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                                  <span className="text-[10px] font-black text-emerald-600 uppercase">Online Now</span>
                                </div>
                              ) : (
                                <span className="text-[10px] font-black text-slate-300 uppercase">Offline</span>
                              )}
                            </td>
                            <td className="py-5 text-right">
                              <button onClick={() => openUserEditor(p)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                <Edit3 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-10 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-slate-900 uppercase">Gallery Management</h2>
                  <div className="flex space-x-3">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleGalleryUpload} 
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-emerald-500/20"
                    >
                      <Upload size={16} /> <span>Upload Pic</span>
                    </button>
                    <button 
                      onClick={() => { const url = prompt('Enter Image URL:'); if (url) addToGallery(url); }} 
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-blue-500/20"
                    >
                      <LinkIcon size={16} /> <span>Add URL</span>
                    </button>
                  </div>
                </div>
                
                {isGalleryLoading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {dbGallery.map((img) => (
                      <div key={img.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                        <img src={img.url} className="w-full h-full object-cover" alt="Gallery" />
                        <button 
                          onClick={() => deleteFromGallery(img.id)} 
                          className="absolute top-2 right-2 p-2 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    ))}
                    {dbGallery.length === 0 && (
                      <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[32px] text-slate-300 font-bold uppercase text-xs tracking-widest">
                        Gallery is empty. Add some moments!
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'home' && (
              <div className="space-y-10 animate-fade-in-up">
                <h2 className="text-3xl font-black text-slate-900 uppercase">Hero Section</h2>
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Main Title (\n for new line)</label>
                    <textarea rows={3} className={inputClass} value={stagedData.clubInfo.heroTitle} onChange={e => {setStagedData({...stagedData, clubInfo: {...stagedData.clubInfo, heroTitle: e.target.value}}); setIsDirty(true);}} />
                  </div>
                  <div>
                    <label className={labelClass}>Subtitle</label>
                    <textarea rows={4} className={inputClass} value={stagedData.clubInfo.heroSubtitle} onChange={e => {setStagedData({...stagedData, clubInfo: {...stagedData.clubInfo, heroSubtitle: e.target.value}}); setIsDirty(true);}} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-10 animate-fade-in-up">
                <h2 className="text-3xl font-black text-slate-900 uppercase">Vision & History</h2>
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Club Mission</label>
                    <textarea rows={3} className={inputClass} value={stagedData.clubInfo.mission} onChange={e => {setStagedData({...stagedData, clubInfo: {...stagedData.clubInfo, mission: e.target.value}}); setIsDirty(true);}} />
                  </div>
                  <div>
                    <label className={labelClass}>Club Vision</label>
                    <textarea rows={3} className={inputClass} value={stagedData.clubInfo.vision} onChange={e => {setStagedData({...stagedData, clubInfo: {...stagedData.clubInfo, vision: e.target.value}}); setIsDirty(true);}} />
                  </div>
                  <div>
                    <label className={labelClass}>History Text</label>
                    <textarea rows={5} className={inputClass} value={stagedData.clubInfo.history} onChange={e => {setStagedData({...stagedData, clubInfo: {...stagedData.clubInfo, history: e.target.value}}); setIsDirty(true);}} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="space-y-10 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-slate-900 uppercase">Activities</h2>
                  <button onClick={() => updateList('activities', [...stagedData.activities, { id: Date.now().toString(), title: 'New Activity', description: 'Description', icon: 'Zap' }])} className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase">
                    <Plus size={16} /> <span>Add Activity</span>
                  </button>
                </div>
                <div className="grid gap-6">
                  {stagedData.activities.map((act, idx) => (
                    <div key={act.id} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row gap-6 relative">
                      <button onClick={() => updateList('activities', stagedData.activities.filter((_, i) => i !== idx))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"><Trash size={18} /></button>
                      <div className="flex-1 space-y-4">
                        <input className={inputClass} value={act.title} onChange={e => {
                          const newList = [...stagedData.activities];
                          newList[idx].title = e.target.value;
                          updateList('activities', newList);
                        }} />
                        <textarea rows={2} className={inputClass} value={act.description} onChange={e => {
                          const newList = [...stagedData.activities];
                          newList[idx].description = e.target.value;
                          updateList('activities', newList);
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-10 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-slate-900 uppercase">Events</h2>
                  <button onClick={() => updateList('events', [...stagedData.events, { id: Date.now().toString(), title: 'New Event', date: 'Date', description: '', type: 'Upcoming', image: '', location: '' }])} className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase">
                    <Plus size={16} /> <span>Add Event</span>
                  </button>
                </div>
                <div className="grid gap-6">
                  {stagedData.events.map((ev, idx) => (
                    <div key={ev.id} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button onClick={() => updateList('events', stagedData.events.filter((_, i) => i !== idx))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"><Trash size={18} /></button>
                      <input className={inputClass} value={ev.title} placeholder="Title" onChange={e => { const l = [...stagedData.events]; l[idx].title = e.target.value; updateList('events', l); }} />
                      <input className={inputClass} value={ev.date} placeholder="Date" onChange={e => { const l = [...stagedData.events]; l[idx].date = e.target.value; updateList('events', l); }} />
                      <input className={inputClass} value={ev.location} placeholder="Location" onChange={e => { const l = [...stagedData.events]; l[idx].location = e.target.value; updateList('events', l); }} />
                      <select className={inputClass} value={ev.type} onChange={e => { const l = [...stagedData.events]; l[idx].type = e.target.value as any; updateList('events', l); }}>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Past">Past</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-10 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-slate-900 uppercase">Achievements</h2>
                  <button onClick={() => updateList('achievements', [...stagedData.achievements, { id: Date.now().toString(), title: 'New Achievement', result: '', date: '', description: '', icon: 'Trophy' }])} className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase">
                    <Plus size={16} /> <span>Add Achievement</span>
                  </button>
                </div>
                <div className="grid gap-6">
                  {stagedData.achievements.map((ach, idx) => (
                    <div key={ach.id} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative space-y-4">
                      <button onClick={() => updateList('achievements', stagedData.achievements.filter((_, i) => i !== idx))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"><Trash size={18} /></button>
                      <input className={inputClass} value={ach.title} placeholder="Title" onChange={e => { const l = [...stagedData.achievements]; l[idx].title = e.target.value; updateList('achievements', l); }} />
                      <input className={inputClass} value={ach.result} placeholder="Result (e.g. Rank 1)" onChange={e => { const l = [...stagedData.achievements]; l[idx].result = e.target.value; updateList('achievements', l); }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-10 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-slate-900 uppercase">Resources</h2>
                  <button onClick={() => updateList('resources', [...stagedData.resources, { id: Date.now().toString(), category: 'Languages', title: 'New Link', link: '#', description: '' }])} className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase">
                    <Plus size={16} /> <span>Add Resource</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {stagedData.resources.map((res, idx) => (
                    <div key={res.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button onClick={() => updateList('resources', stagedData.resources.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash size={16} /></button>
                      <input className={inputClass} value={res.title} placeholder="Title" onChange={e => { const l = [...stagedData.resources]; l[idx].title = e.target.value; updateList('resources', l); }} />
                      <input className={inputClass} value={res.category} placeholder="Category" onChange={e => { const l = [...stagedData.resources]; l[idx].category = e.target.value; updateList('resources', l); }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-10 animate-fade-in-up">
                <h2 className="text-3xl font-black text-slate-900 uppercase">Contact Info</h2>
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Club Email</label>
                    <input className={inputClass} value={stagedData.clubInfo.email} onChange={e => {setStagedData({...stagedData, clubInfo: {...stagedData.clubInfo, email: e.target.value}}); setIsDirty(true);}} />
                  </div>
                  <div>
                    <label className={labelClass}>Physical Address</label>
                    <textarea rows={3} className={inputClass} value={stagedData.clubInfo.address} onChange={e => {setStagedData({...stagedData, clubInfo: {...stagedData.clubInfo, address: e.target.value}}); setIsDirty(true);}} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-10 animate-fade-in-up">
                <h2 className="text-3xl font-black text-slate-900 uppercase">System Security</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100">
                    <Lock className="text-blue-600 mb-4" size={32} />
                    <label className={labelClass}>Admin Panel Key</label>
                    <input className={inputClass} value={stagedData.adminPassword} onChange={e => {setStagedData({...stagedData, adminPassword: e.target.value}); setIsDirty(true);}} />
                    <p className="text-[9px] text-blue-400 font-bold uppercase mt-4">Current key for normal admin access</p>
                  </div>
                  
                  <div className="p-8 bg-slate-900 rounded-[32px] text-white flex flex-col justify-center">
                    <ShieldCheck className="text-blue-400 mb-4" size={32} />
                    <h3 className="font-black uppercase text-sm tracking-tight mb-2">Developer Security Lock</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-bold">
                      The Secret Developer Key is hard-locked for security. It cannot be viewed or changed from this portal to prevent accidental lockout.
                    </p>
                    <div className="mt-6 flex items-center space-x-3 text-emerald-400">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest">Active & Protected</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[40px] max-w-2xl w-full shadow-2xl animate-scale-in overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl">
                    {selectedUser.full_name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase text-slate-900">{selectedUser.full_name}</h3>
                    <p className="text-[10px] font-black uppercase text-slate-400">Roll: {selectedUser.roll}</p>
                  </div>
               </div>
               <button onClick={() => setIsUserModalOpen(false)} className="p-2 text-slate-400 hover:text-rose-500"><X size={24} /></button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className={`p-6 rounded-3xl border flex items-center justify-between ${selectedUser.dashboard.isAccountRestricted ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
                <div className="flex items-center space-x-4">
                  <ShieldCheck className={selectedUser.dashboard.isAccountRestricted ? 'text-rose-500' : 'text-emerald-500'} />
                  <span className="font-black uppercase text-xs">Access: {selectedUser.dashboard.isAccountRestricted ? 'RESTRICTED' : 'AUTHORIZED'}</span>
                </div>
                <button 
                  onClick={() => setSelectedUser({...selectedUser, dashboard: {...selectedUser.dashboard, isAccountRestricted: !selectedUser.dashboard.isAccountRestricted}})}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${selectedUser.dashboard.isAccountRestricted ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'}`}
                >
                  {selectedUser.dashboard.isAccountRestricted ? 'Unban' : 'Ban User'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelClass}>Lessons Finished</label>
                  <input type="number" className={inputClass} value={selectedUser.dashboard.stats.completedLessons} onChange={e => setSelectedUser({...selectedUser, dashboard: {...selectedUser.dashboard, stats: {...selectedUser.dashboard.stats, completedLessons: parseInt(e.target.value)}}})} />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Attendance (%)</label>
                  <input className={inputClass} value={selectedUser.dashboard.stats.attendanceRate} onChange={e => setSelectedUser({...selectedUser, dashboard: {...selectedUser.dashboard, stats: {...selectedUser.dashboard.stats, attendanceRate: e.target.value}}})} />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                 <button onClick={saveUserModal} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Update Student</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresidentSector;