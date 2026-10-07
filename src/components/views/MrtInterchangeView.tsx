import React, { useState } from 'react';
import { Train, MapPin, Navigation, ChevronRight, CheckCircle2 } from 'lucide-react';
import { MRT_INTERCHANGES } from '../../data/singaporeTransitData';

interface MrtInterchangeViewProps {
  onSelectStopCode: (code: string) => void;
}

export const MrtInterchangeView: React.FC<MrtInterchangeViewProps> = ({
  onSelectStopCode
}) => {
  const [selectedLine, setSelectedLine] = useState<string>('all');

  const lineColors: Record<string, { bg: string; text: string; label: string }> = {
    NSL: { bg: 'bg-[#d42e12]', text: 'text-white', label: 'North-South Line' },
    EWL: { bg: 'bg-[#009530]', text: 'text-white', label: 'East-West Line' },
    CCL: { bg: 'bg-[#fa9e0d]', text: 'text-slate-900', label: 'Circle Line' },
    DTL: { bg: 'bg-[#005ec4]', text: 'text-white', label: 'Downtown Line' },
    NEL: { bg: 'bg-[#9016b2]', text: 'text-white', label: 'North-East Line' },
    TEL: { bg: 'bg-[#9d5b25]', text: 'text-white', label: 'Thomson-East Coast Line' }
  };

  const filteredInterchanges = MRT_INTERCHANGES.filter((stn) => {
    if (selectedLine === 'all') return true;
    return stn.lines.includes(selectedLine as any);
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Train className="w-5 h-5 text-emerald-700" />
            <span>Singapore MRT Interchanges & Connecting Bus Hubs</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Seamless multi-modal transit connections with real-time walking distances from train platforms to bus berths
          </p>
        </div>

        {/* Line filter chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs font-bold">
          <button
            onClick={() => setSelectedLine('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedLine === 'all'
                ? 'bg-[#1e293b] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Lines
          </button>
          {Object.entries(lineColors).map(([code, config]) => (
            <button
              key={code}
              onClick={() => setSelectedLine(code)}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                selectedLine === code
                  ? `${config.bg} ${config.text} ring-2 ring-slate-400 shadow-xs`
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{code}</span>
              <span className="text-[10px] font-normal opacity-85 hidden sm:inline">({config.label})</span>
            </button>
          ))}
        </div>
      </div>

      {/* MRT Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInterchanges.map((stn) => (
          <div
            key={stn.name}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 block mb-1 w-fit">
                    {stn.code}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900">{stn.name} MRT Station</h3>
                </div>

                <div className="flex flex-wrap gap-1 justify-end max-w-[140px]">
                  {stn.lines.map((l) => (
                    <span
                      key={l}
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${lineColors[l].bg} ${lineColors[l].text}`}
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/60 font-medium flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  Average transfer walk: <strong>{stn.walkingTimeMin} mins</strong> via sheltered linkways
                </span>
              </div>
            </div>

            {/* Connecting Bus Stops list */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Integrated Bus Stops:
              </span>
              <div className="flex flex-wrap gap-2">
                {stn.interchangeStops.map((stopCode) => (
                  <button
                    key={stopCode}
                    onClick={() => onSelectStopCode(stopCode)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 text-xs font-semibold text-slate-700 transition-all group"
                  >
                    <MapPin className="w-3 h-3 text-[#0e6245]" />
                    <span className="font-mono font-bold">{stopCode}</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-700" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
