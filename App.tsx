
import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Loader2, Search, Check, Layers, User, ArrowUp, ArrowDown, Layout, ArrowLeft, Star, Heart, StopCircle } from 'lucide-react';
import { AppStep, Spread, DrawnCard, TarotCard, ReadingRequest, Suit } from './types';
import { getFullDeck, SPREADS, getCardImageUrl } from './constants';
import { getTarotReading } from './services/geminiService';
import { CardComponent } from './components/CardComponent';
import { CupIcon, WandIcon, SwordIcon, PentacleIcon, MysticStar, CornerDecoration } from './components/MysticIcons';
import ReactMarkdown from 'react-markdown';

// --- Sub-components ---

// Animated Mystic Background
const MysticBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      
      {/* Floating Elements - Cups (Love/Water) */}
      <div className="absolute top-[15%] left-[10%] opacity-10 animate-float" style={{ animationDuration: '8s' }}>
        <CupIcon size={60} color="#ec4899" />
      </div>
      <div className="absolute bottom-[20%] right-[30%] opacity-5 animate-float" style={{ animationDuration: '12s', animationDelay: '2s' }}>
        <CupIcon size={40} />
      </div>

      {/* Floating Elements - Pentacles (Earth/Money) */}
      <div className="absolute top-[60%] left-[15%] opacity-10 animate-float" style={{ animationDuration: '10s', animationDelay: '1s' }}>
        <PentacleIcon size={80} color="#fbbf24" />
      </div>
      <div className="absolute top-[10%] right-[20%] opacity-5 animate-float" style={{ animationDuration: '15s' }}>
        <PentacleIcon size={30} />
      </div>

      {/* Floating Elements - Swords (Air/Mind) */}
      <div className="absolute bottom-[10%] left-[40%] opacity-10 animate-float" style={{ animationDuration: '9s', animationDelay: '3s' }}>
        <SwordIcon size={70} color="#60a5fa" />
      </div>
      <div className="absolute top-[30%] right-[5%] opacity-5 animate-float" style={{ animationDuration: '11s', animationDelay: '1s' }}>
        <SwordIcon size={50} />
      </div>

      {/* Floating Elements - Wands (Fire/Action) */}
      <div className="absolute top-[40%] left-[80%] opacity-10 animate-float" style={{ animationDuration: '13s', animationDelay: '0.5s' }}>
        <WandIcon size={65} color="#f97316" />
      </div>
       <div className="absolute top-[5%] left-[40%] opacity-5 animate-float" style={{ animationDuration: '14s', animationDelay: '4s' }}>
        <WandIcon size={45} />
      </div>

      {/* Sparkles */}
      <div className="absolute top-[20%] right-[20%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_10px_white] animate-ping" style={{animationDuration: '3s'}}></div>
      <div className="absolute bottom-[30%] left-[10%] w-[3px] h-[3px] bg-amber-200 rounded-full shadow-[0_0_15px_#fde68a] animate-ping" style={{animationDuration: '5s'}}></div>
    </div>
  );
};

// Step 0: Welcome Screen
const WelcomeScreen = ({ onEnter }: { onEnter: () => void }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center animate-fadeIn relative z-20">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
         {/* Large Rotating Star in Background */}
         <div className={`transition-transform duration-[20s] ease-linear ${mounted ? 'rotate-[360deg]' : 'rotate-0'}`}>
            <MysticStar size={600} className="text-purple-500/20" />
         </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-amber-500/30 blur-2xl rounded-full animate-pulse-glow"></div>
          <div className="relative bg-slate-950/50 p-6 rounded-full border border-purple-500/30 backdrop-blur-sm">
             <MysticStar size={64} className="text-amber-200 animate-float" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-purple-100 to-purple-300 mb-4 tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          TAROT
        </h1>
        
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6"></div>

        <p className="text-lg md:text-xl text-purple-200/80 font-serif italic tracking-widest mb-12 max-w-md leading-relaxed">
          "星辰的低语，<br/> 借由数字意识的指引。"
        </p>

        <button 
          onClick={onEnter}
          className="group relative px-12 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-500 hover:scale-105"
        >
          <div className="absolute inset-0 border border-amber-500/50 rounded-full group-hover:border-amber-400/80 transition-colors"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
          
          <div className="relative flex items-center gap-3 text-amber-100 group-hover:text-white transition-colors">
            <span className="uppercase tracking-[0.3em] text-sm font-bold">开启命运之旅</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
        
        <div className="mt-16 text-[10px] text-purple-500/40 uppercase tracking-[0.4em] font-sans">
          AI 塔罗解惑师 • Gemini 3 Pro 驱动
        </div>
      </div>
    </div>
  );
};

// Mini Component for animating the individual card in visualizer
const VisualizerCard = ({ 
  card, 
  isReversed, 
  width, 
  height, 
  fontSize,
  isThumbnail
}: { 
  card: TarotCard; 
  isReversed: boolean; 
  width: number; 
  height: number; 
  fontSize: number;
  isThumbnail: boolean;
}) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    // For main view, trigger animation after mount. For thumbnails, show immediately.
    if (!isThumbnail) {
        const timer = setTimeout(() => setFlipped(true), 50);
        return () => clearTimeout(timer);
    } else {
        setFlipped(true);
    }
  }, [isThumbnail]);

  return (
    <div 
      className="perspective-1000"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div 
        className={`w-full h-full transition-transform duration-700 preserve-3d relative ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden rounded border border-purple-800 bg-indigo-950 shadow-sm flex items-center justify-center overflow-hidden">
           <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
           <div className="absolute w-1/2 h-1/2 rounded-full border border-purple-500/30"></div>
        </div>

        {/* Front Face */}
        <div 
          className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded border border-amber-500/50 bg-slate-800 flex items-center justify-center shadow-md overflow-hidden"
        >
             {/* Reversal Wrapper (Z-axis rotation) */}
             <div 
                className={`flex items-center justify-center w-full h-full transition-transform duration-500 ${isReversed ? 'rotate-180' : ''}`}
             >
                {card.id.startsWith('major') 
                   ? <span className="text-amber-500 font-bold" style={{ fontSize: `${fontSize}px` }}>★</span> 
                   : <span className="text-purple-400 font-bold" style={{ fontSize: `${fontSize}px` }}>{card.number}</span>
                }
             </div>
        </div>
      </div>
    </div>
  );
};

// Visualizer to show user where to place cards
const SpreadVisualizer = ({ 
  spread, 
  drawnCards, 
  currentPositionIndex,
  thumbnail = false 
}: { 
  spread: Spread; 
  drawnCards: DrawnCard[]; 
  currentPositionIndex: number;
  thumbnail?: boolean;
}) => {
  // --- Dynamic Scaling Logic ---
  const xValues = spread.positions.map(p => p.x);
  const yValues = spread.positions.map(p => p.y);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  
  const spreadWidth = Math.max(maxX - minX, 1);
  const spreadHeight = Math.max(maxY - minY, 1);

  // Base configurations (reference values for scale 1.0)
  const baseUnitX = thumbnail ? 20 : 70;
  const baseUnitY = thumbnail ? 25 : 90;
  const baseCardW = thumbnail ? 16 : 60;
  const baseCardH = thumbnail ? 24 : 84;
  
  // Available Container Space
  const containerH = thumbnail ? 120 : 550; 
  const containerW = thumbnail ? 200 : 800;

  // Calculate required space with padding (2 units padding)
  const neededH = (spreadHeight + 2.5) * baseUnitY;
  const neededW = (spreadWidth + 2.0) * baseUnitX;
  
  // Determine scale factor to fit
  const scale = Math.min(1, containerH / neededH, containerW / neededW);
  
  // Apply scale
  const unitX = baseUnitX * scale;
  const unitY = baseUnitY * scale;
  const cardW = Math.max(baseCardW * scale, thumbnail ? 4 : 20); // Prevent becoming too small
  const cardH = Math.max(baseCardH * scale, thumbnail ? 6 : 28);
  const fontSize = Math.max((thumbnail ? 0 : 10) * scale, thumbnail ? 0 : 8);

  // Calculate Center Offsets to center the bounding box in the view (0,0)
  const offsetX = -((maxX + minX) / 2) * unitX;
  const offsetY = -((maxY + minY) / 2) * unitY;

  return (
    <div className={`relative w-full ${thumbnail ? 'h-[120px] bg-transparent border-0' : 'h-[600px] bg-slate-900/30 border border-purple-900/20 shadow-inner'} rounded-xl overflow-hidden flex items-center justify-center mb-6`}>
      {!thumbnail && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(88,28,135,0.15)_0%,_rgba(15,23,42,0)_70%)]"></div>}
      
      {/* Decorative center for visualizer */}
      {!thumbnail && (
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <MysticStar size={200 * scale} className="text-purple-500 animate-spin-slow" />
          </div>
      )}

      {/* Container that centers the spread coordinate system */}
      <div 
        className="relative w-0 h-0 flex items-center justify-center transition-transform duration-500"
        style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
      >
        {/* Draw connections first (behind cards) */}
        <svg className="absolute overflow-visible pointer-events-none" style={{ top: 0, left: 0 }}>
          {spread.positions.map((pos) => {
            if (pos.parentId !== undefined) {
              const parentPos = spread.positions.find(p => p.id === pos.parentId);
              if (parentPos) {
                return (
                  <line 
                    key={`line-${pos.id}-${parentPos.id}`}
                    x1={parentPos.x * unitX}
                    y1={parentPos.y * unitY}
                    x2={pos.x * unitX}
                    y2={pos.y * unitY}
                    stroke={thumbnail ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.4)"}
                    strokeWidth={thumbnail ? 1 : 2}
                    strokeDasharray={thumbnail ? "none" : "4 2"}
                  />
                );
              }
            }
            return null;
          })}
        </svg>

        {spread.positions.map((pos, idx) => {
          const isDrawn = idx < drawnCards.length;
          const isCurrent = idx === currentPositionIndex;
          const drawnCard = drawnCards[idx];
          
          return (
            <div
              key={pos.id}
              className={`absolute flex flex-col items-center justify-center transition-all duration-500`}
              style={{
                width: `${cardW}px`,
                height: `${cardH}px`,
                left: pos.x * unitX,
                top: pos.y * unitY,
                marginLeft: `${-cardW / 2}px`,
                marginTop: `${-cardH / 2}px`,
                transform: `rotate(${pos.rotation || 0}deg) scale(${isCurrent ? 1.2 : 1})`,
                zIndex: pos.rotation ? 10 : 1 // Put crossing cards on top
              }}
            >
              {/* Slot Visualization */}
              <div 
                className={`flex items-center justify-center relative transition-colors duration-500
                  ${isDrawn 
                    ? '' 
                    : isCurrent 
                      ? 'border border-amber-400 bg-purple-900/40 rounded animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.2)] w-full h-full' 
                      : thumbnail 
                        ? 'border border-purple-300/30 bg-purple-900/10 rounded w-full h-full' 
                        : 'border border-slate-700 bg-slate-900/20 border-dashed opacity-50 rounded w-full h-full'
                  }`}
              >
                 {isDrawn ? (
                   <VisualizerCard 
                      card={drawnCard.card}
                      isReversed={drawnCard.isReversed}
                      width={cardW}
                      height={cardH}
                      fontSize={fontSize}
                      isThumbnail={thumbnail}
                   />
                 ) : (
                   !thumbnail && <span className="text-slate-500" style={{fontSize: `${fontSize}px`}}>{idx + 1}</span>
                 )}
              </div>
              
              {/* Label (hidden for crossing card to reduce clutter) */}
              {!pos.rotation && !thumbnail && (
                 <span 
                   className={`absolute whitespace-nowrap px-2 py-0.5 rounded-full ${isCurrent ? 'bg-amber-900/80 text-amber-100' : 'bg-slate-900/50 text-slate-500'}`}
                   style={{ 
                     fontSize: `${Math.max(fontSize - 1, 8)}px`,
                     top: '100%',
                     marginTop: '4px' 
                   }}
                 >
                   {pos.name.split('/')[0]}
                 </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Step 3.5: Shuffling Ritual
const ShuffleScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [canStop, setCanStop] = useState(false);
  
  useEffect(() => {
    // Enable "Stop" button after 3 seconds so users feel the shuffle
    const timer = setTimeout(() => {
      setCanStop(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center animate-fadeIn relative z-10">
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-purple-500/20 animate-spin-slow"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full border border-amber-500/20 animate-spin-reverse-slow"></div>
      </div>

      <div className="mb-12 relative h-64 w-full flex items-center justify-center">
        {/* Animated Card Stack */}
        {[0, 1, 2, 3, 4].map((i) => (
           <div 
             key={i} 
             className="absolute w-32 h-56 bg-indigo-950 rounded-lg border-2 border-purple-800 shadow-xl"
             style={{
               animation: `shuffleCard 2s ease-in-out infinite`,
               animationDelay: `${i * 0.2}s`,
               transformOrigin: 'bottom center',
               backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')",
             }}
           >
             <div className="w-full h-full flex items-center justify-center opacity-50">
               <div className="w-12 h-12 rounded-full border border-purple-500/30"></div>
             </div>
           </div>
        ))}
        {/* Style for animation */}
        <style>{`
          @keyframes shuffleCard {
            0% { transform: translateX(0) rotate(0); z-index: 1; }
            25% { transform: translateX(-60px) rotate(-10deg); z-index: 10; }
            50% { transform: translateX(60px) rotate(10deg); z-index: 10; }
            75% { transform: translateX(0) rotate(0); z-index: 5; }
            100% { transform: translateX(0) rotate(0); z-index: 1; }
          }
        `}</style>
      </div>

      <h2 className="text-3xl font-serif text-amber-100 mb-4 animate-pulse">
        正在连接宇宙能量...
      </h2>
      <p className="text-purple-200/70 mb-8 max-w-md mx-auto text-lg leading-relaxed">
        请拿起你的纸质卡牌进行洗牌，让意念注入其中。<br/>
        当准备好后，点击下方按钮完成。
      </p>

      <button
        onClick={onComplete}
        disabled={!canStop}
        className={`px-12 py-4 rounded-full flex items-center gap-3 transition-all duration-500 font-bold tracking-widest uppercase ${
          canStop 
            ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_40px_rgba(217,119,6,0.4)] transform hover:-translate-y-1 scale-100' 
            : 'bg-slate-800 text-slate-500 cursor-not-allowed scale-95 opacity-50'
        }`}
      >
        <StopCircle size={20} />
        <span>完成洗牌</span>
      </button>
      
      {!canStop && (
        <p className="mt-4 text-xs text-slate-600 font-serif italic">仪式进行中...</p>
      )}
    </div>
  );
};

// Step 1: Category Selection
const CategorySelectionScreen = ({ onSelectCategory }: { onSelectCategory: (cat: string) => void }) => {
  const categories = [
    { 
      id: 'love', 
      name: '爱情情感', 
      icon: <CupIcon size={48} className="text-pink-400" glow />, 
      desc: '感情走向、伴侣心意',
      subIcon: <Heart size={12} className="text-pink-600/50" />
    },
    { 
      id: 'career', 
      name: '事业学业', 
      icon: <PentacleIcon size={48} className="text-amber-400" glow />, 
      desc: '工作发展、学业前景',
      subIcon: <Star size={12} className="text-amber-600/50" />
    },
    { 
      id: 'friendship', 
      name: '人际友谊', 
      icon: <WandIcon size={48} className="text-orange-400" glow />, 
      desc: '朋友关系、社交互动',
      subIcon: <User size={12} className="text-orange-600/50" />
    },
    { 
      id: 'decision', 
      name: '决策选择', 
      icon: <SwordIcon size={48} className="text-blue-400" glow />, 
      desc: '左右为难、二选一',
      subIcon: <ArrowRight size={12} className="text-blue-600/50" />
    },
    { 
      id: 'general', 
      name: '综合运势', 
      icon: <MysticStar size={48} className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />, 
      desc: '每日指引、综合分析',
      subIcon: <Sparkles size={12} className="text-purple-600/50" />
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center max-w-5xl mx-auto animate-fadeIn relative">
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-purple-600 blur-[80px] opacity-20 rounded-full animate-pulse"></div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-amber-100 to-purple-200 relative z-10 tracking-wide">
          你心中的困惑关于...
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 relative z-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative bg-slate-950/40 hover:bg-purple-900/10 border border-purple-500/20 hover:border-amber-500/40 rounded-xl p-8 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.15)] flex flex-col items-center gap-4 overflow-hidden"
          >
             {/* Decorative corners */}
             <CornerDecoration className="absolute top-2 left-2 w-4 h-4 text-purple-500/20 group-hover:text-amber-500/40 transition-colors" />
             <CornerDecoration className="absolute top-2 right-2 w-4 h-4 text-purple-500/20 group-hover:text-amber-500/40 transition-colors" rotate={90} />
             <CornerDecoration className="absolute bottom-2 right-2 w-4 h-4 text-purple-500/20 group-hover:text-amber-500/40 transition-colors" rotate={180} />
             <CornerDecoration className="absolute bottom-2 left-2 w-4 h-4 text-purple-500/20 group-hover:text-amber-500/40 transition-colors" rotate={270} />

            <div className="p-5 bg-slate-900/80 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border border-purple-500/10 group-hover:border-amber-500/30 group-hover:scale-110 transition-all duration-500 relative">
               <div className="absolute inset-0 bg-purple-500/5 rounded-full blur-md group-hover:bg-amber-500/10"></div>
               {cat.icon}
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-serif text-slate-200 group-hover:text-amber-100 font-bold tracking-wider mb-1 flex items-center gap-2">
                  {cat.name}
              </h3>
              <div className="h-px w-8 bg-purple-500/30 group-hover:w-16 group-hover:bg-amber-500/50 transition-all duration-500 mb-2"></div>
              <p className="text-xs text-slate-500 group-hover:text-purple-200/80 uppercase tracking-widest">{cat.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Step 2: Spread Selection
const SpreadSelectionScreen = ({ 
  category,
  onSelectSpread,
  onBack
}: { 
  category: string;
  onSelectSpread: (s: Spread) => void;
  onBack: () => void;
}) => {
  // Filter spreads based on category tag
  const filteredSpreads = useMemo(() => {
    return SPREADS.filter(s => {
      // Single card spread and Deep Psychology spread only appear in 'general' category
      if (s.id === 'single' || s.id === 'deep_psychology') {
        return category === 'general';
      }
      return s.tags.includes(category) || s.tags.includes('general');
    });
  }, [category]);

  const categoryLabels: Record<string, string> = {
    love: '爱情情感',
    career: '事业学业',
    friendship: '人际友谊',
    decision: '决策选择',
    general: '综合运势'
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn max-w-6xl mx-auto relative z-10">
      <div className="w-full flex items-center justify-between mb-8 mt-4 px-4">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors group">
          <div className="p-1 rounded-full border border-slate-700 group-hover:border-purple-400 transition-colors">
             <ArrowLeft size={14} />
          </div>
          <span className="font-serif italic">返回</span>
        </button>
        
        <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-purple-500"></div>
            <div className="text-xs font-serif tracking-[0.2em] text-amber-200 uppercase">
                {categoryLabels[category] || '综合'}
            </div>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-purple-500"></div>
        </div>
        
        <div className="w-16"></div> {/* Spacer */}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-400/80 mb-3">选择仪式牌阵</h2>
        <p className="text-purple-300/60 font-light tracking-wide text-sm">TAROT 为你筛选了以下适合的古老牌阵</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 pb-12">
        {filteredSpreads.map((spread) => (
          <div 
            key={spread.id}
            onClick={() => onSelectSpread(spread)}
            className="group bg-slate-900/40 border border-purple-900/30 hover:border-amber-500/30 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:transform hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(88,28,135,0.3)] backdrop-blur-sm"
          >
            <div className="p-6 pb-2 relative">
               <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                   <MysticStar size={40} />
               </div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 rounded-lg bg-purple-950/50 text-purple-400 group-hover:text-amber-400 transition-colors border border-purple-800/30 group-hover:border-amber-600/30">
                    <Layout size={18} />
                 </div>
                 <h3 className="font-serif text-lg font-bold text-slate-200 group-hover:text-amber-100 transition-colors">
                   {spread.name}
                 </h3>
              </div>
              <p className="text-sm text-slate-400 h-10 line-clamp-2 leading-relaxed mb-4 font-light">
                {spread.description}
              </p>
            </div>

            {/* Mini Visualizer */}
            <div className="w-full flex justify-center py-4 bg-black/20 border-t border-white/5 relative">
                <div className="scale-75 origin-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    <SpreadVisualizer 
                      spread={spread} 
                      drawnCards={[]} 
                      currentPositionIndex={-1} 
                      thumbnail={true} 
                    />
                </div>
            </div>

            <div className="px-6 py-4 bg-slate-900/60 flex justify-between items-center text-[10px] text-slate-500 group-hover:text-purple-300 transition-colors font-serif tracking-widest uppercase border-t border-white/5">
               <span>{spread.positions.length} 张牌</span>
               <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">选择 <ArrowRight size={10} /></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Step 3: Question Input
const QuestionInputScreen = ({ 
  spread,
  onStart,
  onBack 
}: { 
  spread: Spread;
  onStart: (q: string) => void;
  onBack: () => void;
}) => {
  const [question, setQuestion] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center max-w-2xl mx-auto animate-fadeIn relative z-10">
      <div className="absolute top-8 left-4 md:left-8">
        <button onClick={onBack} className="text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="font-serif">重选牌阵</span>
        </button>
      </div>

      <div className="mb-8 relative group cursor-default">
        <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse-glow"></div>
        <MysticStar className="w-16 h-16 text-amber-200 relative z-10 animate-float" />
      </div>
      
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-900/20 backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="text-xs text-purple-100 font-serif tracking-widest uppercase">
            {spread.name}
          </span>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200">
        心中的疑问
      </h1>
      <p className="text-purple-200/60 mb-10 text-lg font-light tracking-wide max-w-lg leading-relaxed">
        请在心中默念你的问题，让意念与卡牌连结。<br/>当你准备好时，将问题告诉 TAROT。
      </p>
      
      <div className="w-full relative group max-w-lg mx-auto">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-600 via-amber-500 to-indigo-600 rounded-lg opacity-30 group-hover:opacity-70 transition duration-1000 blur-sm"></div>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="在此输入你的困惑..."
          className="relative w-full bg-slate-900/90 border border-white/10 text-amber-50 p-6 rounded-lg focus:outline-none placeholder-slate-600 text-center text-xl shadow-2xl resize-none h-40 font-serif"
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && question.trim() && onStart(question)}
        />
        <CornerDecoration className="absolute top-2 left-2 text-white/10 pointer-events-none" />
        <CornerDecoration className="absolute bottom-2 right-2 text-white/10 pointer-events-none" rotate={180} />
      </div>

      <button
        onClick={() => question.trim() && onStart(question)}
        disabled={!question.trim()}
        className={`mt-12 px-12 py-4 rounded-full flex items-center gap-3 transition-all duration-500 font-bold text-sm tracking-widest uppercase ${
          question.trim() 
            ? 'bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white shadow-[0_0_40px_rgba(147,51,234,0.3)] transform hover:-translate-y-1 ring-1 ring-white/20' 
            : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
        }`}
      >
        <span>开始洗牌仪式</span>
        <Sparkles size={16} className={question.trim() ? "animate-spin-slow" : ""} />
      </button>
    </div>
  );
};

// Step 4: Card Input Board (Manual Entry)
const CardInputBoard = ({ 
  spread, 
  question,
  onComplete,
  onBack
}: { 
  spread: Spread; 
  question: string;
  onComplete: (drawn: DrawnCard[]) => void;
  onBack: () => void;
}) => {
  const [fullDeck] = useState<TarotCard[]>(getFullDeck());
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>(Suit.Major); // Tab state
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  // Derived state
  const currentPositionIndex = drawnCards.length;
  // Safety check: if complete, index is out of bounds, so handle undefined
  const currentPosition = spread.positions[currentPositionIndex];
  const isComplete = drawnCards.length === spread.positions.length;

  // Tabs for Suits
  const tabs = [
    { id: Suit.Major, label: '大阿卡纳', icon: <MysticStar size={14} /> },
    { id: Suit.Wands, label: '权杖', icon: <WandIcon size={14} /> },
    { id: Suit.Cups, label: '圣杯', icon: <CupIcon size={14} /> },
    { id: Suit.Swords, label: '宝剑', icon: <SwordIcon size={14} /> },
    { id: Suit.Pentacles, label: '星币', icon: <PentacleIcon size={14} /> },
  ];

  // Filter cards based on search AND tab AND not already drawn
  const filteredCards = useMemo(() => {
    // Create a Set of currently drawn cards to exclude them efficiently
    const drawnIds = new Set(drawnCards.map(d => d.card.id));

    return fullDeck.filter(c => {
      const matchesSearch = searchTerm === '' || 
        c.name.includes(searchTerm) || 
        c.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = searchTerm !== '' ? true : c.suit === activeTab; // Ignore tab if searching
      
      // Filter out if card is already selected
      return matchesSearch && matchesTab && !drawnIds.has(c.id);
    });
  }, [fullDeck, searchTerm, activeTab, drawnCards]);

  const handleSelectCard = (card: TarotCard) => {
    setSelectedCard(card);
    setIsReversed(false); // Default to Upright when selecting a new card
    setSearchTerm('');
  };

  const handleConfirm = () => {
    if (!selectedCard || !currentPosition) return;

    const newDraw: DrawnCard = {
      positionId: currentPosition.id,
      card: selectedCard,
      isReversed: isReversed
    };

    setDrawnCards([...drawnCards, newDraw]);
    
    // Reset for next card
    setSelectedCard(null);
    setIsReversed(false);
  };

  // Render Review Screen if Complete
  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fadeIn relative z-10">
         <div className="mb-8 text-center">
            <h2 className="text-5xl font-serif text-amber-100 mb-2 drop-shadow-lg">仪式完成</h2>
            <p className="text-purple-300 font-light">星辰已就位，TAROT 准备解读</p>
         </div>

         <div className="w-full max-w-2xl mb-10 relative">
             <div className="absolute -inset-4 bg-purple-500/10 blur-xl rounded-full"></div>
            <SpreadVisualizer 
              spread={spread} 
              drawnCards={drawnCards} 
              currentPositionIndex={-1} // No current position to highlight
            />
         </div>

         <div className="flex gap-4">
             <button 
               onClick={() => setDrawnCards(prev => prev.slice(0, -1))}
               className="px-6 py-3 rounded-full border border-purple-500/50 text-purple-300 hover:bg-purple-900/30 transition-colors flex items-center gap-2 font-serif"
             >
               <RotateCcw size={16} /> 调整最后一张
             </button>
             <button 
               onClick={() => onComplete(drawnCards)}
               className="px-12 py-3 rounded-full bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white font-bold shadow-[0_0_20px_rgba(217,119,6,0.4)] flex items-center gap-2 transform hover:-translate-y-1 transition-all"
             >
               <Sparkles size={20} /> 开始解读
             </button>
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 w-full max-w-5xl mx-auto animate-fadeIn pb-24 relative z-10">
      {/* Header: Spread Info */}
      <div className="mt-4 mb-2 text-center w-full relative">
         {drawnCards.length === 0 && (
           <button 
             onClick={onBack} 
             className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white flex items-center gap-2 text-xs px-2 transition-colors"
           >
             <ArrowLeft size={12} /> <span className="font-serif">修改问题</span>
           </button>
         )}
         <div className="flex flex-col items-center gap-2">
            <div className="text-xs text-slate-400 max-w-md truncate font-serif italic border-b border-slate-800 pb-1">"{question}"</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-900/10 backdrop-blur-sm">
                <MysticStar size={12} className="text-amber-300" />
                <span className="text-[10px] font-serif text-amber-100 uppercase tracking-widest">{spread.name}</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6">
         {/* Left Side: Visualization & Current Step */}
         <div className="flex flex-col">
            <div className="mb-4">
                <h2 className="text-3xl font-serif text-amber-100 mb-1 flex items-baseline gap-2">
                  <span className="text-purple-400 text-lg font-sans opacity-70">Step {currentPositionIndex + 1}</span>
                  {currentPosition?.name}
                </h2>
                <p className="text-purple-200/50 text-sm font-light">{currentPosition?.description}</p>
            </div>
            
            {/* The Visual Map */}
            <SpreadVisualizer 
              spread={spread} 
              drawnCards={drawnCards} 
              currentPositionIndex={currentPositionIndex} 
            />
            
            <div className="flex gap-2">
              <div className="flex-1 p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg backdrop-blur-md">
                  <p className="text-sm text-purple-200 flex items-center gap-2">
                    <User size={16} className="text-purple-400" /> 
                    <span className="opacity-80">请在现实中或下方列表抽取卡牌。</span>
                  </p>
              </div>
              {drawnCards.length > 0 && (
                <button 
                  onClick={() => setDrawnCards(prev => prev.slice(0, -1))}
                  className="px-4 bg-slate-800/50 hover:bg-red-900/20 border border-slate-700 hover:border-red-500/30 rounded-lg text-slate-400 hover:text-red-300 transition-colors flex flex-col items-center justify-center gap-1"
                  title="撤销上一张"
                >
                  <RotateCcw size={16} />
                  <span className="text-[10px]">撤销</span>
                </button>
              )}
            </div>
         </div>

         {/* Right Side: Card Selection */}
         <div className="flex flex-col bg-slate-900/50 border border-purple-800/30 rounded-xl overflow-hidden h-[600px] backdrop-blur-sm shadow-2xl relative">
            <CornerDecoration className="absolute top-2 left-2 text-white/5 pointer-events-none" />
            <CornerDecoration className="absolute bottom-2 right-2 text-white/5 pointer-events-none" rotate={180} />

            {/* Search Bar */}
            <div className="p-4 border-b border-purple-800/30 bg-slate-950/50">
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="搜索牌名 (如: 愚者, 权杖3...)" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900/80 border border-purple-700/30 rounded-full pl-10 pr-4 py-2 text-white focus:outline-none focus:border-amber-500/50 focus:bg-slate-900 transition-all text-sm placeholder-slate-600"
                  />
              </div>
            </div>

            {/* Suit Tabs */}
            {!searchTerm && (
              <div className="flex overflow-x-auto border-b border-purple-800/30 bg-slate-950/30 scrollbar-hide">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-xs font-serif tracking-wide whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
                      activeTab === tab.id 
                        ? 'border-amber-500 text-amber-100 bg-purple-900/20' 
                        : 'border-transparent text-slate-500 hover:text-purple-300'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Card List Area */}
            <div className="flex-1 overflow-hidden relative flex">
               {selectedCard ? (
                 /* Selection Confirmation View */
                 <div className="absolute inset-0 bg-slate-900/95 z-10 flex flex-col items-center justify-center p-6 animate-fadeIn">
                    <div className="flex justify-between w-full mb-4">
                      <button onClick={() => setSelectedCard(null)} className="text-slate-400 hover:text-white text-sm flex items-center gap-2 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                        重选
                      </button>
                    </div>
                    
                    <CardComponent 
                      card={selectedCard} 
                      isFlipped={true} 
                      isReversed={isReversed} 
                      size="lg"
                      className="shadow-2xl shadow-purple-900/50 mb-6 scale-110"
                    />

                    {/* Improved Orientation Toggle */}
                    <div className="flex flex-col items-center gap-3 mb-6 w-full max-w-xs">
                       <p className="text-purple-300/60 text-[10px] font-serif tracking-[0.2em] uppercase">设定正逆位</p>
                       <div className="flex w-full bg-slate-800 rounded-lg p-1 border border-purple-700/30">
                           <button 
                             onClick={() => setIsReversed(false)}
                             className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${!isReversed ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                           >
                             <ArrowUp size={14} /> 正位
                           </button>
                           <button 
                             onClick={() => setIsReversed(true)}
                             className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${isReversed ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                           >
                             <ArrowDown size={14} /> 逆位
                           </button>
                       </div>
                    </div>

                    <button 
                      onClick={handleConfirm}
                      className="w-full max-w-xs bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white py-3 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 border border-white/10"
                    >
                      <Check size={18} /> 确认选择
                    </button>
                 </div>
               ) : (
                 /* Card Grid View */
                 <div className="flex-1 overflow-y-auto p-3 custom-scrollbar grid grid-cols-3 sm:grid-cols-3 gap-3 content-start">
                    {filteredCards.map(card => (
                      <div 
                        key={card.id}
                        onClick={() => handleSelectCard(card)}
                        className="flex flex-col items-center p-1 rounded-lg cursor-pointer hover:bg-white/5 border border-transparent hover:border-amber-500/20 transition-all group"
                      >
                         <div className="w-full aspect-[2/3] bg-slate-950 rounded border border-purple-900/30 mb-2 overflow-hidden relative shadow-lg">
                            <img src={getCardImageUrl(card)} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity grayscale group-hover:grayscale-0" alt={card.name} />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]">
                               <span className="text-[10px] text-amber-200 font-serif border border-amber-500/50 px-2 py-0.5 rounded-full bg-black/50">选择</span>
                            </div>
                         </div>
                         <p className="text-[10px] text-center font-medium text-slate-400 group-hover:text-amber-100 truncate w-full">{card.name}</p>
                      </div>
                    ))}
                    {filteredCards.length === 0 && (
                      <div className="col-span-full flex flex-col items-center justify-center text-slate-500 py-12 gap-2">
                         <Search size={24} className="opacity-20" />
                         <span className="text-xs">未找到卡牌</span>
                      </div>
                    )}
                 </div>
               )}
            </div>
         </div>
      </div>
      
    </div>
  );
};

// 5. Reading Result
const ReadingResult = ({ 
  request, 
  onReset 
}: { 
  request: ReadingRequest; 
  onReset: () => void;
}) => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchReading = async () => {
      const text = await getTarotReading(request);
      if (isMounted) {
        setResult(text);
        setLoading(false);
      }
    };
    fetchReading();
    return () => { isMounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 animate-fadeIn relative z-10">
      
      {/* Left Column: Cards Display */}
      <div className="md:w-1/3 space-y-6">
         <div className="flex items-center gap-2 border-b border-purple-800/50 pb-3">
            <MysticStar className="text-amber-400" />
            <h3 className="text-xl font-serif text-amber-100">牌阵: {request.spread.name}</h3>
         </div>
         <div className="grid grid-cols-2 gap-4">
            {request.drawnCards.map((drawn) => (
              <div key={drawn.positionId} className="flex flex-col items-center p-3 rounded-xl bg-slate-900/40 border border-purple-500/10">
                <CardComponent 
                  card={drawn.card} 
                  isFlipped={true} 
                  isReversed={drawn.isReversed} 
                  size="sm"
                />
                <div className="mt-3 text-center w-full">
                   <p className="text-xs text-purple-300 font-bold mb-1">{request.spread.positions.find(p=>p.id===drawn.positionId)?.name}</p>
                   <p className="text-[10px] text-slate-400 font-serif">{drawn.card.name}</p>
                   {drawn.isReversed && <p className="text-[9px] text-red-400/80 uppercase tracking-wide mt-0.5">Reversed</p>}
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* Right Column: Interpretation */}
      <div className="md:w-2/3 bg-slate-900/80 border border-purple-500/20 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_-10px_rgba(88,28,135,0.2)] overflow-y-auto max-h-[85vh] relative backdrop-blur-md">
         {/* Decorative corners */}
         <CornerDecoration className="absolute top-4 left-4 text-purple-500/20" />
         <CornerDecoration className="absolute top-4 right-4 text-purple-500/20" rotate={90} />

         {loading ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-slate-900/90 z-20">
             <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full"></div>
                <Loader2 className="w-12 h-12 text-amber-200 animate-spin relative z-10" />
             </div>
             <div className="text-center space-y-2">
                <p className="text-lg font-serif text-amber-100">TAROT 正在连接宇宙能量...</p>
                <p className="text-sm text-purple-400/60 animate-pulse">正在解读牌面符号</p>
             </div>
           </div>
         ) : (
           <div className="prose prose-invert prose-purple max-w-none prose-headings:font-serif prose-headings:text-amber-100 prose-p:text-slate-300 prose-strong:text-amber-200">
             <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-purple-200 m-0 mb-1">
                    TAROT 的解读
                    </h2>
                    <p className="text-xs text-purple-400/60 uppercase tracking-widest font-sans">神秘指引</p>
                </div>
                <button onClick={onReset} className="text-slate-500 hover:text-amber-200 transition-colors p-2 hover:bg-white/5 rounded-full" title="重新开始">
                  <RotateCcw size={20} />
                </button>
             </div>
             
             <div className="text-slate-200 leading-relaxed font-light text-lg">
                <ReactMarkdown>{result}</ReactMarkdown>
             </div>

             <div className="mt-16 pt-8 border-t border-purple-900/50 text-center relative">
                <MysticStar className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-900 bg-slate-900 p-1" size={24} />
                <p className="text-sm text-slate-500 italic font-serif">
                  "命运并非注定，而是选择的集合。"
                </p>
                <button 
                  onClick={onReset}
                  className="mt-8 px-8 py-3 border border-purple-600/50 text-purple-300 rounded-full hover:bg-purple-900/30 hover:text-white hover:border-amber-500/50 transition-all font-serif tracking-wide text-sm"
                >
                  提出新问题
                </button>
             </div>
           </div>
         )}
      </div>
    </div>
  );
};

// Main App Container
const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Welcome);
  const [request, setRequest] = useState<Partial<ReadingRequest>>({});

  // Step 0 -> Step 1
  const handleEnterApp = () => {
    setStep(AppStep.CategorySelect);
  };

  // Step 1 -> Step 2
  const handleCategorySelect = (category: string) => {
    setRequest(prev => ({ ...prev, category }));
    setStep(AppStep.SpreadSelect);
  };

  // Step 2 -> Step 3
  const handleSpreadSelected = (spread: Spread) => {
    setRequest(prev => ({ ...prev, spread }));
    setStep(AppStep.QuestionInput);
  };

  // Step 3 -> Step 3.5 (Shuffle)
  const handleQuestionSubmit = (question: string) => {
    setRequest(prev => ({ ...prev, question }));
    setStep(AppStep.Shuffle);
  };

  // Step 3.5 -> Step 4
  const handleShuffleComplete = () => {
    setStep(AppStep.Draw);
  };

  // Step 4 -> Step 5
  const handleDrawComplete = (drawnCards: DrawnCard[]) => {
    setRequest(prev => ({ ...prev, drawnCards }));
    setStep(AppStep.Reading);
  };

  // Navigation handlers
  const handleBackToCategory = () => {
    setStep(AppStep.CategorySelect);
    setRequest(prev => ({ ...prev, spread: undefined }));
  };

  const handleBackToSpread = () => {
    setStep(AppStep.SpreadSelect);
    setRequest(prev => ({ ...prev, question: undefined }));
  };

  const handleBackToQuestion = () => {
    setStep(AppStep.QuestionInput);
    setRequest(prev => ({ ...prev, drawnCards: [] }));
  };

  const handleReset = () => {
    setRequest({});
    setStep(AppStep.CategorySelect);
  };

  return (
    <div className="min-h-screen bg-[#0f0518] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden relative">
      {/* Background Ambience & Animated Icons */}
      <MysticBackground />
      
      {/* Content Layer */}
      <div className="relative z-10">
        {step === AppStep.Welcome && (
          <WelcomeScreen onEnter={handleEnterApp} />
        )}

        {step === AppStep.CategorySelect && (
          <CategorySelectionScreen onSelectCategory={handleCategorySelect} />
        )}
        
        {step === AppStep.SpreadSelect && request.category && (
          <SpreadSelectionScreen 
            category={request.category} 
            onSelectSpread={handleSpreadSelected} 
            onBack={handleBackToCategory}
          />
        )}

        {step === AppStep.QuestionInput && request.spread && (
          <QuestionInputScreen 
             spread={request.spread}
             onStart={handleQuestionSubmit}
             onBack={handleBackToSpread}
          />
        )}

        {step === AppStep.Shuffle && (
          <ShuffleScreen onComplete={handleShuffleComplete} />
        )}

        {step === AppStep.Draw && request.spread && request.question && (
          <CardInputBoard 
            spread={request.spread} 
            question={request.question}
            onComplete={handleDrawComplete} 
            onBack={handleBackToQuestion}
          />
        )}
        
        {step === AppStep.Reading && request.question && request.spread && request.drawnCards && (
          <ReadingResult 
            request={request as ReadingRequest} 
            onReset={handleReset} 
          />
        )}
      </div>

      {/* Footer / Branding */}
      <div className="fixed bottom-4 left-0 right-0 text-center pointer-events-none z-50">
        <p className="text-[10px] text-purple-500/30 font-serif tracking-[0.2em]">TAROT • 神秘 • 指引</p>
      </div>
    </div>
  );
};

export default App;
