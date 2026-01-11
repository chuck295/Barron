
import React, { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import AnalysisResult from './components/AnalysisResult';
import { AppState, EthologyAnalysis } from './types';
import { analyzeAnimalBehavior } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysis, setAnalysis] = useState<EthologyAnalysis | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Support both small videos and images
    if (!file.type.startsWith('video/') && !file.type.startsWith('image/')) {
      setError("Please upload a video or an image file.");
      return;
    }

    // Reset states
    setError(null);
    setAppState(AppState.ANALYZING);
    setMediaUrl(URL.createObjectURL(file));

    try {
      const base64Data = await convertToBase64(file);
      const result = await analyzeAnimalBehavior(base64Data, file.type);
      setAnalysis(result);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to analyze animal behavior. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const reset = () => {
    setAppState(AppState.IDLE);
    setAnalysis(null);
    setMediaUrl(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        {appState === AppState.IDLE && (
          <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
            <h2 className="text-5xl md:text-6xl font-display text-slate-900 mb-6 leading-tight">
              What is your <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">pet</span> trying to tell you?
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12">
              Upload a short video of your cat, dog, or any animal. EthoLens uses expert AI ethology to translate body language and sounds into human insights.
            </p>
            
            <button
              onClick={triggerUpload}
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-emerald-600 rounded-2xl hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Pet Video
            </button>
            <p className="mt-6 text-slate-400 text-sm">Supported formats: MP4, MOV, WebM, JPEG, PNG</p>
          </div>
        )}

        {appState === AppState.ANALYZING && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Behavioral Cues</h3>
            <p className="text-slate-500 animate-pulse">Our AI ethologist is studying the video frame by frame...</p>
          </div>
        )}

        {appState === AppState.ERROR && (
          <div className="bg-rose-50 border-2 border-rose-100 rounded-3xl p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-600 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Analysis Failed</h3>
            <p className="text-rose-600 mb-8 max-w-md mx-auto">{error}</p>
            <button
              onClick={reset}
              className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Try Another Video
            </button>
          </div>
        )}

        {appState === AppState.SUCCESS && analysis && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold text-slate-900">Analysis Report</h2>
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-emerald-600 font-semibold transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                New Analysis
              </button>
            </div>
            <AnalysisResult data={analysis} videoUrl={mediaUrl} />
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="video/*,image/*"
          className="hidden"
        />
      </main>

      <footer className="w-full bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="text-white font-display font-bold text-lg tracking-tight">EthoLens</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              EthoLens uses multi-modal Gemini AI to observe and interpret animal behavior for educational purposes.
            </p>
          </div>
          <div className="text-sm md:text-right">
            <p>© 2024 EthoLens AI. Built for Pet Lovers & Scientists.</p>
            <p className="mt-2 text-slate-600 italic">Always consult a veterinarian for health or safety concerns.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
