import React from 'react';
import { Search, X, Crosshair, Star, Bus } from 'lucide-react';

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBusService: string;
  onSelectBusService: (service: string) => void;
  activeFilterType: 'all' | 'favorites' | 'doubleDecker' | 'wheelchair';
  onToggleFilterType: (filter: 'all' | 'favorites' | 'doubleDecker' | 'wheelchair') => void;
  currentStopCode: string;
  onClearSearch: () => void;
  onOpenLocateModal: () => void;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedBusService,
  onSelectBusService,
  activeFilterType,
  onToggleFilterType,
  currentStopCode,
  onClearSearch,
  onOpenLocateModal
}) => {
  const quickSelectBuses = ['147', '190', '65', '857', '10', '166'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 space-y-3">
      {/* Top Search Input & GPS Corridor info */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input Container */}
        <div className="relative flex-1 flex items-center">
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by bus number or stop name..."
            className="w-full pl-9 pr-24 py-2 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245] transition-all"
          />

          {/* Right Stop Code badge & clear */}
          <div className="absolute right-2.5 flex items-center gap-1.5">
            <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-md bg-slate-200/80 text-slate-700">
              {currentStopCode}
            </span>
            {(searchQuery || selectedBusService) && (
              <button
                onClick={onClearSearch}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                title="Clear filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* GPS Locked pill */}
        <button
          onClick={onOpenLocateModal}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs font-medium text-emerald-900 hover:bg-emerald-100/60 transition-colors shrink-0 text-left"
          title="Click to change GPS location"
        >
          <Crosshair className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            <strong className="font-semibold text-emerald-800">GPS Locked:</strong> Stamford Rd corridor (±4m)
          </span>
        </button>
      </div>

      {/* Quick Select & Filter Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-slate-600">
        <span className="font-semibold text-slate-500 mr-1 text-[11px] uppercase tracking-wider">
          Quick Select:
        </span>

        {quickSelectBuses.map((busNo) => {
          const isSelected = selectedBusService === busNo;
          return (
            <button
              key={busNo}
              onClick={() => onSelectBusService(busNo)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-[#0e6245] text-white shadow-xs'
                  : 'bg-slate-100/90 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              Bus {busNo}
            </button>
          );
        })}

        <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />

        {/* Favorites filter */}
        <button
          onClick={() => onToggleFilterType('favorites')}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            activeFilterType === 'favorites'
              ? 'bg-[#0e6245] text-white font-semibold'
              : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Star className="w-3 h-3 text-amber-500 fill-amber-500/20" />
          <span>Favorites</span>
        </button>

        {/* Double Deckers filter */}
        <button
          onClick={() => onToggleFilterType('doubleDecker')}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            activeFilterType === 'doubleDecker'
              ? 'bg-[#0e6245] text-white font-semibold'
              : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Bus className="w-3 h-3 text-slate-500" />
          <span>Double Deckers</span>
        </button>

        {/* Wheelchair Accessible Bus (WAB) filter */}
        <button
          onClick={() => onToggleFilterType('wheelchair')}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            activeFilterType === 'wheelchair'
              ? 'bg-[#0e6245] text-white font-semibold'
              : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
          }`}
        >
          <span className="text-[13px] leading-none">♿</span>
          <span>Wheelchair WAB</span>
        </button>
      </div>
    </div>
  );
};
