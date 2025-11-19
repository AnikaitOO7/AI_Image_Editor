
import React, { useState } from 'react';
import { EDIT_PRESETS } from '../constants';
import { EditPreset, PresetCategory } from '../types';
import * as Icons from 'lucide-react';
import { Plus } from 'lucide-react';

interface StyleSelectorProps {
  selectedPreset: EditPreset | null;
  onSelectPreset: (preset: EditPreset) => void;
  customPrompt: string;
  onCustomPromptChange: (val: string) => void;
  disabled?: boolean;
}

const CATEGORIES: PresetCategory[] = ['Professional', 'Creative', 'Utility'];

const PROMPT_TAGS = [
  "Cinematic Lighting", "4K Resolution", "Studio Quality", "Vibrant Colors", 
  "Dark & Moody", "Soft Focus", "HDR", "Minimalist"
];

const StyleSelector: React.FC<StyleSelectorProps> = ({ 
  selectedPreset, 
  onSelectPreset, 
  customPrompt, 
  onCustomPromptChange,
  disabled 
}) => {
  
  const [activeTab, setActiveTab] = useState<PresetCategory>('Professional');

  const IconComponent = (name: string) => {
    const Icon = (Icons as any)[name] || Icons.Image;
    return <Icon className="w-5 h-5" />;
  };

  // Filter presets based on active tab
  const currentPresets = EDIT_PRESETS.filter(p => p.category === activeTab);

  // Handle custom preset specifically
  const customPreset = EDIT_PRESETS.find(p => p.id === 'custom');

  const addTag = (tag: string) => {
    const separator = customPrompt.length > 0 && !customPrompt.endsWith(' ') ? ', ' : '';
    onCustomPromptChange(`${customPrompt}${separator}${tag}`);
  };

  const handleCategoryChange = (category: PresetCategory) => {
    setActiveTab(category);
    // Automatically select the first preset in the new category to ensure we exit "Custom" mode
    // and show the correct grid to the user immediately.
    const firstPreset = EDIT_PRESETS.find(p => p.category === category);
    if (firstPreset) {
      onSelectPreset(firstPreset);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Icons.Palette className="w-5 h-5 text-indigo-400" />
          Select Style
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-900/60 rounded-xl mb-6 w-full sm:w-auto inline-flex border border-white/5 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            disabled={disabled}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === cat && selectedPreset?.id !== 'custom'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => {
            if (customPreset && !disabled) onSelectPreset(customPreset);
          }}
          disabled={disabled}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 justify-center whitespace-nowrap ${
            selectedPreset?.id === 'custom'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Icons.MessageSquare className="w-3.5 h-3.5" />
          Custom
        </button>
      </div>
      
      {/* Custom Input Area - Show if custom is selected */}
      {selectedPreset?.id === 'custom' ? (
        <div className="mb-8 animate-scale glass-panel rounded-2xl p-6">
           <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shrink-0">
                <Icons.Wand2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-lg font-medium text-white mb-2">Custom Magic Edit</h3>
                <p className="text-slate-400 text-sm mb-4">Describe exactly what you want Gemini to do.</p>
                <div className="relative">
                  <textarea
                    value={customPrompt}
                    onChange={(e) => onCustomPromptChange(e.target.value)}
                    placeholder='e.g., "Add a vintage retro filter", "Remove the person in the background", "Turn me into a zombie"'
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-32 transition-all"
                    disabled={disabled}
                    autoFocus
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                    Gemini 2.5 Flash
                  </div>
                </div>
                
                {/* Quick Tags */}
                <div className="mt-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Quick Enhancers</p>
                  <div className="flex flex-wrap gap-2">
                    {PROMPT_TAGS.map(tag => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        disabled={disabled}
                        className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-colors flex items-center gap-1 group"
                      >
                        <Plus className="w-3 h-3 text-indigo-400 group-hover:text-indigo-300" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
           </div>
        </div>
      ) : (
        /* Grid for standard presets */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in">
          {currentPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              disabled={disabled}
              className={`group relative overflow-hidden rounded-2xl p-1 text-left transition-all duration-300 hover:-translate-y-1
                ${selectedPreset?.id === preset.id 
                  ? 'ring-2 ring-indigo-500 shadow-xl shadow-indigo-500/20' 
                  : 'hover:shadow-lg hover:shadow-black/40'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity ${preset.color}`}></div>
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm -z-10"></div>
              
              <div className="p-4 z-10 relative h-full flex flex-col">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white bg-gradient-to-br ${preset.color} shadow-lg`}>
                  {IconComponent(preset.icon)}
                </div>
                <h3 className="font-semibold text-slate-100 mb-1">{preset.label}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-2 flex-1">{preset.description}</p>
                
                {selectedPreset?.id === preset.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,1)] animate-pulse"></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleSelector;
