
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import StyleSelector from './components/StyleSelector';
import ResultDisplay from './components/ResultDisplay';
import { EDIT_PRESETS } from './constants';
import { EditPreset, GenerationStatus, GeneratedImage } from './types';
import { generateEdit } from './services/geminiService';
import { fileToBase64, getMimeType } from './services/utils';
import { Wand2, Upload, Sliders, Sparkles, Zap, Info, Lightbulb, Layers } from 'lucide-react';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<EditPreset | null>(EDIT_PRESETS[0]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [error, setError] = useState<string | undefined>(undefined);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setStatus(GenerationStatus.IDLE);
    setGeneratedImage(null);
    setError(undefined);
    // Ensure we aren't stuck in custom mode if the user didn't want it, or keep it. 
    // Let's reset to default professional preset for a fresh start on new image.
    if (selectedPreset?.id === 'custom') {
         const defaultPreset = EDIT_PRESETS.find(p => p.id === 'corporate') || EDIT_PRESETS[0];
         setSelectedPreset(defaultPreset);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setStatus(GenerationStatus.IDLE);
    setGeneratedImage(null);
    setError(undefined);
  };

  const handleGenerate = useCallback(async () => {
    if (!selectedImage || !selectedPreset) return;

    setStatus(GenerationStatus.PROCESSING);
    setError(undefined);
    
    try {
      const base64 = await fileToBase64(selectedImage);
      const mimeType = getMimeType(selectedImage);
      
      // Determine prompt: Use custom prompt if 'custom' style is selected, otherwise use style modifier
      const prompt = selectedPreset.id === 'custom' 
        ? customPrompt 
        : selectedPreset.prompt;

      if (selectedPreset.id === 'custom' && !customPrompt.trim()) {
        throw new Error("Please enter a description for your custom edit.");
      }

      const resultUrl = await generateEdit(base64, prompt, mimeType);

      setGeneratedImage({
        url: resultUrl,
        timestamp: Date.now(),
        promptUsed: prompt
      });
      setStatus(GenerationStatus.COMPLETED);

      // Scroll to result
      setTimeout(() => {
        document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to generate image");
      setStatus(GenerationStatus.ERROR);
    }
  }, [selectedImage, selectedPreset, customPrompt]);

  const handleRetry = () => {
    setStatus(GenerationStatus.IDLE);
    // generatedImage remains visible until new generation starts usually, but here we reset to allow changing settings
  };

  const canGenerate = selectedImage && selectedPreset && status !== GenerationStatus.PROCESSING;

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500/30 overflow-x-hidden relative">
      {/* Decorative Background Blobs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-10 relative z-10">
        
        {/* Hero Text - Only show if NO image is selected (Landing Mode) */}
        {!selectedImage && (
           <div className="text-center max-w-4xl mx-auto mb-2 animate-in">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wide uppercase shadow-lg shadow-indigo-900/20 backdrop-blur-md">
              Astro Softwares
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Transform your photos with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse">
                Gemini Magic
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Remove backgrounds, generate professional headshots, or create artistic masterpieces instantly.
            </p>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left px-4">
              {[
                { icon: Upload, title: 'Upload', desc: 'Start with any casual photo or selfie.' },
                { icon: Layers, title: 'Choose Style', desc: 'Select from 15+ pro & creative presets.' },
                { icon: Sparkles, title: 'Instant Magic', desc: 'Powered by Gemini 2.5 Flash Image.' }
              ].map((step, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                  <div className="absolute top-0 right-0 p-20 bg-indigo-600/10 rounded-full blur-3xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/50">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workflow Container */}
        <div className="flex flex-col gap-8 relative pb-20">
          
          {/* Result Section */}
          {status === GenerationStatus.COMPLETED ? (
            <section id="result" className="scroll-mt-24">
              <ResultDisplay 
                originalImage={selectedImage}
                generatedImage={generatedImage} 
                isProcessing={false}
                error={error}
                onRetry={handleRetry}
              />
              <div className="text-center mt-8">
                 <button 
                   onClick={handleRetry}
                   className="text-slate-500 hover:text-white underline underline-offset-4 text-sm transition-colors"
                 >
                   Create another one
                 </button>
              </div>
            </section>
          ) : (
            <>
              {/* Upload Step */}
              <section className={`transition-all duration-500 ${status === GenerationStatus.PROCESSING ? 'opacity-50 pointer-events-none blur-sm' : 'opacity-100'}`}>
                 <UploadSection 
                   selectedImage={selectedImage} 
                   onImageSelect={handleImageSelect}
                   onClear={handleClearImage}
                 />
              </section>

              {/* Style Step */}
              {selectedImage && (
                <section className={`animate-in delay-100 transition-all duration-500 ${status === GenerationStatus.PROCESSING ? 'opacity-50 pointer-events-none blur-sm' : 'opacity-100'}`}>
                  <StyleSelector 
                    selectedPreset={selectedPreset} 
                    onSelectPreset={setSelectedPreset}
                    customPrompt={customPrompt}
                    onCustomPromptChange={setCustomPrompt}
                    disabled={status === GenerationStatus.PROCESSING}
                  />
                  
                  {/* Pro Tips Section */}
                  <div className="max-w-4xl mx-auto mt-8 p-4 rounded-xl bg-indigo-900/10 border border-indigo-500/20 flex items-start gap-4">
                     <Lightbulb className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                     <div>
                       <h4 className="text-indigo-200 text-sm font-bold mb-1">Tips for Best Results</h4>
                       <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                         <li>Use a clear, well-lit photo where the face is fully visible.</li>
                         <li>For custom prompts, be specific about lighting (e.g., "Neon lighting", "Sunset").</li>
                         <li>Use "Cleanup" or "Remove BG" for specific utility tasks.</li>
                       </ul>
                     </div>
                  </div>
                </section>
              )}

              {/* Action Button */}
              {selectedImage && status !== GenerationStatus.PROCESSING && (
                 <div className="sticky bottom-8 z-40 flex justify-center py-4 animate-in delay-200 pointer-events-none">
                   <button
                     onClick={handleGenerate}
                     disabled={!canGenerate}
                     className={`
                       pointer-events-auto
                       group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl
                       ${canGenerate 
                         ? 'bg-white text-black hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]' 
                         : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
                     `}
                   >
                     <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur opacity-20 group-hover:opacity-40 transition-opacity ${!canGenerate ? 'hidden' : ''}`}></div>
                     <Wand2 className={`w-5 h-5 ${canGenerate ? 'animate-pulse text-indigo-600' : ''}`} />
                     <span>{selectedPreset?.id === 'custom' ? 'Generate Custom Edit' : `Generate ${selectedPreset?.label}`}</span>
                   </button>
                 </div>
              )}
              
              {/* Processing State View */}
              {status === GenerationStatus.PROCESSING && (
                <section id="result" className="scroll-mt-24 animate-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                   <div className="w-full max-w-lg">
                      <ResultDisplay 
                        originalImage={selectedImage}
                        generatedImage={null} 
                        isProcessing={true}
                        onRetry={() => {}}
                      />
                   </div>
                </section>
              )}

              {/* Error State */}
              {status === GenerationStatus.ERROR && (
                 <section className="animate-in">
                    <ResultDisplay 
                        originalImage={selectedImage}
                        generatedImage={null} 
                        isProcessing={false}
                        error={error}
                        onRetry={handleRetry} 
                      />
                 </section>
              )}
            </>
          )}
        </div>

      </main>
      
      <footer className="w-full py-8 border-t border-white/5 mt-auto bg-black/20 backdrop-blur-lg z-10">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-xs font-medium">
              Astro Softwares &bull; Powered by Gemini 2.5 Flash Image
            </p>
         </div>
      </footer>
    </div>
  );
};

export default App;
