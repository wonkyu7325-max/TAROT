
import { GoogleGenAI } from "@google/genai";
import { ReadingRequest, Spread } from '../types';
import { SPREADS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Updated function to recommend multiple spreads
export const recommendSpreads = async (question: string): Promise<Spread[]> => {
  const spreadsInfo = SPREADS.map(s => `ID: ${s.id}, Name: ${s.name}, Desc: ${s.description}`).join('\n');
  
  const prompt = `
    Role: Tarot Master TAROT.
    Task: Rank the available Tarot spreads based on suitability for the user's question.
    
    User Question: "${question}"
    
    Available Spreads:
    ${spreadsInfo}
    
    Instructions:
    1. Analyze the intent of the question.
    2. Return a comma-separated list of ALL spread IDs, ordered by relevance (most suitable first).
    3. Example Output: "time, single, choice, celtic"
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.1, 
      }
    });

    const text = response.text?.trim().toLowerCase() || '';
    // Extract IDs from response
    const recommendedIds = text.split(',').map(s => s.trim().replace(/['"]/g, ''));
    
    // Map IDs back to Spread objects, preserving the AI's order
    const orderedSpreads: Spread[] = [];
    const seen = new Set<string>();

    // Add AI suggestions first
    recommendedIds.forEach(id => {
        const spread = SPREADS.find(s => id.includes(s.id)); // loose match
        if (spread && !seen.has(spread.id)) {
            orderedSpreads.push(spread);
            seen.add(spread.id);
        }
    });

    // Add any remaining spreads that weren't in the AI list (just in case)
    SPREADS.forEach(s => {
        if (!seen.has(s.id)) {
            orderedSpreads.push(s);
        }
    });

    return orderedSpreads;
  } catch (error) {
    console.error("Error recommending spreads:", error);
    return SPREADS; // Fallback to default order
  }
};

export const getTarotReading = async (request: ReadingRequest): Promise<string> => {
  const { question, spread, drawnCards } = request;

  const cardsDescription = drawnCards.map(d => {
    const positionName = spread.positions.find(p => p.id === d.positionId)?.name || '未知位置';
    const orientation = d.isReversed ? '逆位 (Reversed)' : '正位 (Upright)';
    return `- 位置 [${positionName}]: ${d.card.name} (${d.card.nameEn}), ${orientation}`;
  }).join('\n');

  const prompt = `
    你是一位名为 "TAROT" 的资深塔罗牌解惑师。你精通神秘学、心理学，语气神秘、温柔且具有疗愈感。
    
    用户的问题: "${question}"
    使用的牌阵: "${spread.name}"
    
    抽出的牌面如下:
    ${cardsDescription}
    
    请根据牌阵定义和抽出的卡牌，为用户进行深度解读。
    
    输出要求:
    1. 使用 Markdown 格式。
    2. 结构清晰：
       - **整体洞察**: 用几句话概括牌面能量。
       - **详细解读**: 针对每一张牌及其所在位置进行深入分析，结合正逆位含义。
       - **TAROT 的建议**: 给用户的具体行动建议或心理指引。
    3. 语气要富有同理心，避免过于绝对的宿命论，更多引导用户向内探索。
    4. 如果是负面牌（如死神、高塔），请侧重于转化和重生的积极意义。
  `;

  const generateWithRetry = async () => {
    try {
      // First try with Gemini 3 Pro for higher quality
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          temperature: 0.8,
        }
      });
      return response.text;
    } catch (error) {
      console.warn("Gemini 3 Pro failed, falling back to Flash...", error);
      // Fallback to Gemini 3 Flash if Pro fails (e.g. overload or error 500)
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          temperature: 0.8,
        }
      });
      return response.text;
    }
  };

  try {
    const text = await generateWithRetry();
    return text || "抱歉，TAROT 现在的连接有点不稳定，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "解读过程中发生了一些神秘的干扰 (API Error)，请检查网络连接或稍后重试。";
  }
};
