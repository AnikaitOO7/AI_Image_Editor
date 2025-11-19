import React, { useState } from 'react';
import { GeneratedImage } from '../types';
import { Download, RefreshCw, AlertCircle, Eye, ImageIcon } from 'lucide-react';

interface ResultDisplayProps {
  originalImage: File | null;
  generatedImage: GeneratedImage | null;
  isProcessing: boolean;
  error?: string;
  onRetry: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  originalImage,
  generatedImage, 
  isProcessing, 
  error, 
  onRetry 
}) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const originalImageUrl = React.useMemo(() => originalImage ? URL.createObjectURL(originalImage) : null, [originalImage]);

  if (isProcessing) {
    return (
      <div className="w-full max-w-xl mx-auto h-96 glass-panel rounded-3xl flex flex-col items-center justify-center gap-8 relative overflow-hidden animate-in">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent -translate-y-full animate-shimmer-vertical"></div>
        </div>
        <style>{`
          @keyframes shimmer-vertical {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-shimmer-vertical {
            animation: shimmer-vertical 2s infinite linear;
          }
        `}</style>
        
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 animate-pulse flex items-center justify-center border border-indigo-500/30">
             <div className="w-12 h-12 bg-indigo-500 rounded-lg animate-spin"></div>
          </div>
        </div>
        
        <div className="text-center z-10 px-6">
          <h3 className="text-xl font-bold text-white mb-2">Working Magic...</h3>
          <p className="text-slate-400 text-sm">Gemini 2.5 is analyzing pixels and applying your request.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto p-8 bg-red-950/30 border border-red-500/20 rounded-3xl flex flex-col items-center text-center gap-4 animate-scale">
        <div className="w-14 h-14 bg-red-900/40 rounded-full flex items-center justify-center text-red-400 ring-4 ring-red-900/20">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-red-200 mb-1">Generation Failed</h3>
          <p className="text-sm text-red-300/70 max-w-xs mx-auto">{error}</p>
        </div>
        <button 
          onClick={onRetry}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-900/40"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!generatedImage || !originalImageUrl) return null;

  return (
    <div className="w-full max-w-5xl mx-auto animate-in">
      <div className="glass-panel rounded-3xl p-3 md:p-6 shadow-2xl shadow-black/80">
        <div className="relative group rounded-2xl overflow-hidden bg-[#000000] aspect-[4/5] md:aspect-video max-h-[650px] flex items-center justify-center">
          
          {/* Image Container */}
          <img 
            src={showOriginal ? originalImageUrl : generatedImage.url} 
            alt="Result" 
            className="w-full h-full object-contain transition-opacity duration-300"
          />
          
          {/* Comparison Toggle Overlay */}
          <div 
            className="absolute top-4 right-4 z-20"
            onMouseDown={() => setShowOriginal(true)}
            onMouseUp={() => setShowOriginal(false)}
            onMouseLeave={() => setShowOriginal(false)}
            onTouchStart={() => setShowOriginal(true)}
            onTouchEnd={() => setShowOriginal(false)}
          >
            <button className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10 flex items-center gap-2 hover:bg-black/80 transition-colors select-none">
              <Eye className="w-4 h-4" />
              {showOriginal ? 'Viewing Original' : 'Hold to Compare'}
            </button>
          </div>

          {/* Compare Badge */}
          {showOriginal && (
             <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur text-white px-3 py-1 rounded-lg text-xs font-bold border border-indigo-400/50 shadow-lg">
               ORIGINAL
             </div>
          )}
            
          {/* Actions Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-100 transition-all duration-300 translate-y-0">
            <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
               <div className="hidden md:block">
                 <p className="text-white font-bold text-lg flex items-center gap-2">
                   <ImageIcon className="w-4 h-4 text-indigo-400"/> 
                   Generated Result
                 </p>
                 <p className="text-slate-400 text-xs max-w-xs truncate mt-1 opacity-80">
                   {generatedImage.promptUsed}
                 </p>
               </div>
               
               <div className="flex gap-3 w-full md:w-auto">
                  <button 
                    onClick={onRetry}
                    className="flex-1 md:flex-none justify-center flex items-center gap-2 px-5 py-3 bg-slate-800/80 hover:bg-slate-700 text-white rounded-xl backdrop-blur-sm transition-all border border-slate-700 font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="md:hidden">New</span>
                  </button>
                  <a 
                    href={generatedImage.url} 
                    download={`astro-softwares-${generatedImage.timestamp}.png`}
                    className="flex-[2] md:flex-none justify-center flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-slate-200 rounded-xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;