import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import BackButton from '../components/BackButton';
import { useAdminData } from '../context/AdminContext';
import { supabase } from '../lib/supabase';
import { ImageIcon, Loader2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const { data } = useAdminData();
  const { clubInfo } = data;
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data: galleryData, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setImages(galleryData || []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <SectionTitle title={`Moments at ${clubInfo.name}`} subtitle="Capturing the joy of coding, competition, and community." />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="text-blue-600 animate-spin mb-4" size={40} />
            <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Loading Memories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {images.map((img, index) => (
              <div key={img.id} className="relative aspect-square overflow-hidden rounded-[32px] group shadow-sm hover:shadow-2xl transition-all border border-slate-100">
                <img 
                  src={img.url} 
                  alt={`Gallery ${index}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                   <div>
                      <span className="text-white font-black text-lg uppercase tracking-tight block">Event Highlight</span>
                      <span className="text-blue-300 text-[10px] font-black uppercase tracking-widest">Digital Archive #{index + 1}</span>
                   </div>
                </div>
              </div>
            ))}

            {images.length === 0 && (
              <div className="col-span-full text-center py-32 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
                <ImageIcon className="mx-auto text-slate-200 mb-4" size={64} />
                <p className="text-slate-400 font-black text-sm uppercase tracking-widest">The gallery is currently empty</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;