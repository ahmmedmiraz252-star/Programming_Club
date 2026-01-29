
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CLUB_INFO, ACTIVITIES, MEMBERS, EVENTS, ACHIEVEMENTS, RESOURCES, GALLERY_IMAGES } from '../data';
import { Member, Event, Achievement, Resource, Activity } from '../types';
import { supabase } from '../lib/supabase';

interface UserCourse {
  id: string;
  title: string;
  progress: number;
  lastLesson: string;
  instructor: string;
  nextClass: string;
  isBanned?: boolean;
}

interface UserDashboardData {
  courses: UserCourse[];
  stats: {
    completedLessons: number;
    attendanceRate: string;
  };
  isAccountRestricted?: boolean;
}

interface ClubData {
  clubInfo: typeof CLUB_INFO;
  activities: Activity[];
  members: Member[];
  events: Event[];
  achievements: Achievement[];
  resources: Resource[];
  galleryImages: string[];
  userStorage: Record<string, UserDashboardData>;
  adminPassword?: string;
  secretPassword?: string;
}

interface AdminContextType {
  data: ClubData;
  isLoading: boolean;
  persistToSupabase: (newData: ClubData) => Promise<boolean>;
  resetToDefault: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const DEFAULT_DATA: ClubData = {
  clubInfo: CLUB_INFO,
  activities: ACTIVITIES,
  members: MEMBERS,
  events: EVENTS,
  achievements: ACHIEVEMENTS,
  resources: RESOURCES,
  galleryImages: GALLERY_IMAGES,
  userStorage: {},
  adminPassword: 'Hello_World@7',
  secretPassword: 'Miraz07',
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ClubData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // Load Data from Supabase on start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: dbData, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'main_config')
          .maybeSingle();

        if (error) {
          console.error('Supabase fetch error:', error);
          loadFromLocal();
        } else if (dbData && dbData.value && Object.keys(dbData.value).length > 0) {
          // Merge DB data with defaults to ensure no missing keys
          setData({ ...DEFAULT_DATA, ...(dbData.value as ClubData) });
        } else {
          loadFromLocal();
        }
      } catch (err) {
        loadFromLocal();
      } finally {
        setIsLoading(false);
      }
    };

    const loadFromLocal = () => {
      const saved = localStorage.getItem('pc_club_data');
      if (saved) {
        try {
          setData({ ...DEFAULT_DATA, ...JSON.parse(saved) });
        } catch (e) {
          setData(DEFAULT_DATA);
        }
      } else {
        setData(DEFAULT_DATA);
      }
    };

    fetchData();
  }, []);

  const persistToSupabase = async (newData: ClubData) => {
    try {
      // Push EVERYTHING to Supabase site_settings table
      const { error } = await supabase
        .from('site_settings')
        .upsert({ 
          key: 'main_config', 
          value: newData,
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

      if (error) throw error;
      
      // Update local state and cache
      setData(newData);
      localStorage.setItem('pc_club_data', JSON.stringify(newData));
      return true;
    } catch (err: any) {
      console.error('CRITICAL: Save to Supabase failed:', err);
      // Fallback to local storage if DB is down
      localStorage.setItem('pc_club_data', JSON.stringify(newData));
      setData(newData);
      return false;
    }
  };

  const resetToDefault = () => {
    if (confirm('Are you sure? This will revert all site content to default values.')) {
      persistToSupabase(DEFAULT_DATA);
      localStorage.removeItem('pc_club_data');
    }
  };

  return (
    <AdminContext.Provider value={{ 
      data, 
      isLoading,
      persistToSupabase,
      resetToDefault
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdminData must be used within AdminProvider');
  return context;
};
