/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Battery, Cloud, Footprints, Heart, Calendar } from 'lucide-react';
import { WidgetData } from '../types';

interface WidgetProps {
  widget: WidgetData;
  accentColor: string;
}

const WidgetItem: React.FC<WidgetProps> = ({ widget, accentColor }) => {
  const [value, setValue] = useState<string | number>('--');
  const [label, setLabel] = useState('');

  useEffect(() => {
    switch (widget.type) {
      case 'battery':
        setLabel('BAT');
        // If navigator.getBattery exists
        if ('getBattery' in navigator) {
          (navigator as any).getBattery().then((batt: any) => {
            setValue(`${Math.round(batt.level * 100)}%`);
          });
        } else {
          setValue('87%');
        }
        break;
      case 'weather':
        setLabel('NYC');
        setValue('24°C');
        break;
      case 'steps':
        setLabel('STEP');
        setValue('7,241');
        break;
      case 'heart':
        setLabel('BPM');
        setValue('72');
        break;
      case 'calendar':
        setLabel('TODAY');
        setValue(new Date().getDate());
        break;
    }
  }, [widget.type]);

  const getIcon = () => {
    switch (widget.type) {
      case 'battery': return <Battery size={14} />;
      case 'weather': return <Cloud size={14} />;
      case 'steps': return <Footprints size={14} />;
      case 'heart': return <Heart size={14} />;
      case 'calendar': return <Calendar size={14} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl p-3 min-w-[80px] backdrop-blur-md">
       <div className="opacity-50 mb-1" style={{ color: accentColor }}>
          {getIcon()}
       </div>
       <div className="text-sm font-bold tabular-nums">
          {value}
       </div>
       <div className="text-[10px] uppercase tracking-widest opacity-30 mt-0.5">
          {label}
       </div>
    </div>
  );
};

export const WidgetsArea: React.FC<{ widgets: WidgetData[], accentColor: string }> = ({ widgets, accentColor }) => {
  const activeWidgets = widgets.filter(w => w.active);
  
  if (activeWidgets.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-12 px-4">
      {activeWidgets.map(w => (
        <WidgetItem key={w.id} widget={w} accentColor={accentColor} />
      ))}
    </div>
  );
};
