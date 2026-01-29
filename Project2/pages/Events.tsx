import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import BackButton from '../components/BackButton';
import { useAdminData } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Calendar, MapPin, ExternalLink, Loader2, CheckCircle, ShieldAlert, X, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Events: React.FC = () => {
  const { data } = useAdminData();
  const { t } = useLanguage();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const [filter, setFilter] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [userRegistrations, setUserRegistrations] = useState<string[]>([]);
  const [isLoadingReg, setIsLoadingReg] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserRegistrations();
    } else {
      setIsLoadingReg(false);
    }
  }, [user]);

  const fetchUserRegistrations = async () => {
    try {
      const { data: regs, error } = await supabase
        .from('event_registrations')
        .select('event_id')
        .eq('user_id', user?.id);
      
      if (error) throw error;
      if (regs) {
        setUserRegistrations(regs.map(r => r.event_id));
      }
    } catch (err) {
      console.error("Error fetching registrations:", err);
    } finally {
      setIsLoadingReg(false);
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setRegisteringId(eventId);
    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: eventId,
          user_id: user.id,
          user_email: user.email,
          user_name: profile?.full_name || user.email
        });

      if (error) {
        if (error.code === '23505') {
          alert("You are already registered for this event!");
        } else {
          throw error;
        }
      } else {
        setUserRegistrations(prev => [...prev, eventId]);
        alert("Registration Successful!");
      }
    } catch (err: any) {
      alert(err.message || "Failed to register.");
    } finally {
      setRegisteringId(null);
    }
  };

  const filteredEvents = data.events.filter(e => e.type === filter);

  return (
    <div className="py-20 min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <SectionTitle title={t('Events')} subtitle="Don't miss out on our upcoming hackathons, contests, and workshops." />

        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <button
              onClick={() => setFilter('Upcoming')}
              className={`px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                filter === 'Upcoming' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('Past')}
              className={`px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                filter === 'Past' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => {
            const isRegistered = userRegistrations.includes(event.id);
            const isPast = event.type === 'Past';

            return (
              <div key={event.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all group flex flex-col">
                <div className="relative overflow-hidden aspect-[16/10] bg-slate-200">
                  <img 
                    src={event.image || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop'} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 right-6">
                    <span className="px-5 py-2 bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm border border-blue-50">
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center text-blue-600 text-[11px] font-black uppercase tracking-widest mb-4">
                    <Calendar size={14} className="mr-2" />
                    {event.date}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 line-clamp-2 font-medium">
                    {event.description}
                  </p>
                  <div className="mt-auto space-y-6">
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <MapPin size={14} className="mr-2 text-blue-500" />
                      {event.location}
                    </div>

                    {isPast ? (
                      <button className="w-full py-4 bg-slate-50 text-slate-400 font-black text-xs uppercase tracking-widest rounded-2xl cursor-default">
                        Event Concluded
                      </button>
                    ) : isRegistered ? (
                      <button className="w-full py-4 bg-emerald-50 text-emerald-600 font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center space-x-2 border border-emerald-100">
                        <CheckCircle size={16} />
                        <span>Already Registered</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleRegister(event.id)}
                        disabled={registeringId === event.id}
                        className="w-full py-4 bg-logo-gradient text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-blue-500/20"
                      >
                        {registeringId === event.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <>
                            <span>{t('Register Now')}</span>
                            <ExternalLink size={14} className="ml-2" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200">
            <Calendar className="mx-auto text-slate-200 mb-4" size={64} />
            <p className="text-slate-400 font-black text-sm uppercase tracking-widest">No events found</p>
          </div>
        )}
      </div>

      {/* Modern Login Prompt Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[40px] max-w-md w-full p-10 lg:p-12 shadow-2xl animate-scale-in relative border border-slate-100">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-8 right-8 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                <ShieldAlert size={40} />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Authentication Required</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-10">
                To register for events and participate in our activities, you need to be a verified member of our community. Please sign in to continue.
              </p>

              <div className="space-y-4">
                <button 
                  onClick={() => navigate('/auth?view=login')}
                  className="w-full py-5 bg-logo-gradient text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center"
                >
                  <UserPlus size={18} className="mr-3" />
                  Sign In / Register
                </button>
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="w-full py-5 bg-slate-50 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-100 transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;