import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { NearbyStopsView } from './components/views/NearbyStopsView';
import { RouteSearchView } from './components/views/RouteSearchView';
import { FavoritesView } from './components/views/FavoritesView';
import { MrtInterchangeView } from './components/views/MrtInterchangeView';
import { ServiceAlertsView } from './components/views/ServiceAlertsView';
import { FullRouteModal } from './components/FullRouteModal';
import { LocateMeModal } from './components/LocateMeModal';
import { SettingsModal } from './components/views/SettingsModal';
import {
  CURRENT_STOP,
  PRIMARY_SERVICE_147,
  OTHER_SERVICES_AT_STOP,
  SERVICE_147_ROUTE_PROGRESSION,
  OTHER_STOPS
} from './data/singaporeTransitData';
import { BusStop, BusServiceArrival } from './types/transit';
import { fetchBusArrivals } from './services/ltaApi';

export default function App() {
  // Navigation tabs: nearby (default), favorites, routes, mrt, alerts
  const [activeTab, setActiveTab] = useState<string>('nearby');

  // Transit Data state
  const [currentStop, setCurrentStop] = useState<BusStop>(CURRENT_STOP);
  const [primaryService, setPrimaryService] = useState<BusServiceArrival>(PRIMARY_SERVICE_147);
  const [otherServices, setOtherServices] = useState<BusServiceArrival[]>(OTHER_SERVICES_AT_STOP);
  const [progressionStops, setProgressionStops] = useState(SERVICE_147_ROUTE_PROGRESSION);

  // Filters & Selection
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusService, setSelectedBusService] = useState('147');
  const [activeFilterType, setActiveFilterType] = useState<'all' | 'favorites' | 'doubleDecker' | 'wheelchair'>('all');
  const [pinnedServices, setPinnedServices] = useState<string[]>(['147', '190']);

  // Refresh & Telemetry Polling
  const [refreshInterval, setRefreshInterval] = useState(15);
  const [countdownSeconds, setCountdownSeconds] = useState(14);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals
  const [isFullRouteModalOpen, setIsFullRouteModalOpen] = useState(false);
  const [isLocateModalOpen, setIsLocateModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // User Preferences
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wheelchairPriority, setWheelchairPriority] = useState(false);

  // Play Singapore Transit Chime
  const playTransitChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Note 1 (D5 ~ 587Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Note 2 (A5 ~ 880Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.12);
      gain2.gain.setValueAtTime(0.08, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.45);
    } catch {
      // AudioContext muted/unsupported
    }
  }, [soundEnabled]);

  // Telemetry refresh action querying /api/bus-arrival
  const handleRefreshFeed = useCallback(async () => {
    setIsRefreshing(true);
    playTransitChime();

    try {
      const { services } = await fetchBusArrivals(currentStop.code);
      if (services && services.length > 0) {
        const foundFocus = services.find((s) => s.serviceNo === selectedBusService) || services[0];
        setPrimaryService(foundFocus);

        const others = services.filter((s) => s.serviceNo !== foundFocus.serviceNo);
        if (others.length > 0) {
          setOtherServices(others);
        }
      }
    } catch {
      // Graceful fallback to existing simulated telemetry
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
        setCountdownSeconds(refreshInterval);
      }, 500);
    }
  }, [currentStop.code, selectedBusService, refreshInterval, playTransitChime]);


  // Countdown timer hook
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          handleRefreshFeed();
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [refreshInterval, handleRefreshFeed]);

  // Handle bus service selection
  const handleSelectBusService = (serviceNo: string) => {
    setSelectedBusService(serviceNo);
    setSearchQuery(serviceNo === '147' ? '' : `Bus ${serviceNo}`);

    // If selected service matches one of the other services, promote it to focus
    const match = otherServices.find((s) => s.serviceNo === serviceNo);
    if (match) {
      const oldPrimary = primaryService;
      setPrimaryService({
        ...match,
        isFocusRoute: true,
        nextBus3: {
          estimatedMinutes: (match.nextBus2?.estimatedMinutes || 10) + 9,
          scheduledTime: '16:02',
          load: 'Seats Available',
          busType: 'DD',
          wheelchairAccessible: true,
          monitored: true
        }
      });
      setOtherServices((prev) => [
        oldPrimary,
        ...prev.filter((s) => s.serviceNo !== serviceNo)
      ]);
    } else if (serviceNo === '147') {
      setPrimaryService(PRIMARY_SERVICE_147);
    }

    if (activeTab !== 'nearby') {
      setActiveTab('nearby');
    }
  };

  // Toggle pinning service
  const handleTogglePinService = (serviceNo: string) => {
    setPinnedServices((prev) =>
      prev.includes(serviceNo)
        ? prev.filter((s) => s !== serviceNo)
        : [...prev, serviceNo]
    );
  };

  // Handle stop selection from locator or MRT
  const handleSelectStop = (stop: BusStop) => {
    setCurrentStop(stop);
    handleRefreshFeed();
  };

  const handleSelectStopCode = (code: string) => {
    const found = OTHER_STOPS.find((s) => s.code === code);
    if (found) {
      setCurrentStop(found);
    } else {
      setCurrentStop({
        code,
        name: `Bus Stop #${code}`,
        roadName: 'Singapore Transit Network',
        landmark: 'Interchange Station',
        distanceMeters: 120,
        walkMinutes: 2,
        heading: 'Connecting Line',
        shelteredLinkway: true,
        coordinates: [1.2942, 103.8496],
        services: ['147', '190', '124', '166', '174']
      });
    }
    setActiveTab('nearby');
    handleRefreshFeed();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* Top Header Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        countdownSeconds={countdownSeconds}
        onManualRefresh={handleRefreshFeed}
        isRefreshing={isRefreshing}
        onOpenLocateModal={() => setIsLocateModalOpen(true)}
      />

      {/* Main Layout Body */}
      <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-6 py-5 flex-1 flex flex-col md:flex-row gap-6">
        {/* Left Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onQuickRefresh={handleRefreshFeed}
          isRefreshing={isRefreshing}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
        />

        {/* Primary Content View Container */}
        <main className="flex-1 min-w-0">
          {activeTab === 'nearby' && (
            <NearbyStopsView
              currentStop={currentStop}
              primaryService={primaryService}
              otherServices={otherServices}
              progressionStops={progressionStops}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedBusService={selectedBusService}
              onSelectBusService={handleSelectBusService}
              activeFilterType={activeFilterType}
              onToggleFilterType={(f) =>
                setActiveFilterType((prev) => (prev === f ? 'all' : f))
              }
              onClearSearch={() => {
                setSearchQuery('');
                setSelectedBusService('147');
                setPrimaryService(PRIMARY_SERVICE_147);
              }}
              onOpenLocateModal={() => setIsLocateModalOpen(true)}
              onOpenFullRoute={() => setIsFullRouteModalOpen(true)}
              isPinned={pinnedServices.includes(primaryService.serviceNo)}
              onTogglePin={() => handleTogglePinService(primaryService.serviceNo)}
            />
          )}

          {activeTab === 'routes' && (
            <RouteSearchView
              onSelectService={handleSelectBusService}
              onOpenFullRoute={(svc) => {
                setSelectedBusService(svc);
                setIsFullRouteModalOpen(true);
              }}
            />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              pinnedServices={pinnedServices}
              onTogglePin={handleTogglePinService}
              onSelectService={handleSelectBusService}
              currentStop={currentStop}
              onGoToNearby={() => setActiveTab('nearby')}
            />
          )}

          {activeTab === 'mrt' && (
            <MrtInterchangeView onSelectStopCode={handleSelectStopCode} />
          )}

          {activeTab === 'alerts' && <ServiceAlertsView />}

          {/* Institutional Compliance Footer */}
          <Footer />
        </main>
      </div>

      {/* Modals */}
      <FullRouteModal
        isOpen={isFullRouteModalOpen}
        onClose={() => setIsFullRouteModalOpen(false)}
        serviceNo={selectedBusService}
        onSelectStopCode={handleSelectStopCode}
      />

      <LocateMeModal
        isOpen={isLocateModalOpen}
        onClose={() => setIsLocateModalOpen(false)}
        currentStopCode={currentStop.code}
        onSelectStop={handleSelectStop}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        refreshInterval={refreshInterval}
        onSetRefreshInterval={setRefreshInterval}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((s) => !s)}
        wheelchairPriority={wheelchairPriority}
        onToggleWheelchairPriority={() => setWheelchairPriority((w) => !w)}
      />
    </div>
  );
}
