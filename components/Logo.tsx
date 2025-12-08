import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-14 w-auto" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 120 140"
        className="h-full w-auto drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="shieldBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:'#002855', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#001830', stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="shieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#C5A059', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#9E7D3E', stopOpacity:1}} />
          </linearGradient>
        </defs>

        {/* Shield Outline & Base */}
        <path d="M60 135 C20 115 5 80 5 40 L5 10 L60 2 L115 10 L115 40 C115 80 100 115 60 135 Z" fill="#002855" stroke="#C5A059" strokeWidth="3" />
        
        {/* Quadrant Divider */}
        <path d="M60 2 L60 130" stroke="#C5A059" strokeWidth="2" />
        <path d="M5 45 L115 45" stroke="#C5A059" strokeWidth="2" />

        {/* Top Left: Open Book (Knowledge) */}
        <g transform="translate(18, 15) scale(0.6)">
             <path d="M5 25 Q25 35 45 25 L45 5 Q25 15 5 5 Z" fill="white" />
             <path d="M45 25 Q65 35 85 25 L85 5 Q65 15 45 5 Z" fill="#E5E7EB" />
        </g>

        {/* Top Right: Snowflake (IceAlan Identity) */}
        <g transform="translate(75, 12) scale(0.5)" stroke="white" strokeWidth="4" strokeLinecap="round">
            <line x1="15" y1="5" x2="15" y2="45" />
            <line x1="0" y1="25" x2="30" y2="25" />
            <line x1="4" y1="10" x2="26" y2="40" />
            <line x1="4" y1="40" x2="26" y2="10" />
        </g>

        {/* Bottom Left: Lion Rampant (British Heritage - Simplified) */}
        <path d="M25 60 L35 60 L35 90 L20 100 L30 75 Z" fill="#C5A059" transform="translate(5,5)" opacity="0.8" />
        <text x="32" y="95" fontFamily="serif" fontSize="30" fill="#C5A059" fontWeight="bold">L</text>

        {/* Bottom Right: Torch (Enlightenment) */}
        <g transform="translate(75, 65) scale(0.7)">
            <path d="M15 40 L25 40 L22 10 L18 10 Z" fill="#8B4513" />
            <circle cx="20" cy="8" r="6" fill="#B91C1C" />
            <circle cx="20" cy="8" r="3" fill="#FCD34D" />
        </g>

        {/* Banner */}
        <path d="M10 115 Q60 140 110 115 L110 125 Q60 150 10 125 Z" fill="#C5A059" />
        <text x="60" y="127" fontFamily="serif" fontSize="8" fill="#002855" fontWeight="bold" textAnchor="middle" letterSpacing="1">EST. 2024</text>

      </svg>
      
      <div className="flex flex-col justify-center">
        <span className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wider text-ice-blue leading-none drop-shadow-md">
          IceAlan
        </span>
        <div className="flex items-center gap-2 mt-1">
            <div className="h-[1px] w-6 bg-ice-gold"></div>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.25em] text-gray-500 uppercase font-semibold">
            High School
            </span>
            <div className="h-[1px] w-6 bg-ice-gold"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;