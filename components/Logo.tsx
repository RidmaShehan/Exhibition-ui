'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  src?: string; // Path to your custom logo image
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = 'w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36',
  src,
  alt = 'Times School Higher Education Logo'
}) => {
  // If custom image is provided, use it
  if (src) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
        />
      </div>
    );
  }

  // Fallback to original SVG logo
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className={className}>
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1F2937', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#374151', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M 70 15 L 115 35 L 115 75 Q 115 100, 70 125 Q 25 100, 25 75 L 25 35 Z"
        fill="url(#shieldGradient)"
        stroke="#000000"
        strokeWidth="2.5"
      />
      <rect x="52" y="50" width="36" height="42" fill="white" rx="3" />
      <line x1="70" y1="50" x2="70" y2="92" stroke="#1F2937" strokeWidth="2.5" />
      <line x1="52" y1="60" x2="68" y2="60" stroke="#1F2937" strokeWidth="2" opacity="0.7" />
      <line x1="72" y1="60" x2="88" y2="60" stroke="#1F2937" strokeWidth="2" opacity="0.7" />
      <line x1="52" y1="68" x2="68" y2="68" stroke="#1F2937" strokeWidth="2" opacity="0.7" />
      <line x1="72" y1="68" x2="88" y2="68" stroke="#1F2937" strokeWidth="2" opacity="0.7" />
      <line x1="52" y1="76" x2="68" y2="76" stroke="#1F2937" strokeWidth="2" opacity="0.7" />
      <line x1="72" y1="76" x2="88" y2="76" stroke="#1F2937" strokeWidth="2" opacity="0.7" />
      <path
        d="M 35 42 L 70 30 L 105 42 L 70 54 Z"
        fill="#FCD34D"
        stroke="#000000"
        strokeWidth="2"
      />
      <rect x="68" y="54" width="4" height="18" fill="#000000" />
      <circle cx="70" cy="74" r="4" fill="#FCD34D" stroke="#000000" strokeWidth="1.5" />
    </svg>
  );
};

export default Logo;
