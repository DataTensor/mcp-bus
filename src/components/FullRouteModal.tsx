import React, { useState } from 'react';
import { X, ArrowRightLeft, Bus, MapPin, Clock, ShieldCheck, Search } from 'lucide-react';
import { ALL_BUS_ROUTES_DATA } from '../data/singaporeTransitData';

interface FullRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceNo: string;
  onSelectStopCode: (stopCode: string) => void;
}

export const FullRouteModal: React.FC<FullRouteModalProps> = ({
  isOpen,
  onClose,
  serviceNo,
  onSelectStopCode
}) => {
  const [direction, setDirection] = useState<1 | 2>(1);
  const [searchStop, setSearchStop] = useState('');

  if (!isOpen) return null;

  const routeInfo =
    ALL_BUS_ROUTES_DATA.find((r) => r.serviceNo === serviceNo) ||
    ALL_BUS_ROUTES_DATA[0];

  // Sample sequence of key stops along Service 147
  const stopsDirection1 = [
    { code: '64009', name: 'Hougang Central Int', road: 'Hougang Central', min: 0, isKey: true },
    { code: '64109', name: 'Opp Hougang Plaza', road: 'Upper Serangoon Rd', min: 3 },
    { code: '64119', name: 'Blk 355', road: 'Hougang Ave 2', min: 6 },
    { code: '63029', name: 'Kovan Stn Exit C', road: 'Upper Serangoon Rd', min: 10, isKey: true },
    { code: '66011', name: 'Serangoon Stn Exit B', road: 'Upper Serangoon Rd', min: 16, isKey: true },
    { code: '60011', name: 'Potong Pasir Stn Exit B', road: 'Upper Serangoon Rd', min: 22 },
    { code: '60079', name: 'Boon Keng Stn Exit B', road: 'Serangoon Rd', min: 28 },
    { code: '08031', name: 'Dhoby Ghaut Stn Exit B', road: 'Penang Rd', min: 36, isKey: true },
    { code: '08069', name: 'Rendezvous Hotel', road: 'Bras Basah Rd', min: 38 },
    { code: '04121', name: 'Stamford Court', road: 'Stamford Rd', min: 40, isCurrent: true, isKey: true },
    { code: '04129', name: 'SMU Lee Kong Chian', road: 'Bras Basah Rd', min: 42 },
    { code: '04111', name: 'Capitol Piazza', road: 'North Bridge Rd', min: 44 },
    { code: '04239', name: 'Clarke Quay Stn', road: 'Eu Tong Sen St', min: 47, isKey: true },
    { code: '05022', name: 'Chinatown Stn Exit E', road: 'Eu Tong Sen St', min: 52, isKey: true },
    { code: '06171', name: 'Outram Park Stn', road: 'Outram Rd', min: 57, isKey: true },
    { code: '10041', name: 'Blk 126', road: 'Jalan Bukit Merah', min: 64 },
    { code: '11019', name: 'Queenstown Polyclinic', road: 'Queensway', min: 72 },
    { code: '11161', name: 'Commonwealth Stn', road: 'Commonwealth Ave', min: 79, isKey: true },
    { code: '11369', name: 'Buona Vista Stn Exit C', road: 'Commonwealth Ave West', min: 85, isKey: true },
    { code: '17011', name: 'Dover Stn Exit A', road: 'Commonwealth Ave West', min: 91 },
    { code: '17179', name: 'Clementi Int', road: 'Clementi Ave 3', min: 98, isKey: true }
  ];

  const stops = direction === 1 ? stopsDirection1 : [...stopsDirection1].reverse();
  const filteredStops = stops.filter(
    (s) =>
      s.name.toLowerCase().includes(searchStop.toLowerCase()) ||
      s.code.includes(searchStop) ||
      s.road.toLowerCase().includes(searchStop.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#1e293b] text-white flex flex-col items-center justify-center shadow-xs">
              <span className="text-[9px] font-bold tracking-wider text-slate-300">BUS</span>
              <span className="text-xl font-extrabold">{routeInfo.serviceNo}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Bus Route Schedule — Service {routeInfo.serviceNo}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {routeInfo.operator}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {direction === 1 ? `${routeInfo.origin} → ${routeInfo.destination}` : `${routeInfo.destination} → ${routeInfo.origin}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Route Stats Bar */}
        <div className="px-5 py-3 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-400">Total Distance:</span>{' '}
              <strong className="text-slate-800 font-mono">{routeInfo.distanceKm} km</strong>
            </div>
            <div>
              <span className="text-slate-400">Stops:</span>{' '}
              <strong className="text-slate-800 font-mono">{routeInfo.stopsCount} stops</strong>
            </div>
            <div>
              <span className="text-slate-400">Peak Freq:</span>{' '}
              <strong className="text-emerald-700 font-semibold">{routeInfo.frequencyPeak}</strong>
            </div>
          </div>

          {/* Direction toggle button */}
          <button
            onClick={() => setDirection(d => (d === 1 ? 2 : 1))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#0e6245]" />
            <span>Switch Direction</span>
          </button>
        </div>

        {/* Filter Input */}
        <div className="px-5 py-2.5 bg-slate-50/50 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchStop}
              onChange={(e) => setSearchStop(e.target.value)}
              placeholder="Search stop name, road, or 5-digit code..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0e6245]/20"
            />
          </div>
        </div>

        {/* Stops Itinerary List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          {filteredStops.map((s, idx) => (
            <div
              key={s.code}
              onClick={() => {
                onSelectStopCode(s.code);
                onClose();
              }}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                s.isCurrent
                  ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                  : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{s.name}</span>
                    {s.isCurrent && (
                      <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[10px] font-bold uppercase">
                        Current Stop
                      </span>
                    )}
                    {s.isKey && !s.isCurrent && (
                      <span className="px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 text-[10px] font-semibold">
                        Interchange
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <span className="font-mono text-slate-600">{s.code}</span> · {s.road}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-slate-600">
                  +{s.min} min
                </span>
                <div className="text-[10px] text-emerald-700 font-medium">Click to View</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>First Bus: {routeInfo.firstBus} · Last Bus: {routeInfo.lastBus}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
