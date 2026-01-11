
import React from 'react';
import { EthologyAnalysis } from '../types';

interface AnalysisResultProps {
  data: EthologyAnalysis;
  videoUrl: string | null;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, videoUrl }) => {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Media Preview */}
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video flex items-center justify-center border-4 border-white">
          {videoUrl ? (
            <video src={videoUrl} controls className="w-full h-full object-contain" />
          ) : (
            <div className="text-white opacity-50">Media Preview Unavailable</div>
          )}
        </div>

        {/* Analysis Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.523 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </span>
              Visual Observations
            </h3>
            <p className="text-slate-600 leading-relaxed">{data.visualCues}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.983 3.983 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              </span>
              Acoustic Profile
            </h3>
            <p className="text-slate-600 leading-relaxed">{data.audioCues}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </span>
              Emotional State
            </h3>
            <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-sm font-bold rounded-full mb-3 uppercase tracking-wider">
              {data.emotionalState}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Translation */}
      <div className="mt-12 bg-emerald-600 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        </div>
        <div className="relative z-10">
          <h2 className="text-emerald-200 uppercase font-bold text-sm tracking-widest mb-4">The Animal says...</h2>
          <blockquote className="text-4xl md:text-5xl font-display leading-tight italic">
            "{data.translation}"
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
