/**
 * Singapore Public Transit Types
 * Compliant with Singapore LTA DataMall v2 specifications
 */

export type BusLoad = 'Seats Available' | 'Standing Available' | 'Limited Standing';

export type BusType = 'SD' | 'DD' | 'BD'; // Single Decker, Double Decker, Bendy

export interface BusArrivalTiming {
  estimatedMinutes: number; // 0 = ARRIVING / NOW
  scheduledTime: string; // e.g. "15:42"
  load: BusLoad;
  busType: BusType;
  wheelchairAccessible: boolean;
  monitored: boolean;
  distanceMetres?: number;
}

export interface BusServiceArrival {
  serviceNo: string;
  operator: 'SBS Transit' | 'SMRT Buses' | 'Tower Transit' | 'Go-Ahead Singapore';
  destinationName: string;
  routeDescription?: string;
  isLoop: boolean;
  nextBus: BusArrivalTiming;
  nextBus2?: BusArrivalTiming;
  nextBus3?: BusArrivalTiming;
  isPinned?: boolean;
  isFocusRoute?: boolean;
}

export interface RouteStopProgression {
  stopCode: string;
  stopName: string;
  roadName: string;
  status: 'passed' | 'current' | 'next' | 'upcoming';
  timeInfo: string; // e.g. "Passed 4 min ago", "YOU ARE HERE", "Next (+2 min)"
  coordinates: [number, number]; // [lat, lng]
}

export interface BusStop {
  code: string;
  name: string;
  roadName: string;
  landmark: string;
  distanceMeters: number;
  walkMinutes: number;
  heading: string;
  shelteredLinkway: boolean;
  coordinates: [number, number];
  services: string[];
}

export interface MRTStation {
  code: string;
  name: string;
  lines: ('NSL' | 'EWL' | 'CCL' | 'DTL' | 'TEL' | 'NEL')[];
  interchangeStops: string[]; // stop codes nearby
  walkingTimeMin: number;
}

export interface ServiceAlert {
  id: string;
  title: string;
  serviceNo?: string;
  line?: string;
  severity: 'normal' | 'moderate' | 'high';
  category: 'diversion' | 'delay' | 'event' | 'maintenance';
  message: string;
  updatedAt: string;
}
