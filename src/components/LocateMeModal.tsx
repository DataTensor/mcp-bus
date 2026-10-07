import React, { useState } from 'react';
import { X, Navigation, MapPin, Check } from 'lucide-react';
import { OTHER_STOPS } from '../data/singaporeTransitData';
import { BusStop } from '../types/transit';

interface LocateMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStopCode: string;
  onSelectStop: (stop: BusStop) => void;
}

export const LocateMeModal: React.FC<LocateMeModalProps> = ({
  isOpen,
  onClose,
  currentStopCode,
  onSelectStop
}) => {
  const [customCode, setCustomCode] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCode.length === 5) {
      const match = OTHER_STOPS.find((s) => s.code === customCode);
      if (match) {
        onSelectStop(match);
        onClose();
      } else {
        // Construct simulated stop
        const newStop: BusStop = {
          code: customCode,
          name: `Bus Stop #${customCode}`,
          roadName: 'Singapore Transit Network',
          landmark: 'Commuter Corridor',
          distanceMeters: 50,
          walkMinutes: 1,
          heading: 'Heading towards City Centre',
          shelteredLinkway: true,
          coordinates: [1.2942, 103.8496],
          services: ['147', '190', '124', '166', '174']
        };
        onSelectStop(newStop);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-[#0e6245]">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Locate Nearest Bus Stop</h3>
              <p className="text-xs text-slate-500">Simulate or pinpoint your GPS coordinate</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom Code Input */}
        <form onSubmit={handleCustomSubmit} className="p-5 border-b border-slate-100 bg-white">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Enter Any 5-Digit LTA Bus Stop Code:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              maxLength={5}
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 04121, 08031, 09022"
              className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245]"
            />
            <button
              type="submit"
              disabled={customCode.length !== 5}
              className="px-4 py-2 rounded-xl bg-[#0e6245] hover:bg-[#0c533a] disabled:opacity-50 text-white text-xs font-bold transition-colors"
            >
              Go to Stop
            </button>
          </div>
        </form>

        {/* Preset Popular Stops */}
        <div className="p-5 space-y-2 max-h-80 overflow-y-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Nearby Singapore Corridors:
          </span>

          {OTHER_STOPS.map((stop) => {
            const isSelected = stop.code === currentStopCode;
            return (
              <button
                key={stop.code}
                onClick={() => {
                  onSelectStop(stop);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'border-[#0e6245] bg-emerald-50/60 ring-2 ring-[#0e6245]/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#0e6245]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                        {stop.code}
                      </span>
                      <span className="text-sm font-bold text-slate-900">{stop.name}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{stop.roadName} · {stop.landmark}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                      {stop.distanceMeters}m away ({stop.walkMinutes} min walk)
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#0e6245] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
