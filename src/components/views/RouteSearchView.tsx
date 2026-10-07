import React, { useState } from 'react';
import { Search, Bus, Clock, MapPin, ChevronRight, Filter } from 'lucide-react';
import { ALL_BUS_ROUTES_DATA } from '../../data/singaporeTransitData';

interface RouteSearchViewProps {
  onSelectService: (serviceNo: string) => void;
  onOpenFullRoute: (serviceNo: string) => void;
}

export const RouteSearchView: React.FC<RouteSearchViewProps> = ({
  onSelectService,
  onOpenFullRoute
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [operatorFilter, setOperatorFilter] = useState<'all' | 'SBS Transit' | 'SMRT Buses' | 'Tower Transit'>('all');

  const filteredRoutes = ALL_BUS_ROUTES_DATA.filter((route) => {
    const matchesSearch =
      route.serviceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.keyCorridors.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesOperator =
      operatorFilter === 'all' || route.operator === operatorFilter;

    return matchesSearch && matchesOperator;
  });

  return (
    <div className="space-y-6">
      {/* Title & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Singapore Bus Service Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Search all trunk, feeder, and express routes across Singapore's transit network
          </p>
        </div>

        {/* Search Input & Operator Pills */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by bus number (e.g. 147, 190) or area (e.g. Orchard, Chinatown)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20 focus:border-[#0e6245]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
            {(['all', 'SBS Transit', 'SMRT Buses', 'Tower Transit'] as const).map((op) => (
              <button
                key={op}
                onClick={() => setOperatorFilter(op)}
                className={`px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  operatorFilter === op
                    ? 'bg-[#0e6245] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {op === 'all' ? 'All Operators' : op}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoutes.map((route) => (
          <div
            key={route.serviceNo}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Bus header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#1e293b] text-white flex flex-col items-center justify-center shadow-xs">
                    <span className="text-[9px] font-bold tracking-wider text-slate-300">BUS</span>
                    <span className="text-2xl font-black">{route.serviceNo}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-slate-900">
                        Bus {route.serviceNo}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                        {route.operator}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {route.type}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-700 block">
                    Peak: <span className="text-emerald-700">{route.frequencyPeak}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Off-peak: {route.frequencyOffPeak}
                  </span>
                </div>
              </div>

              {/* Origin -> Destination */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">From</span>
                  <span className="font-bold text-slate-800">{route.origin}</span>
                </div>
                <div className="text-slate-300 font-bold px-2">→</div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">To</span>
                  <span className="font-bold text-slate-800">{route.destination}</span>
                </div>
              </div>

              {/* Key Corridors chips */}
              <div className="mt-3 flex flex-wrap gap-1">
                {route.keyCorridors.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {route.firstBus} – {route.lastBus}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenFullRoute(route.serviceNo)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  View Route
                </button>
                <button
                  onClick={() => onSelectService(route.serviceNo)}
                  className="px-3 py-1.5 rounded-lg bg-[#0e6245] hover:bg-[#0c533a] text-white text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Track Live</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
