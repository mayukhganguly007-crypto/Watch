/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClockData, WatchFaceStyle } from '../types';

interface WatchFaceProps {
  clockData: ClockData;
  style: WatchFaceStyle;
  accentColor: string;
  showSeconds: boolean;
  isAmPm: boolean;
}

export const WatchFace: React.FC<WatchFaceProps> = ({ 
  clockData, 
  style, 
  accentColor, 
  showSeconds,
  isAmPm 
}) => {
  const { hours, minutes, seconds, ampm, dayName, day, month } = clockData;

  const renderMinimal = () => (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="flex items-baseline space-x-1">
        <span className="text-8xl md:text-9xl font-extralight tracking-tight">
          {hours}:{minutes}
        </span>
        {showSeconds && (
          <span className="text-2xl font-light opacity-40 ml-2" style={{ color: accentColor }}>
            {seconds}
          </span>
        )}
      </div>
      <div className="flex space-x-4 text-sm uppercase tracking-widest opacity-60">
        <span>{dayName}</span>
        <span>{month} {day}</span>
        {isAmPm && <span>{ampm}</span>}
      </div>
    </div>
  );

  const renderCyberpunk = () => (
    <div className="relative group">
      <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full" style={{ backgroundColor: `${accentColor}10` }}></div>
      <div className="relative flex flex-col items-center justify-center p-8 border-2 border-white/10 rounded-2xl backdrop-blur-sm" style={{ borderColor: `${accentColor}40` }}>
        <div className="flex items-center font-mono italic">
          <span className="text-7xl md:text-8xl font-black animate-pulse-glow" style={{ color: accentColor }}>
            {hours}
          </span>
          <span className="text-6xl font-light mx-2 opacity-50">:</span>
          <span className="text-7xl md:text-8xl font-black text-white">
            {minutes}
          </span>
        </div>
        <div className="w-full h-px bg-white/10 my-6"></div>
        <div className="flex justify-between w-full font-mono text-xs uppercase tracking-[0.3em]">
          <div className="flex flex-col">
            <span className="opacity-40">System.Time</span>
            <span style={{ color: accentColor }}>{dayName} // {day} {month}</span>
          </div>
          {showSeconds && (
            <div className="flex flex-col items-end">
              <span className="opacity-40">Sec</span>
              <span className="text-lg font-bold">{seconds}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSport = () => (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="text-sm font-bold uppercase tracking-tighter opacity-50 mb-1" style={{ color: accentColor }}>
        Ready for Action
      </div>
      <div className="flex items-start">
        <h1 className="text-9xl font-black tracking-tighter leading-none italic">
          {hours}<br/>{minutes}
        </h1>
        {showSeconds && (
          <div className="ml-2 font-mono text-2xl font-bold bg-white text-black px-1 mt-4">
            {seconds}
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-4 font-bold text-lg">
        <span className="border-b-4" style={{ borderColor: accentColor }}>{dayName}</span>
        <span>{day} {month}</span>
      </div>
    </div>
  );

  const renderAndroid = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
         <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[12rem] md:text-[18rem] font-medium leading-[0.8] tracking-tighter"
            style={{ color: accentColor }}
         >
            {hours}
         </motion.div>
         <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[12rem] md:text-[18rem] font-medium leading-[0.8] tracking-tighter text-white/90"
         >
            {minutes}
         </motion.div>
      </div>
      <div className="mt-8 text-2xl font-semibold opacity-70">
        {dayName}, {month} {day}
      </div>
    </div>
  );

  const renderClassic = () => (
     <div className="flex flex-col items-center justify-center text-center p-12 border border-white/5 rounded-full aspect-square w-[320px] md:w-[450px]">
        <div className="text-xl font-serif italic mb-2 opacity-50">Precision Chronometer</div>
        <div className="text-7xl md:text-8xl font-light tracking-[0.2em] mb-4">
            {hours}:{minutes}
        </div>
        <div className="flex items-center space-x-3 text-sm tracking-widest uppercase">
            <span>{dayName}</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
            <span>{month} {day}</span>
        </div>
        {showSeconds && (
            <motion.div 
                className="mt-6 text-3xl font-light tabular-nums"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                {seconds}
            </motion.div>
        )}
     </div>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={style}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="watch-face-container"
      >
        {style === 'minimal' && renderMinimal()}
        {style === 'cyberpunk' && renderCyberpunk()}
        {style === 'sport' && renderSport()}
        {style === 'android' && renderAndroid()}
        {style === 'classic' && renderClassic()}
      </motion.div>
    </AnimatePresence>
  );
};
