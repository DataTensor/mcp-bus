import React from 'react';
import { X, Sliders, Volume2, Clock, Check, ShieldCheck, Accessibility } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshInterval: number;
  onSetRefreshInterval: (interval: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  wheelchairPriority: boolean;
  onToggleWheelchairPriority: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  refreshInterval,
  onSetRefreshInterval,
  soundEnabled,
  onToggleSound,
  wheelchairPriority,
  onToggleWheelchairPriority
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-200/80 flex items-center justify-center text-slate-700">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Application Settings</h3>
              <p className="text-xs text-slate-500">Telemetry & Wayfinding Preferences</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Refresh Frequency */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>Live Telemetry Polling Rate:</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[10, 15, 30].map((sec) => (
                <button
                  key={sec}
                  onClick={() => onSetRefreshInterval(sec)}
                  className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                    refreshInterval === sec
                      ? 'border-[#0e6245] bg-[#0e6245] text-white shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {sec} seconds
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400">
              Default LTA DataMall refresh frequency is 15 seconds.
            </p>
          </div>

          {/* Sound Alert Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-slate-600" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">Arrival Audio Chime</span>
                <span className="text-[11px] text-slate-500">Play pleasant ping when bus is ARRIVING</span>
              </div>
            </div>

            <button
              onClick={onToggleSound}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                soundEnabled ? 'bg-[#0e6245]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  soundEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Wheelchair Accessible Priority */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2.5">
              <span className="text-base leading-none">♿</span>
              <div>
                <span className="text-xs font-bold text-slate-800 block">WAB Accessible Priority</span>
                <span className="text-[11px] text-slate-500">Highlight wheelchair accessible buses</span>
              </div>
            </div>

            <button
              onClick={onToggleWheelchairPriority}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                wheelchairPriority ? 'bg-[#0e6245]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  wheelchairPriority ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Institutional Compliance block */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 text-xs text-emerald-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Singapore Open Data License v1.0</span>
            </div>
            <p className="text-[11px] text-emerald-800/90 leading-relaxed">
              API feed configured to LTA DataMall BusArrivalv2 endpoint with standard 200ms latency buffering.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0e6245] hover:bg-[#0c533a] text-white font-bold text-xs"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
