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
          {/* Card Back */}
          <div className="absolute inset-0 backface-hidden rounded-lg border-2 border-purple-800 bg-indigo-950 overflow-hidden shadow-lg shadow-purple-900/50">
             <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
             {/* Simple Geometric Back Pattern */}
             <div className="absolute inset-2 border border-purple-500/30 rounded-sm"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center">
                    <div className="w-8 h-8 rotate-45 border border-purple-400/50"></div>
                </div>
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