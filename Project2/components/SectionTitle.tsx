
import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle: React.FC<Props> = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">{title}</h2>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
      <div className={`w-20 h-1.5 bg-blue-600 mt-6 ${centered ? 'mx-auto' : 'ml-0'} rounded-full`}></div>
    </div>
  );
};

export default SectionTitle;
