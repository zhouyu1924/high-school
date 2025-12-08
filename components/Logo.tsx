import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-14 w-auto" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 120"
        className="h-full w-auto text-ice-blue fill-current drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#002855', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#001830', stopOpacity:1}} />
          </linearGradient>
        </defs>

        {/* Shield Body */}
        <path d="M50 115 C20 100 5 75 5 40 L5 10 L50 2 L95 10 L95 40 C95 75 80 100 50 115 Z" fill="url(#shieldGrad)" stroke="#C5A059" strokeWidth="2.5" />
        
        {/* Cross Divider */}
        <path d="M50 2 L50 112" stroke="#C5A059" strokeWidth="1.5" opacity="0.7" />
        <path d="M5 40 L95 40" stroke="#C5A059" strokeWidth="1.5" opacity="0.7" />

        {/* Quadrant 1: Book (Knowledge) */}
        <path d="M15 20 Q27.5 25 40 20 L40 30 Q27.5 35 15 30 Z" fill="white" />
        
        {/* Quadrant 2: Snowflake (IceAlan theme) */}
        <g transform="translate(72, 25) scale(0.6)" stroke="white" strokeWidth="3">
           <line x1="0" y1="-10" x2="0" y2="10" />
           <line x1="-8.6" y1="-5" x2="8.6" y2="5" />
           <line x1="-8.6" y1="5" x2="8.6" y2="-5" />
        </g>

        {/* Quadrant 3: Stylized 'I' */}
        <text x="28" y="85" fontFamily="serif" fontSize="30" fill="white" fontWeight="bold" textAnchor="middle">I</text>

        {/* Quadrant 4: Stylized 'A' */}
        <text x="72" y="85" fontFamily="serif" fontSize="30" fill="white" fontWeight="bold" textAnchor="middle">A</text>
        
        {/* Banner at bottom (optional flair) */}
        {/* <path d="M10 100 Q50 120 90 100" fill="none" stroke="#C5A059" strokeWidth="1" /> */}
      </svg>
      <div className="flex flex-col justify-center">
        <span className="font-serif text-xl md:text-2xl font-bold uppercase tracking-wider text-ice-blue leading-none">
          IceAlan
        </span>
        <div className="flex items-center gap-2 mt-0.5">
            <div className="h-[1px] w-4 bg-ice-gold"></div>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-gray-500 uppercase">
            High School
            </span>
            <div className="h-[1px] w-4 bg-ice-gold"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;