import React from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, Clock, Radio, Info } from 'lucide-react';
import { SERVICE_ALERTS } from '../../data/singaporeTransitData';

export const ServiceAlertsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Singapore Transit Service Alerts & Advisories</span>
          </h2>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Real-Time Feed</span>
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Official real-time advisories queried from LTA DataMall, Singapore Traffic Police, and public bus operators
        </p>
      </div>

      {/* Network Status Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-950">Normal Public Transit Operations Islandwide</h3>
            <p className="text-xs text-emerald-800">
              Bus frequencies running on standard peak schedule. No major line breakdowns reported.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
          99.8% Reliability
        </span>
      </div>

      {/* Alerts List */}
      <div className="space-y-3.5">
        {SERVICE_ALERTS.map((alert) => {
          const isModerate = alert.severity === 'moderate';
          const isHigh = alert.severity === 'high';

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all space-y-2.5 ${
                isHigh
                  ? 'border-rose-400 bg-rose-50/20'
                  : isModerate
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-slate-200/90'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isModerate
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {alert.serviceNo ? alert.serviceNo : '!'}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      Updated {alert.updatedAt}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    isModerate
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {alert.category}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                {alert.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
