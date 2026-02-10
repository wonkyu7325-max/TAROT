import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  glow?: boolean;
}

// 圣杯 (Cups) - Water, Emotions, Love
export const CupIcon: React.FC<IconProps> = ({ className = '', size = 24, glow = false }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} ${glow ? 'drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' : ''}`}
  >
    <path d="M17 3H7c-1.1 0-2 .9-2 2v5.5a7 7 0 0 0 14 0V5c0-1.1-.9-2-2-2Z" />
    <path d="M12 10.5v8" />
    <path d="M7 21h10" />
    <path d="M5 8c-2 0-3 1-3 3s1 3 3 3" opacity="0.5" />
    <path d="M19 8c2 0 3 1 3 3s-1 3-3 3" opacity="0.5" />
  </svg>
);

// 权杖 (Wands) - Fire, Passion, Career, Action
export const WandIcon: React.FC<IconProps> = ({ className = '', size = 24, glow = false }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} ${glow ? 'drop-shadow-[0_0_8px_rgba(234,88,12,0.6)]' : ''}`}
  >
    <path d="m19.5 4.5-15 15" />
    <path d="m16 4 4 4" />
    <path d="m4 16 4 4" />
    {/* Leaves */}
    <path d="M14 9c0-2 1-3 2-3" />
    <path d="M10 13c-2 0-3 1-3 2" />
    <path d="M7 16c0-2-1-3-2-3" />
    <path d="M17 6c-2 0-3-1-3-2" />
  </svg>
);

// 宝剑 (Swords) - Air, Intellect, Decisions, Conflict
export const SwordIcon: React.FC<IconProps> = ({ className = '', size = 24, glow = false }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} ${glow ? 'drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]' : ''}`}
  >
    <path d="M12 2v15" />
    <path d="M8 17h8" />
    <path d="M12 17v5" />
    <path d="m9 5 3-3 3 3" />
    <path d="M12 2 9.5 14h5L12 2Z" opacity="0.3" />
  </svg>
);

// 星币 (Pentacles) - Earth, Material, Wealth, Stability
export const PentacleIcon: React.FC<IconProps> = ({ className = '', size = 24, glow = false }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} ${glow ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : ''}`}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="m12 7 1.6 4.3 4.4.4-3.4 3 .9 4.3-3.5-2.2-3.5 2.2.9-4.3-3.4-3 4.4-.4Z" />
    <circle cx="12" cy="12" r="3" opacity="0.3" />
  </svg>
);

export const MysticStar: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className={className}
  >
    <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// Decorative Corner
export const CornerDecoration: React.FC<{ className?: string, rotate?: number }> = ({ className = '', rotate = 0 }) => (
    <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
        className={className}
        style={{ transform: `rotate(${rotate}deg)` }}
    >
        <path d="M2 38 V 10 Q 2 2 10 2 H 38" opacity="0.5" />
        <path d="M8 38 V 14 Q 8 8 14 8 H 38" opacity="0.3" />
        <circle cx="2" cy="2" r="2" fill="currentColor" />
    </svg>
);