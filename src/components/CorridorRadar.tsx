import React, { useState } from 'react';
import { Map, Compass, ShieldCheck, Maximize2, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import { BusStop } from '../types/transit';

interface CorridorRadarProps {
  currentStop: BusStop;
  onOpenMapModal?: () => void;
}

export const CorridorRadar: React.FC<CorridorRadarProps> = ({
  currentStop,
  onOpenMapModal
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapStyle, setMapStyle] = useState<'standard' | 'transit'>('standard');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-2">
          <Map className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800">Corridor Radar</h3>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-[11px] font-medium text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Live GPS Sync</span>
        </div>
      </div>

      {/* Map Graphic Container */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 bg-[#e8ece9] shadow-inner my-1 group">
        {/* SVG Vector Map Rendering Authentic Singapore Stamford / SMU Grid */}
        <svg
          viewBox="0 0 400 220"
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Base Background Land */}
          <rect width="400" height="220" fill="#f1f5f2" />

          {/* Fort Canning Greenery on the left */}
          <path
            d="M -20,120 Q 30,70 70,50 L 100,0 L -20,0 Z"
            fill="#dcfce7"
            stroke="#bbf7d0"
            strokeWidth="1.5"
          />
          <text x="18" y="35" fill="#15803d" fontSize="9" fontWeight="600" opacity="0.8">
            Fort Canning Park
          </text>

          {/* SMU Campus Zone on top right */}
          <rect x="150" y="25" width="120" height="45" rx="6" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          <text x="175" y="50" fill="#475569" fontSize="8" fontWeight="600">
            SMU Campus
          </text>

          {/* Road: Bras Basah Road */}
          <path d="M 120,0 L 400,100" stroke="#ffffff" strokeWidth="16" />
          <path d="M 120,0 L 400,100" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
          <text x="320" y="80" fill="#64748b" fontSize="7" fontWeight="500" transform="rotate(20 320 80)">
            Bras Basah Rd
          </text>

          {/* Road: Victoria Street */}
          <path d="M 280,0 L 330,220" stroke="#ffffff" strokeWidth="18" />
          <path d="M 280,0 L 330,220" stroke="#cbd5e1" strokeWidth="1" />
          <text x="305" y="140" fill="#64748b" fontSize="7" fontWeight="500" transform="rotate(76 305 140)">
            Victoria St
          </text>

          {/* Road: Stamford Road (Main Corridor) */}
          <path d="M 0,110 L 400,195" stroke="#fef08a" strokeWidth="22" opacity="0.9" />
          <path d="M 0,110 L 400,195" stroke="#eab308" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          <text x="90" y="140" fill="#78350f" fontSize="8" fontWeight="700" transform="rotate(12 90 140)">
            Stamford Rd
          </text>

          {/* Road: Hill Street / Armenian St crossway */}
          <path d="M 70,50 L 120,220" stroke="#ffffff" strokeWidth="14" />
          <text x="85" y="190" fill="#64748b" fontSize="7" fontWeight="500" transform="rotate(70 85 190)">
            Armenian St
          </text>

          {/* Sheltered Linkway line */}
          <path d="M 140,110 L 195,148 L 220,115" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />

          {/* Approaching Bus 147 Live GPS Position */}
          <g transform="translate(145, 137)">
            <circle r="7" fill="#0e6245" />
            <circle r="12" fill="#0e6245" opacity="0.25" className="animate-ping" />
            <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
              147
            </text>
          </g>

          {/* Stop Marker: 04121 You */}
          <g transform="translate(195, 148)">
            {/* Pulsing ring */}
            <circle r="16" fill="#1e293b" opacity="0.15" />
            {/* Center dot */}
            <circle r="5" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
            {/* Callout box */}
            <g transform="translate(-36, -26)">
              <rect width="72" height="19" rx="5" fill="#1e293b" filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.3))" />
              <circle cx="8" cy="9.5" r="3" fill="#22c55e" />
              <text x="16" y="13" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
                04121 You
              </text>
            </g>
          </g>

          {/* Nearby Bus Stop 04129 indicator */}
          <g transform="translate(290, 85)">
            <circle r="3.5" fill="#64748b" stroke="#ffffff" strokeWidth="1.5" />
            <text x="6" y="3" fill="#475569" fontSize="7" fontWeight="600">
              04129
            </text>
          </g>
        </svg>

        {/* Map overlay controls */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-lg border border-slate-200/80 shadow-xs">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
            className="p-1 hover:bg-slate-100 rounded text-slate-700"
            title="Zoom in"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="p-1 hover:bg-slate-100 rounded text-slate-700"
            title="Zoom out"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
        </div>

        {/* Bottom map overlay street bar */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs border border-slate-200/70 shadow-2xs">
          <span className="text-[11px] font-mono font-bold text-slate-700">
            Stamford Rd / Victoria St
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Live Traffic Flowing
          </span>
        </div>
      </div>

      {/* Footer Notes matching screenshot */}
      <div className="flex items-center justify-between gap-2 pt-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <Compass className="w-3.5 h-3.5 text-slate-400" />
          <span>{currentStop.heading}</span>
        </div>

        <div className="flex items-center gap-1 text-emerald-700 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Sheltered Linkway</span>
        </div>
      </div>
    </div>
  );
};
