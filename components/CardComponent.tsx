
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
          <div className="absolute inset-0 backface-hidden rounded-xl border-2 border-indigo-900/80 bg-[#0f0518] overflow-hidden shadow-2xl shadow-purple-900/40 group-hover:shadow-amber-500/20 transition-shadow duration-500">
             {/* Deep Cosmic Background */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2e1065_0%,_#0f0518_120%)]"></div>
             
             {/* Starry Pattern */}
             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px', backgroundPosition: '8px 8px' }}></div>
             
             {/* Intricate Border Layers */}
             <div className="absolute inset-1 border border-amber-500/20 rounded-lg"></div>
             <div className="absolute inset-2 border border-purple-500/20 rounded-md"></div>
             <div className="absolute inset-3 border-[0.5px] border-amber-200/10 rounded-sm"></div>
             
             {/* Corner Ornaments */}
             <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-600/40 rounded-tl-md"></div>
             <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-600/40 rounded-tr-md"></div>
             <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-600/40 rounded-bl-md"></div>
             <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-600/40 rounded-br-md"></div>

             {/* Central Mandala SVG */}
             <div className="absolute inset-0 flex items-center justify-center opacity-90">
                <svg viewBox="0 0 100 100" className="w-[75%] h-[75%] text-amber-500/30 animate-[spin_60s_linear_infinite]">
                    {/* Outer Ring */}
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 1" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" />
                    
                    {/* Geometric Star */}
                    <path d="M50 2 L62 38 L98 50 L62 62 L50 98 L38 62 L2 50 L38 38 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z" fill="currentColor" fillOpacity="0.1" />
                    
                    {/* Rotated Square */}
                    <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.3" transform="rotate(45 50 50)" />
                    
                    {/* Inner Circles */}
                    <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" />
                    <circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.3" />
                    <circle cx="50" cy="50" r="2" fill="#fff" fillOpacity="0.8" />
                </svg>
             </div>
             
             {/* Static Central Glow */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
                 <div className="w-2 h-2 bg-amber-100 rounded-full blur-[1px] animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
             </div>
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
