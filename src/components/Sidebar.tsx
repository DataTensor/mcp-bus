import React from 'react';
import { Navigation, Star, Bus, Train, AlertTriangle, RotateCw, Sliders } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onQuickRefresh: () => void;
  isRefreshing: boolean;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onQuickRefresh,
  isRefreshing,
  onOpenSettings
}) => {
  const menuItems = [
    { id: 'nearby', label: 'Nearby Stops', icon: Navigation },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'routes', label: 'Route Search', icon: Bus },
    { id: 'mrt', label: 'MRT Interchange', icon: Train },
    { id: 'alerts', label: 'Live Alerts', icon: AlertTriangle },
  ];

  return (
    <aside className="w-56 shrink-0 flex flex-col justify-between py-4 pr-3 border-r border-slate-200/70 min-h-[calc(100vh-60px)]">
      <div className="space-y-4">
        {/* Top Active Status Card */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-800">Bus Arrival Hub</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium pl-4 mt-0.5">
            LTA DataMall Active
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-[#ecf4ff] text-[#1e40af] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-[#2563eb]' : 'text-slate-500'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Refresh Button */}
        <div className="pt-2">
          <button
            onClick={onQuickRefresh}
            disabled={isRefreshing}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <RotateCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
            <span>Quick Refresh</span>
          </button>
        </div>
      </div>

      {/* Bottom Settings Link */}
      <div className="pt-6 border-t border-slate-200/80">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all text-left"
        >
          <Sliders className="w-4 h-4 text-slate-500" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
