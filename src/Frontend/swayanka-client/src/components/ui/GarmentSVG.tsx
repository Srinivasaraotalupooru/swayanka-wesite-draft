import React from 'react';

interface GarmentSVGProps {
  type: string;
  color: string;
  className?: string;
}

export const GarmentSVG: React.FC<GarmentSVGProps> = ({ type, color, className }) => {
  const shadingColor = "rgba(0,0,0,0.1)"; 


  if (type === 't-shirt') {
    return (
      <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow-t" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15"/>
          </filter>
        </defs>
        <g filter="url(#shadow-t)">
          <path d="M60,40 C60,40 50,70 30,65 L20,95 L55,105 L55,190 L145,190 L145,105 L180,95 L170,65 C150,70 140,40 140,40 Q100,55 60,40 Z" fill={color} />
          <path d="M20,95 L55,105 L55,100 L30,65 Z" fill={shadingColor} />
          <path d="M180,95 L145,105 L145,100 L170,65 Z" fill={shadingColor} />
          <path d="M60,40 Q100,55 140,40 Q100,65 60,40" fill={shadingColor} opacity="0.5" />
          <path d="M70,100 Q100,120 130,100" fill="none" stroke={shadingColor} strokeWidth="2" opacity="0.3" />
        </g>
      </svg>
    );
  }
  
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <circle cx="100" cy="100" r="80" fill={color} />
      <text x="100" y="105" textAnchor="middle" fill={color === '#ffffff' ? 'black' : 'white'} fontSize="20">{type}</text>
    </svg>
  );
};
