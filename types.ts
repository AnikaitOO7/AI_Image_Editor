
export type PresetCategory = 'Professional' | 'Creative' | 'Utility' | 'Custom';

export interface EditPreset {
  id: string;
  label: string;
  description: string;
  prompt: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color classes
  category: PresetCategory;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface GeneratedImage {
  url: string;
  timestamp: number;
  promptUsed: string;
}

export interface ProcessingState {
  status: GenerationStatus;
  message?: string;
  error?: string;
}
