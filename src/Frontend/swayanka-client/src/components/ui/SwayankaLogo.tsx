import React from 'react';

export const SwayankaLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 330 60" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M35,48 C35,48 10,42 10,20 C10,5 35,5 45,20 C55,35 75,35 75,20 C75,5 55,5 55,25 C55,48 35,55 35,48 Z" fill="url(#logo-gradient)" />
    <text x="85" y="42" fontFamily="sans-serif" fontWeight="900" fontSize="38" letterSpacing="0.02em" fill="#111827">SWAYANKA</text>
  </svg>
);
