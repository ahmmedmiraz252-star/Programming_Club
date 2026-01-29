
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'Home': 'Home',
    'Member': 'Member',
    'Members': 'Members',
    'Activities': 'Activities',
    'Event': 'Event',
    'Events': 'Events',
    'Achievement': 'Achievement',
    'Achievements': 'Achievements',
    'Resources': 'Resources',
    'Gallery': 'Gallery',
    'Contact': 'Contact',
    'About': 'About',
    'Admin Portal': 'Admin Portal',
    'Join': 'Join',
    'Join Club': 'Join Club',
    
    // UI Static
    'officialClub': 'OFFICIAL INSTITUTE PROGRAMMING CLUB',
    'featureSubtitle': 'We provide a structured ecosystem for developers to grow, collaborate, and compete.',
    'communityTitle': 'Our Community',
    'communitySubtitle': 'Meet the passionate individuals who make the Programming Club happen.',
    'activitiesSubtitle': 'A comprehensive roadmap for your journey from a student to a proficient engineer.',
    'contactTitle': 'Get in Touch',
    'contactSubtitle': 'Have questions or want to collaborate? We\'d love to hear from you.',
    'Start Coding': 'Start Coding',
    'View Events': 'View Events',
    'Register Now': 'Register Now',
    'View Details': 'View Details',
    'Previous': 'Previous',
    'Section': 'Section',
    'Navigation': 'Navigation',
    'Discovery': 'Discovery',
    'Switch to': 'Switch to'
  },
  bn: {
    // Navigation
    'Home': 'হোম',
    'Member': 'সদস্য',
    'Members': 'সদস্যবৃন্দ',
    'Activities': 'কার্যক্রম',
    'Event': 'ইভেন্ট',
    'Events': 'ইভেন্টসমূহ',
    'Achievement': 'সাফল্য',
    'Achievements': 'সাফল্যসমূহ',
    'Resources': 'রিসোর্স',
    'Gallery': 'গ্যালারি',
    'Contact': 'যোগাযোগ',
    'About': 'সম্পর্কে',
    'Admin Portal': 'এডমিন পোর্টাল',
    'Join': 'যোগ দিন',
    'Join Club': 'ক্লাবে যোগ দিন',

    // UI Static (Instructions/Labels translated)
    'officialClub': 'অফিসিয়াল ইনস্টিটিউট প্রোগ্রামিং ক্লাব',
    'featureSubtitle': 'ডেভেলপারদের বৃদ্ধি এবং প্রতিযোগিতার জন্য একটি কাঠামোবদ্ধ ইকোসিস্টেম।',
    'communityTitle': 'আমাদের কমিউনিটি',
    'communitySubtitle': 'প্রোগ্রামিং ক্লাবকে সচল রাখা নিবেদিতপ্রাণ ব্যক্তিদের সাথে পরিচিত হোন।',
    'activitiesSubtitle': 'একজন ছাত্র থেকে দক্ষ ইঞ্জিনিয়ার হিসেবে আপনার যাত্রার একটি পূর্ণাঙ্গ রূপরেখা।',
    'contactTitle': 'যোগাযোগ করুন',
    'contactSubtitle': 'আপনার কি কোনো প্রশ্ন আছে? আমরা আপনার কথা শুনতে আগ্রহী।',
    'Start Coding': 'কোডিং শুরু করুন',
    'View Events': 'ইভেন্ট দেখুন',
    'Register Now': 'নিবন্ধন করুন',
    'View Details': 'বিস্তারিত দেখুন',
    'Previous': 'পূর্ববর্তী',
    'Section': 'বিভাগ',
    'Navigation': 'মেনু',
    'Discovery': 'অন্বেষণ',
    'Switch to': 'ভাষা পরিবর্তন',

    // Descriptions (Translating the text under technical titles/slogans)
    'Join a community of thousands, from beginners to ICPC finalists. We empower students to become world-class developers through collaborative learning and competitive rigor.': 'হাজার হাজার শিক্ষার্থীর কমিউনিটিতে যোগ দিন। আমরা শিক্ষার্থীদের বিশ্বমানের ডেভেলপার হিসেবে গড়ে তুলি।',
    'Weekly contests on platforms like Codeforces and VJudge, ranging from beginner Div. 3 to advanced ICPC-style rounds.': 'কোডফোর্সেস এবং ভিজাজের মতো প্ল্যাটফর্মে সাপ্তাহিক প্রতিযোগিতা, যা একদম নতুনদের থেকে শুরু করে আইসিপিসি লেভেল পর্যন্ত বিস্তৃত।',
    'Hands-on sessions on Full-stack development, DevOps, and Open Source contribution led by experienced seniors.': 'অভিজ্ঞ সিনিয়রদের তত্ত্বাবধানে ফুল-স্ট্যাক ডেভেলপমেন্ট, ডেভঅপস এবং ওপেন সোর্স কন্ট্রিবিউশনের ব্যবহারিক সেশন।',
    'Intensive weekend marathons for freshmen to master C++ and Python fundamentals in a collaborative environment.': 'নতুনদের জন্য সি++ এবং পাইথনের মৌলিক বিষয়গুলোতে দক্ষ হতে নিবিড় সাপ্তাহিক ম্যারাথন সেশন।',
    'In-depth problem-solving sessions focusing on advanced data structures, dynamic programming, and graph theory.': 'অ্যাডভান্সড ডাটা স্ট্রাকচার, ডাইনামিক প্রোগ্রামিং এবং গ্রাফ থিওরির ওপর গভীর সমস্যা সমাধানমূলক সেশন।'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    // Protected words that stay in English regardless of language
    const protectedWords = [
      'Think. \nCode. \nTriumph.',
      'Beyond Just Syntax',
      'Competitive Programming',
      'Dev Workshops',
      'Coding Bootcamps',
      'Algorithm Design',
      'Where Logic Meets Creativity.'
    ];

    if (protectedWords.includes(key)) return key;

    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
