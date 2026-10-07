import React from 'react';
import { MapPin, Navigation, Route, Star } from 'lucide-react';
import { BusStop, BusServiceArrival } from '../types/transit';

interface StopDetailsCardProps {
  currentStop: BusStop;
  primaryService: BusServiceArrival;
  onOpenFullRoute: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

export const StopDetailsCard: React.FC<StopDetailsCardProps> = ({
  currentStop,
  primaryService,
  onOpenFullRoute,
  isPinned,
  onTogglePin
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between relative overflow-hidden">
      {/* Top Location Info */}
      <div className="space-y-2.5">
        {/* Badges line: NEAREST STOP + distance */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0e6245] text-white text-[11px] font-bold tracking-wide uppercase">
              <MapPin className="w-3 h-3 fill-white" />
              Nearest Stop
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {currentStop.roadName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold">
            <Navigation className="w-3 h-3 text-emerald-600" />
            <span>
              {currentStop.distanceMeters}m away ({currentStop.walkMinutes} min walk)
            </span>
          </div>
        </div>

        {/* Stop Code & Stop Name Title */}
        <div className="flex flex-wrap items-baseline gap-2.5 pt-1">
          <span className="px-2.5 py-1 rounded-lg bg-[#1e293b] text-white font-mono text-sm font-bold tracking-wider shadow-xs">
            {currentStop.code}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {currentStop.name}
          </h2>
          <span className="text-sm font-medium text-slate-500 hidden sm:inline">
            | {currentStop.landmark}
          </span>
        </div>

        {/* Location subtitle / SMU context */}
        <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
          Next to Singapore Management University School of Accountancy & Stamford Court Office Suites.
        </p>
      </div>

      {/* Selected Bus Service Row */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* BUS 147 Dark Badge */}
          <div className="w-13 h-13 rounded-xl bg-[#1e293b] text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
            <span className="text-[10px] font-bold tracking-wider text-slate-300 leading-none">
              BUS
            </span>
            <span className="text-xl font-extrabold leading-tight tracking-tight">
              {primaryService.serviceNo}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                Service {primaryService.serviceNo}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200/60 text-sky-800 text-[11px] font-semibold">
                {primaryService.operator}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              <span className="font-semibold text-slate-800">To:</span> {primaryService.destinationName}{' '}
              <span className="text-slate-400">·</span>{' '}
              <span className="text-slate-500">{primaryService.routeDescription}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Full Route & Pinned */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            onClick={onOpenFullRoute}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all active:scale-95"
          >
            <Route className="w-3.5 h-3.5 text-[#0e6245]" />
            <span>Full Route</span>
          </button>

          <button
            onClick={onTogglePin}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold shadow-2xs transition-all active:scale-95 ${
              isPinned
                ? 'border-amber-200 bg-amber-50 text-amber-800'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
            }`}
          >
            <Star
              className={`w-3.5 h-3.5 ${
                isPinned ? 'text-amber-500 fill-amber-500' : 'text-slate-400'
              }`}
            />
            <span>{isPinned ? 'Pinned' : 'Pin Service'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
