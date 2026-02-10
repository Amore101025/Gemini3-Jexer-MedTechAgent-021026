export interface ArticleData {
  title: string;
  content: string;
  lastUpdated: string;
}

export enum AIModel {
  GEMINI_2_5_FLASH = 'gemini-2.5-flash-latest',
  GEMINI_3_FLASH_PREVIEW = 'gemini-3-flash-preview',
  GEMINI_3_PRO_PREVIEW = 'gemini-3-pro-preview'
}

export interface PainterStyle {
  id: string;
  name: string;
  bgGradient: string;
  cardBg: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  borderColor: string;
}

export interface GraphData {
  name: string;
  value: number;
  category?: string;
  fullMark?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface AIKeyword {
  word: string;
  color: string;
}

export enum Language {
  EN = 'English',
  ZH = 'Traditional Chinese'
}