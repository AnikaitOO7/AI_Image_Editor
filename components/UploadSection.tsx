import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface UploadSectionProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelect, selectedImage, onClear }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update preview when file changes
  React.useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedImage]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    if (file.type.startsWith("image/")) {
      onImageSelect(file);
    } else {
      alert("Please select an image file.");
    }
  };

  const triggerInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      {!selectedImage ? (
        <div
          className={`relative flex flex-col items-center justify-center w-full h-64 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer group
            ${dragActive 
              ? 'border-indigo-500 bg-indigo-500/10' 
              : 'border-slate-700 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800/50'
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={triggerInput}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleChange}
            accept="image/*"
          />
          <div className="bg-slate-800 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <Upload className={`w-8 h-8 ${dragActive ? 'text-indigo-400' : 'text-slate-400'}`} />
          </div>
          <p className="text-lg font-semibold text-slate-200 mb-1">Upload a selfie</p>
          <p className="text-sm text-slate-500">Click or drag & drop to upload</p>
          <p className="text-xs text-slate-600 mt-4">Supports JPG, PNG</p>
        </div>
      ) : (
        <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden border border-slate-700 bg-black group">
          <img 
            src={previewUrl || ''} 
            alt="Preview" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <button 
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="bg-red-500/80 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium backdrop-blur-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <X className="w-4 h-4" /> Change Photo
            </button>
          </div>
          <div className="absolute top-4 right-4 bg-slate-900/80 text-white text-xs px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md">
            Original
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
