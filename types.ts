export interface VideoMetadata {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string; // Simulated in frontend-only env
  duration: string; // Simulated
}

export interface DownloadOption {
  quality: string;
  format: string;
  size: string;
  badge?: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  READY = 'READY',
  DOWNLOADING = 'DOWNLOADING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface FAQItem {
  question: string;
  answer: string;
}