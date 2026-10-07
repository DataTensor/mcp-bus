import { BusStop, BusServiceArrival, RouteStopProgression, MRTStation, ServiceAlert } from '../types/transit';

export const CURRENT_STOP: BusStop = {
  code: '04121',
  name: 'Stamford Court',
  roadName: 'Along Stamford Road',
  landmark: 'Opposite SMU Campus / Central Area',
  distanceMeters: 75,
  walkMinutes: 1,
  heading: 'Heading West towards SMU',
  shelteredLinkway: true,
  coordinates: [1.2942, 103.8496],
  services: ['147', '190', '124', '166', '174', '7', '14', '16', '36', '77', '106', '111', '131', '162']
};

export const OTHER_STOPS: BusStop[] = [
  CURRENT_STOP,
  {
    code: '04129',
    name: 'SMU Lee Kong Chian Sch of Bus',
    roadName: 'Bras Basah Road',
    landmark: 'Adjacent to SMU Admin Building',
    distanceMeters: 160,
    walkMinutes: 2,
    heading: 'Heading East towards City Hall',
    shelteredLinkway: true,
    coordinates: [1.2965, 103.8505],
    services: ['7', '14', '16', '36', '77', '106', '111', '131', '167', '171', '857']
  },
  {
    code: '04111',
    name: 'Capitol Piazza / Opp Peninsula Plaza',
    roadName: 'North Bridge Road',
    landmark: 'Opposite St Andrew\'s Cathedral',
    distanceMeters: 280,
    walkMinutes: 4,
    heading: 'Heading South towards City Hall MRT',
    shelteredLinkway: true,
    coordinates: [1.2932, 103.8519],
    services: ['32', '51', '61', '63', '80', '145', '166', '174', '197', '851']
  },
  {
    code: '08031',
    name: 'Dhoby Ghaut Stn Exit B',
    roadName: 'Penang Road',
    landmark: 'Beside Park Mall / Plaza Singapura',
    distanceMeters: 450,
    walkMinutes: 6,
    heading: 'Heading West towards Somerset',
    shelteredLinkway: true,
    coordinates: [1.2988, 103.8458],
    services: ['7', '14', '16', '36', '65', '77', '106', '111', '124', '167', '174', '190']
  },
  {
    code: '01112',
    name: 'Bugis Stn Exit A',
    roadName: 'Victoria Street',
    landmark: 'Bugis Junction / National Library',
    distanceMeters: 620,
    walkMinutes: 8,
    heading: 'Heading North towards Lavender',
    shelteredLinkway: true,
    coordinates: [1.3006, 103.8561],
    services: ['2', '12', '33', '130', '133', '145', '197', '960', '980']
  },
  {
    code: '09022',
    name: 'Orchard Stn / Tangs',
    roadName: 'Orchard Boulevard',
    landmark: 'ION Orchard / Tang Plaza',
    distanceMeters: 1200,
    walkMinutes: 15,
    heading: 'Heading West along Orchard Shopping Belt',
    shelteredLinkway: true,
    coordinates: [1.3048, 103.8318],
    services: ['36', '77', '124', '143', '167', '174', '190', '518', '972']
  }
];

export const PRIMARY_SERVICE_147: BusServiceArrival = {
  serviceNo: '147',
  operator: 'SBS Transit',
  destinationName: 'Clementi Bus Interchange',
  routeDescription: 'via Chinatown & Buona Vista',
  isLoop: true,
  isPinned: true,
  isFocusRoute: true,
  nextBus: {
    estimatedMinutes: 0,
    scheduledTime: '15:35',
    load: 'Seats Available',
    busType: 'DD',
    wheelchairAccessible: true,
    monitored: true,
    distanceMetres: 45
  },
  nextBus2: {
    estimatedMinutes: 7,
    scheduledTime: '15:42',
    load: 'Standing Available',
    busType: 'SD',
    wheelchairAccessible: true,
    monitored: true,
    distanceMetres: 1650
  },
  nextBus3: {
    estimatedMinutes: 16,
    scheduledTime: '15:51',
    load: 'Seats Available',
    busType: 'DD',
    wheelchairAccessible: true,
    monitored: true,
    distanceMetres: 3820
  }
};

export const OTHER_SERVICES_AT_STOP: BusServiceArrival[] = [
  {
    serviceNo: '190',
    operator: 'SMRT Buses',
    destinationName: 'Choa Chu Kang Int',
    routeDescription: 'via Orchard Rd, Stevens Rd & BKE Express',
    isLoop: false,
    nextBus: {
      estimatedMinutes: 2,
      scheduledTime: '15:37',
      load: 'Limited Standing',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    },
    nextBus2: {
      estimatedMinutes: 9,
      scheduledTime: '15:44',
      load: 'Seats Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    }
  },
  {
    serviceNo: '124',
    operator: 'SBS Transit',
    destinationName: "St. Michael's Ter",
    routeDescription: 'via Newton MRT & Whampoa Dr',
    isLoop: false,
    nextBus: {
      estimatedMinutes: 4,
      scheduledTime: '15:39',
      load: 'Seats Available',
      busType: 'SD',
      wheelchairAccessible: true,
      monitored: true
    },
    nextBus2: {
      estimatedMinutes: 14,
      scheduledTime: '15:49',
      load: 'Seats Available',
      busType: 'SD',
      wheelchairAccessible: true,
      monitored: true
    }
  },
  {
    serviceNo: '166',
    operator: 'SBS Transit',
    destinationName: 'Clementi Int',
    routeDescription: 'via Alexandra Rd, Dover & Commonwealth',
    isLoop: false,
    nextBus: {
      estimatedMinutes: 6,
      scheduledTime: '15:41',
      load: 'Standing Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    },
    nextBus2: {
      estimatedMinutes: 18,
      scheduledTime: '15:53',
      load: 'Seats Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    }
  },
  {
    serviceNo: '174',
    operator: 'SBS Transit',
    destinationName: 'Boon Lay Int',
    routeDescription: 'via Orchard Rd, Bukit Timah & Jurong West',
    isLoop: false,
    nextBus: {
      estimatedMinutes: 11,
      scheduledTime: '15:46',
      load: 'Seats Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    },
    nextBus2: {
      estimatedMinutes: 24,
      scheduledTime: '15:59',
      load: 'Standing Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    }
  },
  {
    serviceNo: '65',
    operator: 'SBS Transit',
    destinationName: 'Tampines Int',
    routeDescription: 'via MacPherson, Bedok Reservoir & Tampines Ave 5',
    isLoop: false,
    nextBus: {
      estimatedMinutes: 5,
      scheduledTime: '15:40',
      load: 'Seats Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    },
    nextBus2: {
      estimatedMinutes: 15,
      scheduledTime: '15:50',
      load: 'Seats Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    }
  },
  {
    serviceNo: '857',
    operator: 'Tower Transit',
    destinationName: 'Yishun Int',
    routeDescription: 'via CTE Express, Ang Mo Kio & Khatib',
    isLoop: true,
    nextBus: {
      estimatedMinutes: 8,
      scheduledTime: '15:43',
      load: 'Standing Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    },
    nextBus2: {
      estimatedMinutes: 20,
      scheduledTime: '15:55',
      load: 'Seats Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    }
  },
  {
    serviceNo: '10',
    operator: 'SBS Transit',
    destinationName: 'Tampines Int',
    routeDescription: 'via Shenton Way, Marina Bay & Marine Parade',
    isLoop: false,
    nextBus: {
      estimatedMinutes: 3,
      scheduledTime: '15:38',
      load: 'Seats Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    },
    nextBus2: {
      estimatedMinutes: 12,
      scheduledTime: '15:47',
      load: 'Standing Available',
      busType: 'DD',
      wheelchairAccessible: true,
      monitored: true
    }
  }
];

export const SERVICE_147_ROUTE_PROGRESSION: RouteStopProgression[] = [
  {
    stopCode: '08031',
    stopName: 'Dhoby Ghaut Stn',
    roadName: 'Penang Rd',
    status: 'passed',
    timeInfo: 'Passed 4 min ago',
    coordinates: [1.2988, 103.8458]
  },
  {
    stopCode: '08069',
    stopName: 'Rendezvous Hotel',
    roadName: 'Bras Basah Rd',
    status: 'passed',
    timeInfo: 'Passed 2 min ago',
    coordinates: [1.2974, 103.8481]
  },
  {
    stopCode: '04121',
    stopName: 'Stamford Court',
    roadName: 'Stamford Rd',
    status: 'current',
    timeInfo: 'YOU ARE HERE',
    coordinates: [1.2942, 103.8496]
  },
  {
    stopCode: '04129',
    stopName: 'SMU Lee Kong Chian',
    roadName: 'Bras Basah Rd',
    status: 'next',
    timeInfo: 'Next (+2 min)',
    coordinates: [1.2965, 103.8505]
  },
  {
    stopCode: '04111',
    stopName: 'Capitol Piazza',
    roadName: 'North Bridge Rd',
    status: 'upcoming',
    timeInfo: '+4 min',
    coordinates: [1.2932, 103.8519]
  },
  {
    stopCode: '04239',
    stopName: 'Clarke Quay Stn',
    roadName: 'Eu Tong Sen St',
    status: 'upcoming',
    timeInfo: '+7 min',
    coordinates: [1.2887, 103.8465]
  }
];

export const ALL_BUS_ROUTES_DATA = [
  {
    serviceNo: '147',
    operator: 'SBS Transit',
    origin: 'Hougang Central Int',
    destination: 'Clementi Int',
    type: 'Trunk (High Capacity Double Decker)',
    distanceKm: 27.4,
    stopsCount: 58,
    frequencyPeak: '5 - 8 mins',
    frequencyOffPeak: '8 - 12 mins',
    firstBus: '05:30',
    lastBus: '23:45',
    fleet: 'Volvo B9TL Wright / Yutong E12DD Electric',
    keyCorridors: ['Hougang', 'Serangoon', 'Potong Pasir', 'Dhoby Ghaut', 'Chinatown', 'Alexandra', 'Clementi']
  },
  {
    serviceNo: '190',
    operator: 'SMRT Buses',
    origin: 'Choa Chu Kang Int',
    destination: 'Kampong Bahru Ter',
    type: 'Trunk Expressway (BKE/PIE)',
    distanceKm: 25.1,
    stopsCount: 46,
    frequencyPeak: '4 - 7 mins',
    frequencyOffPeak: '7 - 10 mins',
    firstBus: '05:45',
    lastBus: '23:30',
    fleet: 'MAN A95 (ND323F) / Alexander Dennis Enviro500',
    keyCorridors: ['Choa Chu Kang', 'Teck Whye', 'Bukit Panjang', 'Stevens', 'Orchard', 'Clarke Quay']
  },
  {
    serviceNo: '124',
    operator: 'SBS Transit',
    origin: "St. Michael's Ter",
    destination: 'HarbourFront Int',
    type: 'Feeder/Trunk Hybrid',
    distanceKm: 18.2,
    stopsCount: 38,
    frequencyPeak: '8 - 12 mins',
    frequencyOffPeak: '12 - 15 mins',
    firstBus: '06:00',
    lastBus: '23:50',
    fleet: 'Mercedes-Benz Citaro (Single Deck)',
    keyCorridors: ['Whampoa', 'Balestier', 'Novena', 'Orchard', 'Chinatown', 'Telok Blangah']
  },
  {
    serviceNo: '166',
    operator: 'SBS Transit',
    origin: 'Ang Mo Kio Int',
    destination: 'Clementi Int',
    type: 'Major Radial Trunk',
    distanceKm: 29.8,
    stopsCount: 64,
    frequencyPeak: '6 - 9 mins',
    frequencyOffPeak: '10 - 14 mins',
    firstBus: '05:30',
    lastBus: '23:45',
    fleet: 'Volvo B9TL / Scania K230UB',
    keyCorridors: ['Ang Mo Kio', 'Thomson', 'Little India', 'Stamford Rd', 'HarbourFront', 'Dover']
  },
  {
    serviceNo: '174',
    operator: 'SBS Transit',
    origin: 'Boon Lay Int',
    destination: 'Kampong Bahru Ter',
    type: 'Long Trunk',
    distanceKm: 31.4,
    stopsCount: 72,
    frequencyPeak: '7 - 11 mins',
    frequencyOffPeak: '11 - 15 mins',
    firstBus: '05:20',
    lastBus: '23:30',
    fleet: 'Volvo B9TL Wright Gemini II',
    keyCorridors: ['Jurong West', 'Bukit Batok', 'Beauty World', 'Farrer Rd', 'Orchard', 'Chinatown']
  },
  {
    serviceNo: '65',
    operator: 'SBS Transit',
    origin: 'Tampines Int',
    destination: 'HarbourFront Int',
    type: 'East-West Radial Trunk',
    distanceKm: 26.9,
    stopsCount: 52,
    frequencyPeak: '6 - 10 mins',
    frequencyOffPeak: '10 - 13 mins',
    firstBus: '05:30',
    lastBus: '23:45',
    fleet: 'Volvo B9TL Double Decker',
    keyCorridors: ['Tampines', 'Bedok Reservoir', 'Ubi', 'MacPherson', 'Orchard', 'Telok Blangah']
  },
  {
    serviceNo: '857',
    operator: 'Tower Transit',
    origin: 'Yishun Int',
    destination: 'Suntec City / Central (Loop)',
    type: 'Expressway Commuter Trunk (CTE)',
    distanceKm: 28.5,
    stopsCount: 42,
    frequencyPeak: '5 - 8 mins',
    frequencyOffPeak: '8 - 12 mins',
    firstBus: '05:45',
    lastBus: '23:30',
    fleet: 'Alexander Dennis Enviro500 (Euro 6)',
    keyCorridors: ['Yishun', 'Khatib', 'CTE', 'Little India', 'Bras Basah', 'Suntec City']
  }
];

export const MRT_INTERCHANGES: MRTStation[] = [
  {
    code: 'NS24 / NE6 / CC1',
    name: 'Dhoby Ghaut',
    lines: ['NSL', 'NEL', 'CCL'],
    interchangeStops: ['08031', '08057', '08069'],
    walkingTimeMin: 5
  },
  {
    code: 'EW13 / NS25',
    name: 'City Hall',
    lines: ['EWL', 'NSL'],
    interchangeStops: ['04111', '04121', '04119'],
    walkingTimeMin: 6
  },
  {
    code: 'DT21 / CC2',
    name: 'Bras Basah / Bencoolen',
    lines: ['CCL', 'DTL'],
    interchangeStops: ['04129', '08069', '04029'],
    walkingTimeMin: 3
  },
  {
    code: 'EW12 / DT14',
    name: 'Bugis',
    lines: ['EWL', 'DTL'],
    interchangeStops: ['01112', '01113', '01119'],
    walkingTimeMin: 8
  },
  {
    code: 'NS22 / TE14',
    name: 'Orchard',
    lines: ['NSL', 'TEL'],
    interchangeStops: ['09022', '09023', '09047'],
    walkingTimeMin: 14
  },
  {
    code: 'NE5',
    name: 'Clarke Quay',
    lines: ['NEL'],
    interchangeStops: ['04239', '04222'],
    walkingTimeMin: 7
  }
];

export const SERVICE_ALERTS: ServiceAlert[] = [
  {
    id: 'alt-01',
    title: 'Bus Services 147, 166, 190 Corridor Priority Active',
    serviceNo: '147',
    severity: 'normal',
    category: 'event',
    message: 'Dedicated B-signal priority corridor engaged on Stamford Road towards Clarke Quay. Average transit speed +18% on time.',
    updatedAt: '2 mins ago'
  },
  {
    id: 'alt-02',
    title: 'Rain Shelter Linkway Advisory: Central SMU District',
    severity: 'normal',
    category: 'maintenance',
    message: 'Continuous covered sheltered linkways connected between Stamford Court (04121), SMU Underpass, and Bencoolen DTL MRT Station.',
    updatedAt: '12 mins ago'
  },
  {
    id: 'alt-03',
    title: 'Weekend Diversion Notice: Bras Basah Arts Festival',
    serviceNo: '857',
    severity: 'moderate',
    category: 'diversion',
    message: 'Bus 857 will skip Stop 04129 on Sunday 08:00 - 14:00 due to pedestrian arts zone. Board instead at Stamford Court (04121).',
    updatedAt: '1 hour ago'
  },
  {
    id: 'alt-04',
    title: 'LTA DataMall Telemetry Protocol v2.4 Healthy',
    severity: 'normal',
    category: 'maintenance',
    message: 'All 5,200 public buses transmitting real-time AVL GPS telematics at 15-second intervals. Fleet load estimates verified.',
    updatedAt: 'Live'
  }
];
