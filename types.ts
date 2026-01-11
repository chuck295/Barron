
export interface EthologyAnalysis {
  visualCues: string;
  audioCues: string;
  emotionalState: string;
  translation: string;
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
