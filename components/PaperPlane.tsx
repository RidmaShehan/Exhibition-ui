import React, { forwardRef } from 'react';

interface PaperPlaneProps {
  className?: string;
}

const PaperPlane = forwardRef<HTMLDivElement, PaperPlaneProps>(
  ({ className = 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24' }, ref) => {
    return (
      <div ref={ref} className="fixed left-1/2 bottom-20 z-50 pointer-events-none opacity-0 hidden">
        <svg width="120" height="120" viewBox="0 0 120 120" className={className}>
          <defs>
            <filter id="shadow">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>
          <path
            d="M 25 90 Q 35 70, 45 60 Q 50 55, 55 50"
            fill="none"
            stroke="#FCD34D"
            strokeWidth="2.5"
            strokeDasharray="6,6"
            opacity="0.8"
            className="trail"
          />
          <g className="plane" transform="translate(55, 40)" filter="url(#shadow)">
            <path d="M 0 0 L 35 -18 L 35 18 Z" fill="white" stroke="#000000" strokeWidth="3" />
            <path d="M 35 -18 L 12 0 L 35 18" fill="none" stroke="#000000" strokeWidth="3" />
            <path d="M 12 0 L 35 0" stroke="#000000" strokeWidth="2.5" />
            <line x1="17" y1="-8" x2="17" y2="8" stroke="#000000" strokeWidth="2" />
            <line x1="21" y1="-8" x2="21" y2="8" stroke="#000000" strokeWidth="2" />
            <line x1="25" y1="-8" x2="25" y2="8" stroke="#000000" strokeWidth="2" />
            <line x1="29" y1="-8" x2="29" y2="8" stroke="#000000" strokeWidth="2" />
          </g>
        </svg>
      </div>
    );
  }
);

PaperPlane.displayName = 'PaperPlane';

export default PaperPlane;

