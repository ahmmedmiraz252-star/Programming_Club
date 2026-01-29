import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAdminData } from '../context/AdminContext';
import BackButton from '../components/BackButton';
import { supabase } from '../lib/supabase';
import { 
  Calendar, Clock, BookOpen, BarChart3, CheckCircle2, 
  Hash, User, ShieldCheck, Zap, AlertCircle, ShieldX,
  Users, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, profile, isLoading: authLoading } = useAuth();
  const { data } = useAdminData();
  const [isLoading, setIsLoading] = useState(true);
  const [peers, setPeers] = useState<any[]>([]);

  // Default fallback data if admin hasn't configured anything yet
  const defaultCourses = [
    { 
      id: 'd1', 
      title: 'Python for Competitive Programming', 
      progress: 0, 
      lastLesson: 'Not Started', 
      instructor: 'Dr. Sarah Mitchell',
      nextClass: 'TBA'
    }
  ];

  const defaultStats = {
    completedLessons: 0,
    attendanceRate: '0%'
  };

  useEffect(() => {
    if (!authLoading) {
      setIsLoading(false);
      fetchPeers();
      const interval = setInterval(fetchPeers, 10000); // Refresh online status every 10s
      return () => clearInterval(interval);
    }
  }, [authLoading]);

  const fetchPeers = async () => {
    try {
      const { data: p, error } = await supabase
        .from('profiles')
        .select('id, full_name, last_seen')
        .order('last_seen', { ascending: false })
        .limit(6); // Show top 6 active peers
      
      if (p) setPeers(p);
    } catch (err) {
      console.warn("Failed to fetch peers:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Zap className="text-blue-600 animate-pulse mb-4" size={48} />
        <p className="font-black text-xs uppercase tracking-widest text-slate-400">Initializing your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Access Restricted</h2>
          <p className="text-slate-500">Please log in to your account to view your personalized dashboard and progress.</p>
          <Link to="/auth" className="inline-block px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-widest text-xs">Login Now</Link>
        </div>
      </div>
    );
  }

  // Get personalized data from admin context
  const userData = data.userStorage[user.id] || { 
    courses: defaultCourses, 
    stats: defaultStats,
    isAccountRestricted: false 
  };

  if (userData.isAccountRestricted) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[40px] p-12 text-center shadow-2xl border border-rose-100">
          <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
            <ShieldX size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Account Suspended</h2>
          <p className="text-slate-500 leading-relaxed mb-8">Your dashboard access has been restricted by the club administration. Please contact the Technical Lead or President for more information.</p>
          <button onClick={() => window.location.href='/contact'} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">Support Desk</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 animate-fade-in-down">
          <BackButton />
        </div>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              Welcome back, <span className="text-blue-600">{profile?.full_name?.split(' ')[0] || 'Member'}!</span>
            </h1>
            <p className="text-slate-500 mt-2 font-semibold">Your learning journey is on track. Keep coding!</p>
          </div>
          
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center space-x-6 animate-scale-in">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl">
                {profile?.full_name?.charAt(0) || 'M'}
             </div>
             <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Club Member Profile</p>
                <h4 className="font-black text-slate-900">{profile?.full_name || user.email}</h4>
                <div className="flex items-center space-x-3 mt-1">
                   <span className="flex items-center text-[10px] font-black text-blue-500 uppercase">
                      <Hash size={10} className="mr-0.5" /> Roll: {profile?.roll || 'N/A'}
                   </span>
                   <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                   <span className="text-[10px] font-black text-slate-400 uppercase">General Member</span>
                </div>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Courses', value: userData.courses.length, icon: <BookOpen className="text-blue-600" />, bg: 'bg-blue-50' },
            { label: 'Completed Lessons', value: userData.stats.completedLessons, icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50' },
            { label: 'Upcoming Events', value: 0, icon: <Calendar className="text-purple-500" />, bg: 'bg-purple-50' },
            { label: 'Attendance Rate', value: userData.stats.attendanceRate, icon: <BarChart3 className="text-orange-500" />, bg: 'bg-orange-50' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg transition-all animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up delay-200">
            {/* Learning Paths */}
            <div className="bg-white rounded-[40px] p-8 lg:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Active Learning Paths</h3>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Ongoing</span>
              </div>
              
              <div className="space-y-8">
                {userData.courses.map((course: any) => (
                  <div key={course.id} className="group p-6 bg-slate-50 hover:bg-white border border-transparent hover:border-blue-100 rounded-[32px] transition-all cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{course.title}</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                          <User size={12} className="mr-1.5" /> Instructor: {course.instructor || 'TBA'}
                        </p>
                      </div>
                      <div className="text-right">
                         <span className="text-xl font-black text-blue-600">{course.progress}%</span>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Course Progress</p>
                      </div>
                    </div>
                    
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-6">
                      <div 
                        className="h-full bg-logo-gradient transition-all duration-1000 ease-out" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/50">
                       <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-blue-600">
                             <CheckCircle2 size={16} />
                          </div>
                          <div className="text-left">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Lesson</p>
                             <p className="text-xs font-bold text-slate-700">{course.lastLesson}</p>
                          </div>
                       </div>
                       <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                             <Clock size={16} />
                          </div>
                          <div className="text-left">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Next Class</p>
                             <p className="text-xs font-bold text-slate-700">{course.nextClass}</p>
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
                {userData.courses.length === 0 && (
                   <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[32px]">
                      <AlertCircle className="mx-auto text-slate-200 mb-4" size={48} />
                      <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No active courses found.</p>
                   </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8 animate-fade-in-up delay-400">
            {/* Compact Community Peers Widget */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center">
                  <Users size={16} className="mr-2 text-blue-600" /> Community Peers
                </h3>
                <Link to="/members" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center">
                  All <ArrowRight size={10} className="ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {peers.map((peer) => {
                  const lastSeen = peer.last_seen ? new Date(peer.last_seen).getTime() : 0;
                  const isOnline = (Date.now() - lastSeen) < 45000;
                  
                  return (
                    <div key={peer.id} className="flex flex-col items-center p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-black text-sm border border-blue-100">
                          {peer.full_name?.charAt(0) || 'U'}
                        </div>
                        {isOnline && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
                        )}
                      </div>
                      <p className="text-[10px] font-bold text-slate-900 mt-2 text-center line-clamp-1">{peer.full_name || 'Anonymous'}</p>
                      <p className={`text-[8px] font-black uppercase tracking-tighter ${isOnline ? 'text-emerald-500' : 'text-slate-300'}`}>
                        {isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  );
                })}
                {peers.length === 0 && (
                  <div className="col-span-2 py-6 text-center text-slate-300 text-[10px] font-bold uppercase">Searching for peers...</div>
                )}
              </div>
            </div>

            {/* Upcoming Schedule Card */}
            <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Calendar size={120} />
               </div>
               <div className="relative z-10">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-8">Weekly Schedule</h3>
                  <div className="space-y-6">
                    {userData.courses.filter((c:any) => c.nextClass !== 'TBA').map((course: any) => (
                      <div key={course.id} className="flex items-start space-x-4">
                        <div className="w-1.5 h-12 bg-blue-500 rounded-full shrink-0"></div>
                        <div>
                          <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">{course.nextClass}</p>
                          <h5 className="font-black text-sm text-slate-100 leading-tight mt-1">{course.title}</h5>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Room 302 • Lab Hall</p>
                        </div>
                      </div>
                    ))}
                    {userData.courses.filter((c:any) => c.nextClass !== 'TBA').length === 0 && (
                      <p className="text-slate-500 text-xs font-bold italic">No classes scheduled for this week.</p>
                    )}
                  </div>
                  <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all">
                    Full Calendar
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;