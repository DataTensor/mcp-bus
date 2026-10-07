import React from 'react';
import { Bus, Star, Train, AlertTriangle, RotateCw, Navigation } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  countdownSeconds: number;
  onManualRefresh: () => void;
  isRefreshing: boolean;
  onOpenLocateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  countdownSeconds,
  onManualRefresh,
  isRefreshing,
  onOpenLocateModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] px-4 lg:px-6 py-2.5">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand + Status */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('nearby')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0e6245] flex items-center justify-center text-white shadow-sm group-hover:bg-[#0c533a] transition-colors">
              <Bus className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0f3d2e] font-sans">
              SG BusWatch <span className="text-[#0e6245]">Live</span>
            </span>
          </button>

          {/* LTA DataMall Active Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-xs font-medium text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>LTA DataMall Active</span>
          </div>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          <button
            onClick={() => onTabChange('nearby')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'nearby'
                ? 'text-[#0e6245] font-semibold border-b-2 border-[#0e6245] rounded-b-none pb-1'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Nearby Stops</span>
          </button>

          <button
            onClick={() => onTabChange('favorites')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'favorites'
                ? 'text-[#0e6245] font-semibold border-b-2 border-[#0e6245] rounded-b-none pb-1'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Favorites</span>
          </button>

          <button
            onClick={() => onTabChange('mrt')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'mrt'
                ? 'text-[#0e6245] font-semibold border-b-2 border-[#0e6245] rounded-b-none pb-1'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Train className="w-3.5 h-3.5" />
            <span>MRT & Lines</span>
          </button>

          <button
            onClick={() => onTabChange('alerts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'alerts'
                ? 'text-[#0e6245] font-semibold border-b-2 border-[#0e6245] rounded-b-none pb-1'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Service Alerts</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Refresh Feed button with countdown badge */}
          <button
            onClick={onManualRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20"
            title="Force refresh live bus arrival telemetry"
          >
            <RotateCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
            <span>Refresh Feed</span>
            <span className="px-1.5 py-0.5 text-[11px] font-mono font-medium rounded bg-slate-100 text-slate-600">
              {countdownSeconds}s
            </span>
          </button>

          {/* Locate Me button */}
          <button
            onClick={onOpenLocateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e6245] hover:bg-[#0c533a] text-white text-xs font-semibold shadow-xs transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0e6245]/30"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-200" />
            <span>Locate Me</span>
          </button>
        </div>
      </div>
    </header>
  );
};
