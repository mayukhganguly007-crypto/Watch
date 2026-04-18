/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WatchFaceStyle = 'minimal' | 'sport' | 'cyberpunk' | 'classic' | 'android';

export interface WidgetData {
  id: string;
  type: 'battery' | 'weather' | 'steps' | 'heart' | 'calendar';
  active: boolean;
}

export interface WatchState {
  style: WatchFaceStyle;
  widgets: WidgetData[];
  accentColor: string;
  isAmPm: boolean;
  showSeconds: boolean;
}

export interface ClockData {
  hours: string;
  minutes: string;
  seconds: string;
  dayName: string;
  month: string;
  day: string;
  year: string;
  ampm: string;
}
