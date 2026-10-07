import React from 'react';
import { BusStop, BusServiceArrival, RouteStopProgression } from '../../types/transit';
import { SearchAndFilterBar } from '../SearchAndFilterBar';
import { StopDetailsCard } from '../StopDetailsCard';
import { CorridorRadar } from '../CorridorRadar';
import { BusTelemetryCard } from '../BusTelemetryCard';
import { OtherServicesGrid } from '../OtherServicesGrid';
import { RouteProgression } from '../RouteProgression';

interface NearbyStopsViewProps {
  currentStop: BusStop;
  primaryService: BusServiceArrival;
  otherServices: BusServiceArrival[];
  progressionStops: RouteStopProgression[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedBusService: string;
  onSelectBusService: (svc: string) => void;
  activeFilterType: 'all' | 'favorites' | 'doubleDecker' | 'wheelchair';
  onToggleFilterType: (f: 'all' | 'favorites' | 'doubleDecker' | 'wheelchair') => void;
  onClearSearch: () => void;
  onOpenLocateModal: () => void;
  onOpenFullRoute: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

export const NearbyStopsView: React.FC<NearbyStopsViewProps> = ({
  currentStop,
  primaryService,
  otherServices,
  progressionStops,
  searchQuery,
  onSearchChange,
  selectedBusService,
  onSelectBusService,
  activeFilterType,
  onToggleFilterType,
  onClearSearch,
  onOpenLocateModal,
  onOpenFullRoute,
  isPinned,
  onTogglePin
}) => {
  // Filter other services based on activeFilterType and search
  const filteredOtherServices = otherServices.filter((svc) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchBus = svc.serviceNo.toLowerCase().includes(q);
      const matchDest = svc.destinationName.toLowerCase().includes(q);
      if (!matchBus && !matchDest) return false;
    }

    if (activeFilterType === 'doubleDecker') {
      return svc.nextBus.busType === 'DD';
    }
    if (activeFilterType === 'wheelchair') {
      return svc.nextBus.wheelchairAccessible;
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Search & Quick Filters Bar */}
      <SearchAndFilterBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedBusService={selectedBusService}
        onSelectBusService={onSelectBusService}
        activeFilterType={activeFilterType}
        onToggleFilterType={onToggleFilterType}
        currentStopCode={currentStop.code}
        onClearSearch={onClearSearch}
        onOpenLocateModal={onOpenLocateModal}
      />

      {/* Top 2-Column Row: Stop Details (Left) + Corridor Radar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <StopDetailsCard
            currentStop={currentStop}
            primaryService={primaryService}
            onOpenFullRoute={onOpenFullRoute}
            isPinned={isPinned}
            onTogglePin={onTogglePin}
          />
        </div>

        <div className="lg:col-span-4">
          <CorridorRadar
            currentStop={currentStop}
            onOpenMapModal={onOpenLocateModal}
          />
        </div>
      </div>

      {/* Real-Time Arrival Telemetry (Service 147 Highlight) */}
      <BusTelemetryCard
        service={primaryService}
        stopCode={currentStop.code}
      />

      {/* Other Bus Services at Stamford Court (4) */}
      <OtherServicesGrid
        services={filteredOtherServices.slice(0, 4)}
        stopName={currentStop.name}
        onSelectService={onSelectBusService}
        selectedServiceNo={selectedBusService}
      />

      {/* Live Route Progression */}
      <RouteProgression
        serviceNo={primaryService.serviceNo}
        progressionStops={progressionStops}
      />
    </div>
  );
};
