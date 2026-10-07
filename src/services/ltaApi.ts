import { BusServiceArrival, BusLoad, BusType } from '../types/transit';

export interface LtaRawBusArrival {
  EstimatedArrival: string;
  Latitude?: string;
  Longitude?: string;
  VisitNumber?: string;
  Load?: 'SEA' | 'SDA' | 'LSD' | string;
  Feature?: 'WAB' | string;
  Type?: 'SD' | 'DD' | 'BD' | string;
}

export interface LtaRawService {
  ServiceNo: string;
  Operator: string;
  NextBus?: LtaRawBusArrival;
  NextBus2?: LtaRawBusArrival;
  NextBus3?: LtaRawBusArrival;
}

export interface LtaBusArrivalResponse {
  BusStopCode: string;
  Services: LtaRawService[];
  _source?: string;
  _note?: string;
}

function parseLoad(loadCode?: string): BusLoad {
  if (loadCode === 'SEA') return 'Seats Available';
  if (loadCode === 'SDA') return 'Standing Available';
  if (loadCode === 'LSD') return 'Limited Standing';
  return 'Seats Available';
}

function parseBusType(typeCode?: string): BusType {
  if (typeCode === 'DD') return 'DD';
  if (typeCode === 'BD') return 'BD';
  return 'SD';
}

function parseMinutes(estimatedArrivalIso?: string): { minutes: number; scheduledTime: string } {
  if (!estimatedArrivalIso) {
    return { minutes: 99, scheduledTime: '--:--' };
  }

  const arrivalDate = new Date(estimatedArrivalIso);
  const now = new Date();
  const diffMs = arrivalDate.getTime() - now.getTime();
  const minutes = Math.max(0, Math.round(diffMs / 60000));

  const hours = String(arrivalDate.getHours()).padStart(2, '0');
  const mins = String(arrivalDate.getMinutes()).padStart(2, '0');
  const scheduledTime = `${hours}:${mins}`;

  return { minutes, scheduledTime };
}

function mapOperator(opCode?: string): 'SBS Transit' | 'SMRT Buses' | 'Tower Transit' | 'Go-Ahead Singapore' {
  if (opCode === 'SBST') return 'SBS Transit';
  if (opCode === 'SMRT') return 'SMRT Buses';
  if (opCode === 'TTS') return 'Tower Transit';
  if (opCode === 'GAS') return 'Go-Ahead Singapore';
  return 'SBS Transit';
}

export async function fetchBusArrivals(
  busStopCode: string,
  serviceNo?: string
): Promise<{ services: BusServiceArrival[]; source: string }> {
  try {
    let url = `/api/bus-arrival?BusStopCode=${encodeURIComponent(busStopCode)}`;
    if (serviceNo) {
      url += `&ServiceNo=${encodeURIComponent(serviceNo)}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API responded with HTTP ${res.status}`);
    }

    const data: LtaBusArrivalResponse = await res.json();
    const source = data._source || (res.headers.get('X-Data-Source') || 'lta');

    const mappedServices: BusServiceArrival[] = (data.Services || []).map((raw) => {
      const b1 = parseMinutes(raw.NextBus?.EstimatedArrival);
      const b2 = parseMinutes(raw.NextBus2?.EstimatedArrival);
      const b3 = parseMinutes(raw.NextBus3?.EstimatedArrival);

      return {
        serviceNo: raw.ServiceNo,
        operator: mapOperator(raw.Operator),
        destinationName: getDestinationForService(raw.ServiceNo),
        routeDescription: getRouteDescriptionForService(raw.ServiceNo),
        isLoop: isLoopService(raw.ServiceNo),
        isFocusRoute: raw.ServiceNo === '147',
        isPinned: raw.ServiceNo === '147' || raw.ServiceNo === '190',
        nextBus: {
          estimatedMinutes: b1.minutes,
          scheduledTime: b1.scheduledTime,
          load: parseLoad(raw.NextBus?.Load),
          busType: parseBusType(raw.NextBus?.Type),
          wheelchairAccessible: raw.NextBus?.Feature === 'WAB',
          monitored: true
        },
        nextBus2: raw.NextBus2?.EstimatedArrival
          ? {
              estimatedMinutes: b2.minutes,
              scheduledTime: b2.scheduledTime,
              load: parseLoad(raw.NextBus2?.Load),
              busType: parseBusType(raw.NextBus2?.Type),
              wheelchairAccessible: raw.NextBus2?.Feature === 'WAB',
              monitored: true
            }
          : undefined,
        nextBus3: raw.NextBus3?.EstimatedArrival
          ? {
              estimatedMinutes: b3.minutes,
              scheduledTime: b3.scheduledTime,
              load: parseLoad(raw.NextBus3?.Load),
              busType: parseBusType(raw.NextBus3?.Type),
              wheelchairAccessible: raw.NextBus3?.Feature === 'WAB',
              monitored: true
            }
          : undefined
      };
    });

    return { services: mappedServices, source };
  } catch (err) {
    console.warn('Falling back to local data due to API error:', err);
    throw err;
  }
}

export async function checkApiHealth() {
  try {
    const res = await fetch('/api/health');
    return await res.json();
  } catch (err) {
    return { status: 'offline', error: String(err) };
  }
}

// Destination metadata helpers
function getDestinationForService(serviceNo: string): string {
  const map: Record<string, string> = {
    '147': 'Clementi Bus Interchange',
    '190': 'Choa Chu Kang Int',
    '124': "St. Michael's Ter",
    '166': 'Clementi Int',
    '174': 'Boon Lay Int',
    '65': 'Tampines Int',
    '857': 'Yishun Int',
    '10': 'Tampines Int',
    '7': 'Clementi Int',
    '14': 'Bedok Int',
    '16': 'Bedok Int',
    '36': 'Changi Airport PTB'
  };
  return map[serviceNo] || 'Central Transit Hub';
}

function getRouteDescriptionForService(serviceNo: string): string {
  const map: Record<string, string> = {
    '147': 'via Chinatown & Buona Vista',
    '190': 'via Orchard Rd, Stevens Rd & BKE Express',
    '124': 'via Newton MRT & Whampoa Dr',
    '166': 'via Alexandra Rd, Dover & Commonwealth',
    '174': 'via Orchard Rd, Bukit Timah & Jurong West',
    '65': 'via MacPherson & Bedok Reservoir',
    '857': 'via CTE Express, Ang Mo Kio & Khatib',
    '10': 'via Shenton Way, Marina Bay & Marine Parade'
  };
  return map[serviceNo] || 'via Central Expressway Corridor';
}

function isLoopService(serviceNo: string): boolean {
  return serviceNo === '147' || serviceNo === '857' || serviceNo === '36';
}
