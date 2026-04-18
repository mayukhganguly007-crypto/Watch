/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Palette, Layout, Settings2, Clock } from 'lucide-react';
import { WatchFaceStyle, WatchState, WidgetData } from '../types';

interface SettingsPanelProps {
  state: WatchState;
  onUpdate: (updater: (prev: WatchState) => WatchState) => void;
  onClose: () => void;
}

const STYLES: { id: WatchFaceStyle; name: string; desc: string }[] = [
  { id: 'minimal', name: 'Minimalist', desc: 'Clean, light, ultra-modern' },
  { id: 'android', name: 'Ambient OS', desc: 'Large font material concept' },
  { id: 'cyberpunk', name: 'Neon Grid', desc: 'High-tech glow aesthetics' },
  { id: 'sport', name: 'Athlete Pro', desc: 'Bold, slanted, high-energy' },
  { id: 'classic', name: 'Heritage', desc: 'Traditional chronometer feel' },
];

const ACCENTS = [
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#ffffff', // white
  '#00ff00', // neon
];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ state, onUpdate, onClose }) => {
  const toggleWidget = (id: string) => {
    onUpdate(prev => ({
      ...prev,
      widgets: prev.widgets.map(w => w.id === id ? { ...w, active: !w.active } : w)
    }));
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 h-[85dvh] bg-neutral-900 border-t border-white/10 rounded-t-[32px] overflow-hidden flex flex-col z-50 shadow-2xl"
    >
      <div className="flex items-center justify-between p-6 border-b border-white/5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Settings2 size={24} className="text-blue-500" />
          Watch Settings
        </h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10 pb-20">
        {/* Style Selection */}
        <section>
          <div className="flex items-center gap-2 mb-4 opacity-50 font-semibold uppercase text-xs tracking-widest">
            <Layout size={14} />
            Watch Face Style
          </div>
          <div className="space-y-3">
            {STYLES.map(style => (
              <button
                key={style.id}
                onClick={() => onUpdate(prev => ({ ...prev, style: style.id }))}
                className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between ${
                  state.style === style.id 
                    ? 'bg-blue-500/10 border-blue-500' 
                    : 'bg-white/5 border-transparent hover:border-white/20'
                }`}
              >
                <div>
                  <div className="font-bold">{style.name}</div>
                  <div className="text-sm opacity-50">{style.desc}</div>
                </div>
                {state.style === style.id && <Check size={20} className="text-blue-500" />}
              </button>
            ))}
          </div>
        </section>

        {/* Accent Color */}
        <section>
          <div className="flex items-center gap-2 mb-4 opacity-50 font-semibold uppercase text-xs tracking-widest">
            <Palette size={14} />
            Accent Color
          </div>
          <div className="flex flex-wrap gap-4">
            {ACCENTS.map(color => (
              <button
                key={color}
                onClick={() => onUpdate(prev => ({ ...prev, accentColor: color }))}
                className={`w-12 h-12 rounded-full border-4 transition-transform active:scale-95 flex items-center justify-center ${
                  state.accentColor === color ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              >
                 {state.accentColor === color && color === '#ffffff' && <Check size={18} className="text-black" />}
                 {state.accentColor === color && color !== '#ffffff' && <Check size={18} className="text-white" />}
              </button>
            ))}
          </div>
        </section>

        {/* Widgets */}
        <section>
           <div className="flex items-center gap-2 mb-4 opacity-50 font-semibold uppercase text-xs tracking-widest">
              <Layout size={14} />
              Active Widgets
           </div>
           <div className="grid grid-cols-2 gap-3">
              {state.widgets.map(widget => (
                <button
                  key={widget.id}
                  onClick={() => toggleWidget(widget.id)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    widget.active 
                    ? 'bg-blue-500/10 border-blue-500' 
                    : 'bg-white/5 border-transparent hover:border-white/10 opacity-50'
                  }`}
                >
                  <div className="text-sm font-bold uppercase">{widget.type}</div>
                  <div className="text-xs opacity-50">{widget.active ? 'Visible' : 'Hidden'}</div>
                </button>
              ))}
           </div>
        </section>

        {/* Options */}
        <section>
           <div className="flex items-center gap-2 mb-4 opacity-50 font-semibold uppercase text-xs tracking-widest">
              <Clock size={14} />
              Display Options
           </div>
           <div className="space-y-2">
              <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer">
                 <span className="font-medium">12-Hour (AM/PM)</span>
                 <input 
                    type="checkbox" 
                    checked={state.isAmPm} 
                    onChange={(e) => onUpdate(prev => ({ ...prev, isAmPm: e.target.checked }))}
                    className="w-5 h-5 accent-blue-500" 
                 />
              </label>
              <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer">
                 <span className="font-medium">Show Seconds</span>
                 <input 
                    type="checkbox" 
                    checked={state.showSeconds} 
                    onChange={(e) => onUpdate(prev => ({ ...prev, showSeconds: e.target.checked }))}
                    className="w-5 h-5 accent-blue-500" 
                 />
              </label>
           </div>
        </section>
      </div>
    </motion.div>
  );
};
