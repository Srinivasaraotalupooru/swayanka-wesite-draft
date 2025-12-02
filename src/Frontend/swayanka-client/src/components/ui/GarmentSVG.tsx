import React from 'react';

interface GarmentSVGProps {
  type: string;
  color: string;
  className?: string;
}

export const GarmentSVG: React.FC<GarmentSVGProps> = ({ type, color, className }) => {
  // Dynamic shading: Light shading for dark garments, Dark shading for light garments
  const isDark = color === '#000' || color === '#000000' || color === '#111827';
  const shadingColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";


  if (type === 't-shirt') {
    return (
      <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow-t" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15"/>
          </filter>
        </defs>
        <g filter="url(#shadow-t)">
          {/* Main Body with Stroke for definition */}
          <path d="M65,40 Q100,55 135,40 L165,55 L185,85 L155,95 L155,190 L45,190 L45,95 L15,85 L35,55 Z" fill={color} stroke={isDark ? "none" : "rgba(0,0,0,0.3)"} strokeWidth={isDark ? "0" : "1.5"} />
          
          {/* Neck Shading */}
          <path d="M65,40 Q100,55 135,40 Q100,65 65,40" fill={shadingColor} opacity={isDark ? "0.5" : "0.8"} />
          
          {/* Fold/Crease */}
          <path d="M55,100 Q100,120 145,100" fill="none" stroke={shadingColor} strokeWidth="2" opacity="0.3" />
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
