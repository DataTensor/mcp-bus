import React from 'react';
import { BusServiceArrival } from '../types/transit';

interface OtherServicesGridProps {
  services: BusServiceArrival[];
  stopName: string;
  onSelectService: (serviceNo: string) => void;
  selectedServiceNo: string;
}

export const OtherServicesGrid: React.FC<OtherServicesGridProps> = ({
  services,
  stopName,
  onSelectService,
  selectedServiceNo
}) => {
  return (
    <div className="space-y-3">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">
          Other Bus Services at {stopName} ({services.length})
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          Click any service to view full route progression
        </span>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {services.map((svc) => {
          const isSelected = selectedServiceNo === svc.serviceNo;
          const nextLoad = svc.nextBus.load;
          const nextColor =
            nextLoad === 'Seats Available'
              ? 'text-emerald-700 bg-emerald-500'
              : nextLoad === 'Standing Available'
              ? 'text-amber-700 bg-amber-500'
              : 'text-rose-700 bg-rose-600';

          return (
            <div
              key={svc.serviceNo}
              onClick={() => onSelectService(svc.serviceNo)}
              className={`bg-white rounded-2xl border p-4 shadow-xs flex items-center justify-between gap-3 cursor-pointer transition-all hover:shadow-md hover:border-slate-300 ${
                isSelected
                  ? 'border-[#0e6245] ring-2 ring-[#0e6245]/20 bg-emerald-50/20'
                  : 'border-slate-200/90'
              }`}
            >
              {/* Left: Badge + details */}
              <div className="flex items-center gap-3">
                <div className="w-13 h-13 rounded-xl bg-[#1e293b] text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span className="text-[9px] font-bold tracking-wider text-slate-300 leading-none">
                    BUS
                  </span>
                  <span className="text-xl font-extrabold leading-tight">
                    {svc.serviceNo}
                  </span>
                </div>

                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Bus {svc.serviceNo}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    To {svc.destinationName}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {svc.operator}
                  </div>
                </div>
              </div>

              {/* Right: Arrival times & Capacity indicators */}
              <div className="flex items-center gap-4 text-right">
                {/* 1st Arrival */}
                <div>
                  <div className="text-lg font-black text-slate-900 leading-tight">
                    {svc.nextBus.estimatedMinutes === 0 ? 'Arr' : `${svc.nextBus.estimatedMinutes} min`}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 flex items-center justify-end gap-1 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${nextColor.split(' ')[1]}`} />
                    <span>{svc.nextBus.busType}</span>
                    <span>•</span>
                    <span className={nextColor.split(' ')[0]}>
                      {nextLoad === 'Seats Available' ? 'Seats' : nextLoad === 'Standing Available' ? 'Standing' : 'Limited'}
                    </span>
                  </div>
                </div>

                {/* Vertical Divider */}
                {svc.nextBus2 && (
                  <div className="h-8 w-px bg-slate-200" />
                )}

                {/* 2nd Arrival */}
                {svc.nextBus2 && (
                  <div>
                    <div className="text-lg font-bold text-slate-700 leading-tight">
                      {svc.nextBus2.estimatedMinutes} m
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 flex items-center justify-end gap-1 mt-0.5">
                      <span>{svc.nextBus2.busType}</span>
                      <span>•</span>
                      <span>{svc.nextBus2.load === 'Seats Available' ? 'Seats' : 'Standing'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
