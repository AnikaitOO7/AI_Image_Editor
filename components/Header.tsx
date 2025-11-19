
import React from 'react';
import { Sparkles, Rocket } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex items-center justify-between border-b border-white/5 bg-slate-950/30 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
          <Rocket className="w-5 h-5 text-white fill-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Astro <span className="text-indigo-400">Softwares</span>
          </h1>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">AI Image Editor</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 transition-colors py-2 px-4 rounded-full border border-white/10">
        <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
        <span>Edit, Remix, Generate</span>
      </div>
    </header>
  );
};

export default Header;
