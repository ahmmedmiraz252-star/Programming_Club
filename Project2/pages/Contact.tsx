
import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import BackButton from '../components/BackButton';
import { useAdminData } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const { data } = useAdminData();
  const { clubInfo } = data;
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="py-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <SectionTitle title={t('contactTitle')} subtitle={t('contactSubtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
              <div>
                <h3 className="text-xl font-bold text-blue-950 mb-6 flex items-center">
                  <MessageSquare className="mr-2 text-blue-600" /> Contact Info
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-1">Our Location</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{clubInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-1">Email Us</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{clubInfo.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-4">Follow Our Progress</p>
                <div className="flex space-x-3">
                  {Object.entries(clubInfo.socials).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all capitalize">
                      {key}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl">
              <h4 className="text-xl font-bold mb-4">Become a Member?</h4>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Students of all levels are welcome. Whether you're a Hello World enthusiast or a Competitive Pro, there's a place for you.
              </p>
              <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all">
                Submit Membership Form
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
