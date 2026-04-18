/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClockData, WatchState } from './types';
import { WatchFace } from './components/WatchFace';
import { WidgetsArea } from './components/Widgets';
import { SettingsPanel } from './components/SettingsPanel';

const INITIAL_STATE: WatchState = {
  style: 'android',
  accentColor: '#3b82f6',
  isAmPm: true,
  showSeconds: true,
  widgets: [
    { id: '1', type: 'battery', active: true },
    { id: '2', type: 'weather', active: true },
    { id: '3', type: 'calendar', active: true },
    { id: '4', type: 'steps', active: false },
    { id: '5', type: 'heart', active: false },
  ]
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function App() {
  const [state, setState] = useState<WatchState>(INITIAL_STATE);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [clock, setClock] = useState<ClockData | null>(null);

  const updateClock = useCallback(() => {
    const now = new Date();
    
    let h = now.getHours();
    const ampm = h >= 12 ? 'PM' : 'AM';
    
    if (state.isAmPm) {
      h = h % 12;
      h = h ? h : 12; // 0 becomes 12
    }

    setClock({
      hours: h.toString().padStart(2, '0'),
      minutes: now.getMinutes().toString().padStart(2, '0'),
      seconds: now.getSeconds().toString().padStart(2, '0'),
      dayName: DAY_NAMES[now.getDay()],
      day: now.getDate().toString(),
      month: MONTH_NAMES[now.getMonth()],
      year: now.getFullYear().toString(),
      ampm
    });
  }, [state.isAmPm]);

  useEffect(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [updateClock]);

  if (!clock) return null;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden bg-black font-sans text-white">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 opacity-20 transition-colors duration-1000"
        style={{ 
          background: `radial-gradient(circle at center, ${state.accentColor}40 0%, transparent 70%)` 
        }}
      />

      {/* Top Controls */}
      <div className="z-10 w-full p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: state.accentColor }} />
           <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Aura OS // v2.0.4</span>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all active:scale-90"
        >
          <Settings size={20} className="opacity-80" />
        </button>
      </div>

      {/* Main Watch Content */}
      <main className="z-10 flex-1 flex flex-col items-center justify-center -mt-20">
        <WatchFace 
          clockData={clock} 
          style={state.style} 
          accentColor={state.accentColor}
          showSeconds={state.showSeconds}
          isAmPm={state.isAmPm}
        />
        <WidgetsArea widgets={state.widgets} accentColor={state.accentColor} />
      </main>

      {/* Bottom Visualizer / Decor */}
      <div className="z-10 w-full p-8 flex flex-col items-center">
         <div className="flex items-center space-x-1 opacity-20">
            {[...Array(24)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: [4, Math.random() * 20 + 4, 4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 rounded-full bg-white" 
              />
            ))}
         </div>
      </div>

      {/* Settings Drawer */}
      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsPanel 
            state={state} 
            onUpdate={setState} 
            onClose={() => setIsSettingsOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Overlay backdrop for settings */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSettingsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
