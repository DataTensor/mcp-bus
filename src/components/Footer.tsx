import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-10 mb-6 text-center text-xs text-slate-500 max-w-3xl mx-auto space-y-1 px-4 leading-relaxed">
      <p className="font-medium text-slate-600">
        SG BusWatch Live is an institutional wayfinding tool complying with Singapore Public Transport Standards.
      </p>
      <p className="text-[11px] text-slate-400">
        Real-time arrival timings are dynamic forecasts provided by LTA DataMall and may vary with traffic conditions.
      </p>
    </footer>
  );
};
