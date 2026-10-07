import React from 'react';
import { Star, MapPin, Bus, Trash2, ChevronRight, Plus } from 'lucide-react';
import { BusStop, BusServiceArrival } from '../../types/transit';

interface FavoritesViewProps {
  pinnedServices: string[];
  onTogglePin: (serviceNo: string) => void;
  onSelectService: (serviceNo: string) => void;
  currentStop: BusStop;
  onGoToNearby: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  pinnedServices,
  onTogglePin,
  onSelectService,
  currentStop,
  onGoToNearby
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>Saved Bus Stops & Services</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pin your daily commuting stops and bus lines for instant 1-tap arrival tracking
          </p>
        </div>

        <button
          onClick={onGoToNearby}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0e6245] text-white text-xs font-semibold hover:bg-[#0c533a] self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Pin More from Nearby</span>
        </button>
      </div>

      {/* Pinned Bus Stops */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <span>Pinned Bus Stops</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-emerald-500/30 p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-[#1e293b] text-white font-mono text-sm font-bold">
                {currentStop.code}
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{currentStop.name}</h4>
                <p className="text-xs text-slate-500">{currentStop.roadName}</p>
              </div>
            </div>

            <button
              onClick={onGoToNearby}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0e6245] text-xs font-semibold transition-colors"
            >
              <span>View Live</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-[#1e293b] text-white font-mono text-sm font-bold">
                08031
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Dhoby Ghaut Stn Exit B</h4>
                <p className="text-xs text-slate-500">Penang Road</p>
              </div>
            </div>

            <button
              onClick={onGoToNearby}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              <span>View Live</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Pinned Bus Services */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Bus className="w-4 h-4 text-emerald-700" />
          <span>Pinned Bus Services</span>
        </h3>

        {pinnedServices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
            <Star className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No services pinned yet</p>
            <p className="text-xs text-slate-500">Click the star icon next to any bus service to pin it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedServices.map((svcNo) => (
              <div
                key={svcNo}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#1e293b] text-white flex flex-col items-center justify-center shadow-xs">
                    <span className="text-[9px] font-bold text-slate-300">BUS</span>
                    <span className="text-xl font-black">{svcNo}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Service {svcNo}</h4>
                    <p className="text-xs text-slate-500">Tracked at Stamford Court</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectService(svcNo)}
                    className="px-3 py-1.5 rounded-lg bg-[#0e6245] hover:bg-[#0c533a] text-white text-xs font-semibold transition-colors"
                  >
                    Track
                  </button>
                  <button
                    onClick={() => onTogglePin(svcNo)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
