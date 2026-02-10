
export enum Suit {
  Wands = '权杖',
  Cups = '圣杯',
  Swords = '宝剑',
  Pentacles = '星币',
  Major = '大阿卡纳'
}

export interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  suit: Suit;
  number?: number;
  description: string;
  imageKeyword: string; // Used to seed a placeholder image
}

export interface SpreadPosition {
  id: number;
  name: string;
  description: string;
  x: number; // Grid coordinate X (relative to center)
  y: number; // Grid coordinate Y (relative to center)
  rotation?: number; // Rotation in degrees (e.g. 90 for crossing cards)
  parentId?: number; // ID of the parent node for tree visualization
  group?: string; // Grouping for semantic structure
}

export interface Spread {
  id: string;
  name: string;
  description: string;
  positions: SpreadPosition[];
  tags: string[]; // Added for categorization
}

export interface DrawnCard {
  positionId: number;
  card: TarotCard;
  isReversed: boolean;
}

export enum AppStep {
  Welcome,        // Step 0: Welcome / Landing
  CategorySelect, // Step 1: Select Category (Love, Career, etc.)
  SpreadSelect,   // Step 2: Select specific Spread
  QuestionInput,  // Step 3: Input specific question
  Shuffle,        // Step 3.5: Shuffling Ritual
  Draw,           // Step 4: Draw cards
  Reading,        // Step 5: AI Interpretation
}

export interface ReadingRequest {
  category?: string;
  question: string;
  spread: Spread;
  drawnCards: DrawnCard[];
}
