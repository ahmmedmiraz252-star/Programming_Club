
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00B4FF" />
          <stop offset="100%" stopColor="#0047FF" />
        </linearGradient>
      </defs>
      
      {/* Outer Shield Shape */}
      <path 
        d="M256 32C180 32 100 64 64 128C64 240 64 360 256 480C448 360 448 240 448 128C412 64 332 32 256 32Z" 
        fill="url(#shieldGradient)" 
      />
      
      {/* Inner White Shield */}
      <path 
        d="M256 50C190 50 115 80 84 135C84 235 84 345 256 455C428 345 428 235 428 135C397 80 322 50 256 50Z" 
        fill="white" 
      />

      {/* Dashed Inner Border Styling */}
      <path 
        d="M256 65C200 65 135 92 108 142C108 225 108 325 256 430C404 325 404 225 404 142C377 92 312 65 256 65Z" 
        stroke="url(#shieldGradient)" 
        strokeWidth="4" 
        strokeDasharray="15 10" 
        fill="none"
      />

      {/* Quadrant Dividers */}
      <line x1="256" y1="120" x2="256" y2="410" stroke="url(#shieldGradient)" strokeWidth="4"/>
      <line x1="120" y1="260" x2="392" y2="260" stroke="url(#shieldGradient)" strokeWidth="4"/>

      {/* Bottom Half Background Fill for 'C' and Laptop */}
      <path 
        d="M256 260H392C392 310 375 365 256 425V260Z" 
        fill="url(#shieldGradient)" 
      />
      <path 
        d="M120 260H256V425C137 365 120 310 120 260Z" 
        fill="url(#shieldGradient)" 
      />

      {/* TOP LEFT: 'P' */}
      <text x="185" y="215" fill="#0047FF" fontSize="90" fontWeight="900" fontFamily="Inter, sans-serif" textAnchor="middle">P</text>
      
      {/* TOP RIGHT: Graduation Cap */}
      <g transform="translate(300, 150) scale(1.8)" stroke="#0047FF" strokeWidth="2" fill="none">
        <path d="M2 8L20 2L38 8L20 14L2 8Z" strokeLinejoin="round"/>
        <path d="M8 11V20C8 20 14 24 20 24C26 24 32 20 32 20V11" strokeLinecap="round"/>
        <path d="M38 8V18" strokeLinecap="round"/>
      </g>

      {/* BOTTOM LEFT: Laptop */}
      <g transform="translate(170, 310) scale(1.6)" stroke="white" strokeWidth="2.5" fill="none">
        <rect x="2" y="4" width="36" height="24" rx="2"/>
        <path d="M2 32H38" strokeLinecap="round"/>
        <path d="M14 16L10 20L14 24" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 16L30 20L26 24" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      {/* BOTTOM RIGHT: 'C' */}
      <text x="325" y="365" fill="white" fontSize="90" fontWeight="900" fontFamily="Inter, sans-serif" textAnchor="middle">C</text>
    </svg>
  );
};

export default Logo;
