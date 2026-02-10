
import { Suit, Spread, TarotCard } from './types';

export const MAJOR_ARCANA: string[] = [
  '愚者 (The Fool)', '魔术师 (The Magician)', '女祭司 (The High Priestess)', '皇后 (The Empress)', 
  '皇帝 (The Emperor)', '教皇 (The Hierophant)', '恋人 (The Lovers)', '战车 (The Chariot)', 
  '力量 (Strength)', '隐士 (The Hermit)', '命运之轮 (Wheel of Fortune)', '正义 (Justice)', 
  '倒吊人 (The Hanged Man)', '死神 (Death)', '节制 (Temperance)', '恶魔 (The Devil)', 
  '高塔 (The Tower)', '星星 (The Star)', '月亮 (The Moon)', '太阳 (The Sun)', 
  '审判 (Judgement)', '世界 (The World)'
];

const SUITS_MAP = [
  { type: Suit.Wands, label: 'Wands' },
  { type: Suit.Cups, label: 'Cups' },
  { type: Suit.Swords, label: 'Swords' },
  { type: Suit.Pentacles, label: 'Pentacles' }
];

// Helper to generate the full 78 card deck
export const getFullDeck = (): TarotCard[] => {
  const deck: TarotCard[] = [];
  
  // Major Arcana
  MAJOR_ARCANA.forEach((name, index) => {
    deck.push({
      id: `major-${index}`,
      name: name.split(' (')[0],
      nameEn: name.split(' (')[1].replace(')', ''),
      suit: Suit.Major,
      number: index,
      description: '象征人生旅程的主要 archetypes。',
      imageKeyword: `tarot ${name.split(' (')[1].replace(')', '')}`
    });
  });

  // Minor Arcana
  SUITS_MAP.forEach((s) => {
    for (let i = 1; i <= 14; i++) {
      let nameEn = '';
      let nameCn = '';
      
      if (i <= 10) {
        nameEn = `${i} of ${s.label}`;
        nameCn = `${s.type} ${i}`;
        // Changed per request: Ace -> 1, 首牌 -> 1
        if (i === 1) { 
            nameEn = `1 of ${s.label}`; 
            nameCn = `${s.type} 1`; 
        }
      } else {
        const courts = ['Page', 'Knight', 'Queen', 'King'];
        const courtsCn = ['侍从', '骑士', '王后', '国王'];
        nameEn = `${courts[i - 11]} of ${s.label}`;
        nameCn = `${s.type}${courtsCn[i - 11]}`;
      }

      deck.push({
        id: `${s.label.toLowerCase()}-${i}`,
        name: nameCn,
        nameEn: nameEn,
        suit: s.type,
        number: i,
        description: '小阿卡纳牌，反映日常生活的细节。',
        imageKeyword: `tarot ${nameEn}`
      });
    }
  });

  return deck;
};

// Map for overriding specific card images
const CUSTOM_CARD_IMAGES: Record<string, string> = {
  // Wands replacements
  'wands-1': 'https://upload.wikimedia.org/wikipedia/commons/1/11/Wands01.jpg',
  'wands-11': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Wands11.jpg', // Page
  'wands-12': 'https://upload.wikimedia.org/wikipedia/commons/1/16/Wands12.jpg', // Knight
  'wands-13': 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Wands13.jpg', // Queen
  'wands-14': 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Wands14.jpg', // King

  // Cups replacements
  'cups-1': 'https://upload.wikimedia.org/wikipedia/commons/3/36/Cups01.jpg',
  'cups-11': 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Cups11.jpg', // Page
  'cups-12': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Cups12.jpg', // Knight
  'cups-13': 'https://upload.wikimedia.org/wikipedia/commons/6/68/Cups13.jpg', // Queen
  'cups-14': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Cups14.jpg', // King

  // Swords replacements
  'swords-1': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Swords01.jpg',
  'swords-11': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Swords11.jpg', // Page
  'swords-12': 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Swords12.jpg', // Knight
  'swords-13': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Swords13.jpg', // Queen
  'swords-14': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Swords14.jpg', // King

  // Pentacles replacements
  'pentacles-1': 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Pents01.jpg',
  'pentacles-11': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Pents11.jpg', // Page
  'pentacles-12': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Pents12.jpg', // Knight
  'pentacles-13': 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pents13.jpg', // Queen
  'pentacles-14': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Pents14.jpg', // King
};

export const getCardImageUrl = (card: TarotCard): string => {
  // Check if there is a custom override for this card
  if (CUSTOM_CARD_IMAGES[card.id]) {
    return CUSTOM_CARD_IMAGES[card.id];
  }

  // Using Sacred Texts archive as a reliable source for Rider-Waite-Smith deck
  const baseUrl = "https://www.sacred-texts.com/tarot/pkt/img";
  let filename = "";

  if (card.suit === Suit.Major) {
     // Major arcana: ar00.jpg to ar21.jpg
     const num = card.number !== undefined ? card.number.toString().padStart(2, '0') : '00';
     filename = `ar${num}.jpg`;
  } else {
     // Minors: wa, cu, sw, pe + number (01-14)
     const suitPrefixMap: Record<string, string> = {
       [Suit.Wands]: 'wa',
       [Suit.Cups]: 'cu',
       [Suit.Swords]: 'sw',
       [Suit.Pentacles]: 'pe'
     };
     
     const prefix = suitPrefixMap[card.suit] || 'wa';
     const num = card.number !== undefined ? card.number.toString().padStart(2, '0') : '01';
     filename = `${prefix}${num}.jpg`;
  }
  
  return `${baseUrl}/${filename}`;
};

// Coordinates: x (horizontal), y (vertical). 0,0 is center.
// Units are roughly "card slots".
export const SPREADS: Spread[] = [
  // --- General / Daily ---
  {
    id: 'single',
    name: '单张牌阵 (每日指引)',
    description: '最简单直接的方式，适合每日运势或简单的是非题。',
    positions: [
      { id: 0, name: '核心指引', description: '问题的核心答案或当下的指引。', x: 0, y: 0 }
    ],
    tags: ['general', 'daily']
  },
  {
    id: 'mind_body_spirit',
    name: '身心灵平衡 (3张)',
    description: '检视当下的能量状态，寻找内在平衡。',
    positions: [
      { id: 0, name: '心智 (Mind)', description: '你的思维、想法与沟通状态。', x: -1.3, y: 0 },
      { id: 1, name: '身体 (Body)', description: '你的物质世界、健康与行动力。', x: 0, y: 0 },
      { id: 2, name: '灵性 (Spirit)', description: '你的情感、直觉与潜意识。', x: 1.3, y: 0 }
    ],
    tags: ['general', 'self']
  },
  {
    id: 'deep_psychology',
    name: '阴影面牌阵 (24张)',
    description: '从童年根基到阴影面，像树一样生长的深度自我探索。',
    positions: [
        // --- Root Group (Base of the tree) ---
        { id: 1, name: "童年", description: "核心根基", x: 0, y: 3.5, group: "Root" },
        
        // --- Family Group (Left Roots) ---
        { id: 2, name: "家庭生活", description: "左侧分支", parentId: 1, x: -1.5, y: 3.5, group: "Family" },
        { id: 3, name: "母亲原型", description: "连接至家庭生活", parentId: 2, x: -2.8, y: 3.5, group: "Family" },
        { id: 4, name: "父亲原型", description: "连接至家庭生活", parentId: 2, x: -1.5, y: 4.8, group: "Family" },
        { id: 5, name: "兄弟姐妹", description: "连接至家庭生活", parentId: 2, x: -1.5, y: 2.2, group: "Family" },

        // --- Society Group (Right Roots) ---
        { id: 6, name: "成长经历", description: "右侧分支", parentId: 1, x: 1.5, y: 3.5, group: "Society" },
        { id: 7, name: "文化", description: "连接至成长经历", parentId: 6, x: 2.8, y: 3.5, group: "Society" },
        { id: 8, name: "宗教", description: "连接至文化", parentId: 7, x: 2.8, y: 2.2, group: "Society" },
        { id: 9, name: "社会", description: "连接至文化", parentId: 7, x: 4.0, y: 3.5, group: "Society" },

        // --- Trunk (Lower Center) ---
        { id: 10, name: "经历", description: "连接童年与自我", parentId: 1, x: 0, y: 2.2, group: "Trunk" },
        { id: 11, name: "自我", description: "核心枢纽", parentId: 10, x: 0, y: 1.0, group: "Trunk" },

        // --- Left Branch (Internal/Emotional) ---
        { id: 12, name: "恐惧", description: "源自自我", parentId: 11, x: -1.5, y: 1.0, group: "Left_Branch" },
        { id: 13, name: "依附", description: "Internal", parentId: 12, x: -2.8, y: 1.0, group: "Left_Branch" },
        { id: 14, name: "厌恶", description: "Internal", parentId: 12, x: -1.5, y: -0.2, group: "Left_Branch" },
        { id: 15, name: "习惯", description: "Internal", parentId: 13, x: -4.0, y: 1.0, group: "Left_Branch" },

        // --- Right Branch (Mental/External) ---
        { id: 16, name: "抱负", description: "源自自我", parentId: 11, x: 1.5, y: 1.0, group: "Right_Branch" },
        { id: 17, name: "思维模式", description: "External", parentId: 16, x: 2.8, y: 1.0, group: "Right_Branch" },
        { id: 18, name: "信念体系", description: "External", parentId: 16, x: 1.5, y: -0.2, group: "Right_Branch" },
        { id: 19, name: "欲望", description: "External", parentId: 17, x: 4.0, y: 1.0, group: "Right_Branch" },

        // --- Trunk (Upper Center) ---
        { id: 20, name: "当下状况", description: "Current", parentId: 11, x: 0, y: -0.2, group: "Trunk" },
        { id: 21, name: "关系", description: "Relationships", parentId: 20, x: 0, y: -1.4, group: "Trunk" },

        // --- Relationship Branches ---
        { id: 22, name: "投射", description: "源自关系", parentId: 21, x: -1.5, y: -1.4, group: "Left_Branch" },
        { id: 23, name: "反应", description: "源自关系", parentId: 21, x: 1.5, y: -1.4, group: "Right_Branch" },

        // --- Top (Shadow) ---
        { id: 24, name: "阴影面", description: "最终结果/顶端", parentId: 21, x: 0, y: -2.6, group: "Trunk_Top" }
    ],
    tags: ['general', 'self', 'psychology']
  },

  // --- Love ---
  {
    id: 'true_love',
    name: '寻找真爱 (5张)',
    description: '专为单身设计，分析单身原因及如何吸引对的人。',
    positions: [
      { id: 0, name: '单身原因', description: '为何你目前处于单身状态。', x: 0, y: 0 },
      { id: 1, name: '过去阻碍', description: '需要放下的过去模式或伤痛。', x: -1.5, y: 0 },
      { id: 2, name: '理想伴侣', description: '最适合你的伴侣特质。', x: 1.5, y: 0 },
      { id: 3, name: '寻找方向', description: '在哪里或如何遇到桃花。', x: 0, y: -1.2 },
      { id: 4, name: '近期指引', description: '未来三个月的桃花运势。', x: 0, y: 1.2 }
    ],
    tags: ['love']
  },
  {
    id: 'love_match',
    name: '恋情走向 (4张)',
    description: '简洁明了地分析两人关系的发展潜力。',
    positions: [
      { id: 0, name: '你的状态', description: '你在关系中的投入与感受。', x: -1.5, y: 0 },
      { id: 1, name: 'Ta的状态', description: '对方在关系中的态度与想法。', x: 1.5, y: 0 },
      { id: 2, name: '关系现状', description: '你们目前的互动模式。', x: 0, y: -1 },
      { id: 3, name: '未来趋势', description: '关系接下来的发展方向。', x: 0, y: 1 }
    ],
    tags: ['love', 'relationship']
  },
  {
    id: 'love_star',
    name: '爱情之星 (5张)',
    description: '深入洞察恋爱关系，分析双方心意与关系障碍。',
    positions: [
      { id: 0, name: '你的心态', description: '你在感情中的真实感受。', x: 0, y: 1.2 },
      { id: 1, name: '对方的心态', description: '对方对这段感情的真实态度。', x: -1.3, y: 0 },
      { id: 2, name: '目前的阻碍', description: '你们之间存在的问题或挑战。', x: 1.3, y: 0 },
      { id: 3, name: '建议/行动', description: '如何改善关系的建议。', x: 0, y: -0.8 },
      { id: 4, name: '最终结果', description: '依照现状发展的可能性。', x: 0, y: -2.0 }
    ],
    tags: ['love', 'relationship']
  },

  // --- Career / Study ---
  {
    id: 'job_change',
    name: '跳槽/转变决策 (5张)',
    description: '当你想改变工作或环境时，分析变与不变的利弊。',
    positions: [
      { id: 0, name: '当前处境', description: '目前工作的真实状态。', x: 0, y: 1.5 },
      { id: 1, name: '留下的利弊', description: '如果维持现状会如何。', x: -1.5, y: 0 },
      { id: 2, name: '改变的利弊', description: '如果选择改变/跳槽会如何。', x: 1.5, y: 0 },
      { id: 3, name: '内心渴望', description: '你真正追求的职业价值。', x: 0, y: -1.5 },
      { id: 4, name: '最终建议', description: 'Talor 给出的最佳行动方案。', x: 0, y: 0 }
    ],
    tags: ['career', 'choice']
  },
  {
    id: 'study_exam',
    name: '学业考试运 (4张)',
    description: '分析学习状态、考试运势及改进方向。',
    positions: [
      { id: 0, name: '目前程度', description: '你当下的知识掌握或准备情况。', x: 0, y: 1 },
      { id: 1, name: '薄弱环节', description: '需要重点突破的弱项或干扰。', x: -1.2, y: 0 },
      { id: 2, name: '优势资源', description: '可以利用的优势或外部助力。', x: 1.2, y: 0 },
      { id: 3, name: '预期结果', description: '考试或学业的可能结果。', x: 0, y: -1.2 }
    ],
    tags: ['career', 'study']
  },
  {
    id: 'career',
    name: '职业金字塔 (5张)',
    description: '梳理职业发展路径，分析优劣势与突破口。',
    positions: [
      { id: 0, name: '职业现状', description: '目前的工作状态或环境。', x: 0, y: 1.5 },
      { id: 1, name: '你的优势', description: '支持你发展的技能或资源。', x: -1.2, y: 0.5 },
      { id: 2, name: '你的劣势', description: '阻碍你发展的短板或挑战。', x: 1.2, y: 0.5 },
      { id: 3, name: '策略/行动', description: '当下应该采取的行动。', x: 0, y: -0.5 },
      { id: 4, name: '未来成就', description: '预期的职业目标或结果。', x: 0, y: -1.5 }
    ],
    tags: ['career', 'work']
  },

  // --- Friendship ---
  {
    id: 'conflict',
    name: '矛盾化解 (4张)',
    description: '当友谊或人际关系出现冲突时，寻找解决之道。',
    positions: [
      { id: 0, name: '冲突核心', description: '导致矛盾的根本原因。', x: 0, y: 0 },
      { id: 1, name: '你的盲点', description: '你可能没意识到的自身问题。', x: -1.5, y: 1 },
      { id: 2, name: '对方立场', description: '对方的真实感受与立场。', x: 1.5, y: 1 },
      { id: 3, name: '和解关键', description: '化解矛盾的建议或共同点。', x: 0, y: -1.5 }
    ],
    tags: ['friendship']
  },
  {
    id: 'friendship',
    name: '友谊之镜 (6张)',
    description: '专门用于分析朋友、同事或伙伴之间的互动关系与看法。',
    positions: [
      { id: 0, name: '你的现状', description: '你在这段关系中展现的状态。', x: -1.6, y: 0 },
      { id: 1, name: '对方现状', description: '对方在这段关系中展现的状态。', x: 1.6, y: 0 },
      { id: 2, name: '你对Ta的看法', description: '你内心如何看待对方。', x: -1.6, y: -1.2 },
      { id: 3, name: 'Ta对你的看法', description: '对方内心如何看待你。', x: 1.6, y: -1.2 },
      { id: 4, name: '关系核心/阻碍', description: '连接你们的关键点或存在的问题。', x: 0, y: 0 },
      { id: 5, name: '未来发展', description: '这段友谊或关系的未来走向。', x: 0, y: -1.8 }
    ],
    tags: ['friendship', 'relationship']
  },

  // --- Decision / Choice ---
  {
    id: 'blind_spot',
    name: '盲点之窗 (4张)',
    description: '探索自我认知的盲区，了解自己与他人的认知差异。',
    positions: [
      { id: 0, name: '开放我 (Open)', description: '你自己知道，别人也知道的特质。', x: -1, y: -1 },
      { id: 1, name: '隐私我 (Hidden)', description: '你自己知道，但别人不知道的秘密。', x: 1, y: -1 },
      { id: 2, name: '盲目我 (Blind)', description: '你自己不知道，但别人看得很清楚的特质。', x: -1, y: 1 },
      { id: 3, name: '未知我 (Unknown)', description: '潜能或深层潜意识，谁都不知道的部分。', x: 1, y: 1 }
    ],
    tags: ['decision', 'self']
  },
  {
    id: 'choice',
    name: '二选一牌阵',
    description: '当你面临两个选择犹豫不决时使用。',
    positions: [
      { id: 0, name: '现状', description: '你目前所处的心理状态。', x: 0, y: 1 },
      { id: 1, name: '选择A的结果', description: '如果你选择方案A可能发生的情况。', x: -1.2, y: -0.5 },
      { id: 2, name: '选择B的结果', description: '如果你选择方案B可能发生的情况。', x: 1.2, y: -0.5 },
      { id: 3, name: '综合建议', description: '给你的最终建议。', x: 0, y: -1.5 }
    ],
    tags: ['choice', 'decision']
  },

  // --- Universal ---
  {
    id: 'time',
    name: '圣三角 (过去/现在/未来)',
    description: '经典的线性时间流牌阵，分析事情的因果发展。',
    positions: [
      { id: 0, name: '过去', description: '导致现状的原因或背景。', x: -1.2, y: 0 },
      { id: 1, name: '现在', description: '当下的状况与挑战。', x: 0, y: 0 },
      { id: 2, name: '未来', description: '事情可能发展的方向。', x: 1.2, y: 0 }
    ],
    tags: ['general', 'time', 'career', 'love', 'friendship']
  },
  {
    id: 'celtic',
    name: '凯尔特十字 (深度解析)',
    description: '最古老且全面的牌阵，全方位分析问题的内外因素。',
    positions: [
      { id: 0, name: '现状/核心', description: '当前所处的环境与核心问题。', x: 0, y: 0 },
      { id: 1, name: '阻碍/挑战', description: '阻挡你或帮助你的力量（横向覆盖在核心牌上）。', x: 0, y: 0, rotation: 90 },
      { id: 2, name: '根源/潜意识', description: '问题的根基，通常是你未察觉的潜意识动机。', x: 0, y: 1.2 },
      { id: 3, name: '过去', description: '导致目前状况的过去事件。', x: -1.2, y: 0 },
      { id: 4, name: '目标/显意识', description: '你期望的结果或表面上的想法。', x: 0, y: -1.2 },
      { id: 5, name: '近期未来', description: '即将发生的事情。', x: 1.2, y: 0 },
      { id: 6, name: '自我态度', description: '你在这个局势中的角色与态度。', x: 2.8, y: 1.5 },
      { id: 7, name: '环境影响', description: '周遭人事物对你的看法或影响。', x: 2.8, y: 0.5 },
      { id: 8, name: '愿望与恐惧', description: '内心深处的希望或担忧。', x: 2.8, y: -0.5 },
      { id: 9, name: '最终结果', description: '若现状持续发展，可能导向的结局。', x: 2.8, y: -1.5 },
    ],
    tags: ['general', 'complex']
  }
];
