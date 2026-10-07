import React from 'react';
import { Bus, Radio, Info } from 'lucide-react';
import { BusServiceArrival } from '../types/transit';

interface BusTelemetryCardProps {
  service: BusServiceArrival;
  stopCode: string;
}

export const BusTelemetryCard: React.FC<BusTelemetryCardProps> = ({
  service,
  stopCode
}) => {
  return (
    <div className="space-y-2.5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-100/80 flex items-center justify-center text-[#0e6245]">
            <Radio className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Real-Time Arrival Telemetry
            </h3>
            <p className="text-xs text-slate-500">
              Official timings queried from LTA DataMall v2 • Stop {stopCode}
            </p>
          </div>
        </div>

        {/* Capacity Legend on right */}
        <div className="flex items-center gap-3 text-xs font-medium text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs self-start sm:self-auto">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
            Capacity:
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-700">Seats Avail</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-slate-700">Standing Avail</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            <span className="text-slate-700">Limited Standing</span>
          </span>
        </div>
      </div>

      {/* Main Focus Service Card (Service 147) */}
      <div className="bg-white rounded-2xl border-2 border-emerald-500/30 p-4 sm:p-5 shadow-xs transition-all hover:border-emerald-500/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Left info column: Bus 147 details */}
          <div className="lg:col-span-4 flex items-center gap-3.5">
            {/* Large dark badge: BUS 147 */}
            <div className="w-16 h-16 rounded-xl bg-[#1e293b] text-white flex flex-col items-center justify-center shrink-0 shadow-sm border border-slate-700">
              <span className="text-[11px] font-bold tracking-wider text-slate-300 leading-none">
                BUS
              </span>
              <span className="text-2xl font-black tracking-tight leading-tight">
                {service.serviceNo}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 tracking-tight">
                  Service {service.serviceNo}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wide uppercase">
                  Focus Route
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-800">
                To <span className="text-slate-900">{service.destinationName}</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Operated by {service.operator} <span className="text-slate-300">•</span>{' '}
                {service.isLoop ? 'Loop Service' : 'Direct Service'}
              </div>
            </div>
          </div>

          {/* Right column: 3 arrival telemetry boxes */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Box 1: NEXT BUS (ARRIVING / NOW) */}
            <div className="rounded-xl border border-emerald-400 bg-emerald-50/40 p-3.5 flex flex-col justify-between shadow-2xs relative overflow-hidden group">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  Next Bus
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-wider animate-pulse flex items-center gap-1">
                  <span>»</span> NOW
                </span>
              </div>

              <div className="py-2">
                <div className="text-2xl font-black text-emerald-700 tracking-tight flex items-baseline gap-1">
                  ARRIVING
                </div>
              </div>

              {/* Badges footer */}
              <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold font-mono">
                  {service.nextBus.busType}
                </span>
                <span className="flex items-center gap-1 text-emerald-800 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Seats Avail
                </span>
                <span className="text-slate-600 text-sm" title="Wheelchair Accessible Bus (WAB)">
                  ♿
                </span>
              </div>
            </div>

            {/* Box 2: 2ND BUS (7 mins) */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  2nd Bus
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-medium">
                  {service.nextBus2?.scheduledTime || '15:42'}
                </span>
              </div>

              <div className="py-2">
                <div className="text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                  {service.nextBus2?.estimatedMinutes || 7}
                  <span className="text-sm font-bold text-slate-500 tracking-normal">
                    mins
                  </span>
                </div>
              </div>

              {/* Badges footer */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 text-[10px] font-bold font-mono">
                  {service.nextBus2?.busType || 'SD'}
                </span>
                <span className="flex items-center gap-1 text-amber-800 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Standing Avail
                </span>
                <span className="text-slate-600 text-sm" title="Wheelchair Accessible Bus (WAB)">
                  ♿
                </span>
              </div>
            </div>

            {/* Box 3: 3RD BUS (16 mins) */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  3rd Bus
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-medium">
                  {service.nextBus3?.scheduledTime || '15:51'}
                </span>
              </div>

              <div className="py-2">
                <div className="text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                  {service.nextBus3?.estimatedMinutes || 16}
                  <span className="text-sm font-bold text-slate-500 tracking-normal">
                    mins
                  </span>
                </div>
              </div>

              {/* Badges footer */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 text-[10px] font-bold font-mono">
                  {service.nextBus3?.busType || 'DD'}
                </span>
                <span className="flex items-center gap-1 text-emerald-800 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Seats Avail
                </span>
                <span className="text-slate-600 text-sm" title="Wheelchair Accessible Bus (WAB)">
                  ♿
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
