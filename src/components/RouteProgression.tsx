import React from 'react';
import { RouteStopProgression } from '../types/transit';
import { Activity, ShieldCheck, Bus, Wifi } from 'lucide-react';

interface RouteProgressionProps {
  serviceNo: string;
  progressionStops: RouteStopProgression[];
}

export const RouteProgression: React.FC<RouteProgressionProps> = ({
  serviceNo,
  progressionStops
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[#0e6245] text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
            {serviceNo}
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Live Route Progression
            </h3>
            <p className="text-xs text-slate-500">
              Real-time GPS vehicle ping on corridor line: Stamford → Clarke Quay
            </p>
          </div>
        </div>

        {/* Right Badges */}
        <div className="flex items-center gap-2 text-xs font-semibold self-start sm:self-auto">
          <div className="px-3 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700">
            Fleet: <span className="font-mono font-bold text-slate-900">Volvo B9TL / Wright Eclipse</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>On Schedule</span>
          </div>
        </div>
      </div>

      {/* Interactive Horizontal Route Stepper */}
      <div className="pt-6 pb-2 overflow-x-auto scrollbar-none">
        <div className="min-w-[680px] px-4">
          <div className="relative">
            {/* Background line connecting all stops */}
            <div className="absolute top-[18px] left-8 right-8 h-1 bg-slate-200 rounded-full -translate-y-1/2" />

            {/* Active completed line up to Stamford Court */}
            <div className="absolute top-[18px] left-8 w-[45%] h-1 bg-[#0e6245] rounded-full -translate-y-1/2 transition-all duration-700" />

            {/* Approaching Bus Marker on top of active stop */}
            <div className="absolute -top-7 left-[45%] -translate-x-1/2 flex flex-col items-center z-20">
              <div className="px-2.5 py-1 rounded-full bg-[#0e6245] text-white text-[10px] font-bold shadow-md flex items-center gap-1 animate-bounce">
                <Bus className="w-3 h-3" />
                <span>Approaching Stop</span>
              </div>
            </div>

            {/* Stepper nodes */}
            <div className="relative z-10 flex items-start justify-between">
              {progressionStops.map((stop, idx) => {
                const isPassed = stop.status === 'passed';
                const isCurrent = stop.status === 'current';
                const isNext = stop.status === 'next';

                return (
                  <div
                    key={stop.stopCode}
                    className="flex flex-col items-center text-center w-28 group"
                  >
                    {/* Circle Node */}
                    <div className="relative flex items-center justify-center mb-2">
                      {isCurrent ? (
                        <>
                          {/* Pulsing halo */}
                          <div className="w-9 h-9 rounded-full bg-emerald-500/25 animate-ping absolute" />
                          <div className="w-8 h-8 rounded-full bg-[#0e6245] text-white flex items-center justify-center shadow-md border-2 border-white">
                            <span className="w-2.5 h-2.5 rounded-full bg-white" />
                          </div>
                        </>
                      ) : isPassed ? (
                        <div className="w-5 h-5 rounded-full bg-[#0e6245] flex items-center justify-center border-2 border-white shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-slate-300 border-2 border-white" />
                      )}
                    </div>

                    {/* Stop Code */}
                    <span className="text-[10px] font-mono text-slate-400 font-medium">
                      {stop.stopCode}
                    </span>

                    {/* Stop Name */}
                    <span
                      className={`text-xs font-bold mt-0.5 max-w-[100px] line-clamp-2 leading-tight ${
                        isCurrent
                          ? 'text-[#0e6245] font-extrabold text-[13px]'
                          : 'text-slate-800'
                      }`}
                    >
                      {stop.stopName}
                    </span>

                    {/* Status Info / Timestamp */}
                    <span
                      className={`text-[10px] mt-1 font-semibold ${
                        isCurrent
                          ? 'px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold'
                          : isNext
                          ? 'text-[#0e6245]'
                          : 'text-slate-400'
                      }`}
                    >
                      {stop.timeInfo}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Telemetry Footer Bar */}
      <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
        <div className="flex items-center gap-2 font-medium">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>Feed protocol:</span>
          <span className="font-mono font-bold text-slate-800">LTA DataMall BusArrivalv2</span>
        </div>

        <div className="flex items-center gap-2 font-medium">
          <Wifi className="w-3.5 h-3.5 text-slate-500" />
          <span>Latency:</span>
          <span className="font-mono font-bold text-slate-800">214ms</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
          <span>Authorized Transit Partners:</span>
          <span className="font-semibold text-slate-700">SBS Transit</span>
          <span>•</span>
          <span className="font-semibold text-slate-700">SMRT</span>
          <span>•</span>
          <span className="font-semibold text-slate-700">Tower Transit</span>
          <span>•</span>
          <span className="font-semibold text-slate-700">Go-Ahead SG</span>
        </div>
      </div>
    </div>
  );
};
