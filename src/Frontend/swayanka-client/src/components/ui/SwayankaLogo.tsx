import React from 'react';

export const SwayankaLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 330 60" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M35,48 C35,48 10,42 10,20 C10,5 35,5 45,20 C55,35 75,35 75,20 C75,5 55,5 55,25 C55,48 35,55 35,48 Z" fill="#000000" />
    <text x="85" y="42" fontFamily="sans-serif" fontWeight="900" fontSize="38" letterSpacing="0.02em" fill="#000000">SWAYANKA</text>
  </svg>
);
