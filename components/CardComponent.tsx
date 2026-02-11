
import React from 'react';
import { TarotCard } from '../types';
import { getCardImageUrl } from '../constants';

interface CardComponentProps {
  card?: TarotCard;
  isFlipped: boolean;
  isReversed?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string; // e.g., "Position 1"
}

export const CardComponent: React.FC<CardComponentProps> = ({ 
  card, 
  isFlipped, 
  isReversed = false, 
  onClick, 
  className = '',
  size = 'md',
  label
}) => {
  
  const sizeClasses = {
    sm: 'w-16 h-28 text-[0.5rem]',
    md: 'w-32 h-56 text-xs',
    lg: 'w-48 h-80 text-sm',
  };

  const currentSize = sizeClasses[size];
  const imageUrl = card ? getCardImageUrl(card) : '';

  return (
    <div className={`relative flex flex-col items-center gap-2 ${className}`}>
      {label && <span className="text-purple-300 font-serif text-xs uppercase tracking-widest">{label}</span>}
      <div 
        className={`relative group perspective-1000 cursor-pointer transition-transform duration-500 ${isReversed && isFlipped ? 'rotate-180' : ''}`}
        onClick={onClick}
      >
        <div 
          className={`relative preserve-3d transition-all duration-700 ease-in-out ${currentSize} ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        >
          {/* Card Back - Mystical Mandala Design */}
          <div className="absolute inset-0 backface-hidden rounded-lg border border-purple-900/50 bg-[#1a0b2e] overflow-hidden shadow-2xl shadow-purple-900/40 group-hover:shadow-purple-500/20 transition-shadow duration-500">
             {/* Deep Gradient Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-[#2d1b4e] to-indigo-950"></div>
             
             {/* Stardust Texture Layer */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>

             {/* Inner Decorative Frames */}
             <div className="absolute inset-1.5 border border-amber-500/20 rounded-sm opacity-50"></div>
             <div className="absolute inset-3 border border-purple-500/10 rounded-sm"></div>
             
             {/* Corner Flourishes */}
             <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-amber-500/40 rounded-tl"></div>
             <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-amber-500/40 rounded-tr"></div>
             <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-amber-500/40 rounded-bl"></div>
             <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-amber-500/40 rounded-br"></div>

             {/* Central Mystic Mandala Pattern */}
             <div className="absolute inset-0 flex items-center justify-center opacity-60">
                <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] animate-pulse-slow" style={{ animationDuration: '4s' }}>
                    {/* Concentric Circles */}
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-purple-400" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-amber-600" strokeDasharray="1 2" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-500" />

                    {/* 8-Pointed Star Geometry */}
                    <g transform="translate(50,50)">
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                            <line 
                                key={i} 
                                x1="0" y1="-10" x2="0" y2="-40" 
                                stroke="currentColor" 
                                strokeWidth="0.5" 
                                className={i % 2 === 0 ? "text-amber-400" : "text-purple-400"}
                                transform={`rotate(${deg})`} 
                            />
                        ))}
                        {/* Central Diamond */}
                        <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-200" />
                        {/* Core Eye */}
                        <circle r="3" fill="currentColor" className="text-amber-100" />
                    </g>
                </svg>
             </div>
             
             {/* Subtle Glow at Center */}
             <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 to-transparent opacity-50"></div>
          </div>

          {/* Card Front */}
          <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-lg border border-amber-900/30 bg-slate-100 overflow-hidden shadow-xl">
            {card && (
              <>
                <img 
                  src={imageUrl} 
                  alt={card.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay only for text readability if needed, but RWS cards have white borders usually */}
                {/* We add a subtle inner shadow to make it look like a physical card */}
                <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] pointer-events-none rounded-lg"></div>
                
                {/* Decoration Border */}
                <div className="absolute inset-0.5 border border-amber-900/10 rounded-lg pointer-events-none"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
