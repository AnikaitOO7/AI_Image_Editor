
import { EditPreset } from './types';

export const EDIT_PRESETS: EditPreset[] = [
  // Professional Headshots
  {
    id: 'corporate',
    label: 'Corporate',
    description: 'Suit, grey backdrop, studio lighting.',
    prompt: 'Transform into a professional corporate executive headshot. Wear a dark suit. Clean grey studio background. Professional lighting.',
    icon: 'Briefcase',
    color: 'from-slate-700 to-slate-900',
    category: 'Professional'
  },
  {
    id: 'tech',
    label: 'Tech Modern',
    description: 'Smart casual, modern office blur.',
    prompt: 'Modern tech industry look. Smart casual attire (polo or high quality t-shirt). Background: blurred modern open-plan office with glass.',
    icon: 'Cpu',
    color: 'from-blue-600 to-indigo-900',
    category: 'Professional'
  },
  {
    id: 'outdoor',
    label: 'Outdoor',
    description: 'Natural light, park bokeh.',
    prompt: 'Outdoor portrait with golden hour natural lighting. Background: blurred park or city street with nice bokeh. Smart casual outdoor clothing.',
    icon: 'Sun',
    color: 'from-amber-500 to-orange-700',
    category: 'Professional'
  },
  {
    id: 'bw-studio',
    label: 'B&W Studio',
    description: 'High contrast, artistic monochrome.',
    prompt: 'Professional black and white studio portrait. High contrast, dramatic lighting (Rembrandt style), sharp focus, black background.',
    icon: 'Aperture',
    color: 'from-gray-800 to-black',
    category: 'Professional'
  },
  {
    id: 'soft-glam',
    label: 'Soft Glam',
    description: 'Warm, glowing, beauty lighting.',
    prompt: 'Soft glam portrait photography. Warm golden lighting, soft focus skin, beauty retouching style, elegant and flattering.',
    icon: 'Sparkles',
    color: 'from-rose-400 to-orange-300',
    category: 'Professional'
  },

  // Utility
  {
    id: 'remove-bg',
    label: 'Remove BG',
    description: 'Isolate subject on white background.',
    prompt: 'Remove the background completely. Isolate the main subject on a solid pure white background (#FFFFFF). Do not change the person.',
    icon: 'Eraser',
    color: 'from-rose-500 to-pink-700',
    category: 'Utility'
  },
  {
    id: 'cleanup',
    label: 'Cleanup',
    description: 'Remove people/objects in background.',
    prompt: 'Remove all people and distracting objects from the background. Keep the main subject exactly as is. Make the background clean and uncluttered.',
    icon: 'Wand2',
    color: 'from-emerald-500 to-teal-700',
    category: 'Utility'
  },

  // Creative
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    description: 'Neon lights, futuristic aesthetic.',
    prompt: 'Cyberpunk style. Neon blue and pink lighting. Futuristic city background. High contrast, cinematic look.',
    icon: 'Zap',
    color: 'from-violet-600 to-fuchsia-800',
    category: 'Creative'
  },
  {
    id: 'cinematic',
    label: 'Cinematic',
    description: 'Movie scene aesthetic, teal & orange.',
    prompt: 'Cinematic movie still. Teal and orange color grading, dramatic lighting, shallow depth of field, anamorphic lens look.',
    icon: 'Film',
    color: 'from-cyan-700 to-orange-600',
    category: 'Creative'
  },
  {
    id: 'anime',
    label: 'Anime Style',
    description: 'High quality Japanese anime art.',
    prompt: 'Transform the person into a high-quality anime character. Vibrant colors, clean lines, anime art style, maintaining the person\'s key features.',
    icon: 'Ghost', 
    color: 'from-pink-400 to-purple-500',
    category: 'Creative'
  },
  {
    id: 'oil-painting',
    label: 'Oil Painting',
    description: 'Classic textured canvas art.',
    prompt: 'Transform the image into a classic oil painting. Visible brush strokes, rich textures, artistic flair, museum quality.',
    icon: 'Palette',
    color: 'from-yellow-700 to-orange-800',
    category: 'Creative'
  },
  {
    id: 'superhero',
    label: 'Superhero',
    description: 'Epic comic book hero style.',
    prompt: 'Transform the person into a cinematic superhero. Dramatic lighting, heroic pose, subtle glowing effects, comic book movie aesthetic.',
    icon: 'Shield',
    color: 'from-red-600 to-blue-800',
    category: 'Creative'
  },
  {
    id: 'clay',
    label: 'Claymation',
    description: '3D clay character style.',
    prompt: 'Transform the person into a cute 3D claymation style character. Plasticine texture, soft lighting, stop-motion aesthetic.',
    icon: 'Box',
    color: 'from-orange-500 to-red-600',
    category: 'Creative'
  },
  {
    id: 'sketch',
    label: 'Pencil Sketch',
    description: 'Artistic charcoal/pencil drawing.',
    prompt: 'Create a high-quality artistic pencil sketch of this person. Charcoal textures, shading, white paper background.',
    icon: 'PenTool',
    color: 'from-gray-500 to-gray-800',
    category: 'Creative'
  },
  {
    id: 'retro',
    label: 'Retro 90s',
    description: 'Vintage film grain, flash photography.',
    prompt: '90s vintage aesthetics. Direct flash photography, film grain, retro fashion style. Nostalgic vibe.',
    icon: 'Camera',
    color: 'from-yellow-600 to-yellow-900',
    category: 'Creative'
  },

  // Custom (Placeholder for UI logic, prompt handled separately)
  {
    id: 'custom',
    label: 'Custom Edit',
    description: 'Describe your own specific changes.',
    prompt: '', 
    icon: 'MessageSquare',
    color: 'from-indigo-600 to-purple-600',
    category: 'Custom'
  }
];
