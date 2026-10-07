/**
 * LTA DataMall v3 Bus Arrival API Proxy
 * GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121
 * Header: AccountKey: process.env.LTA_ACCOUNT_KEY
 * 
 * Parameters:
 * - BusStopCode: (required) 5-digit bus stop code, e.g. "04121"
 * - ServiceNo: (optional) Filter for a single bus service, e.g. "147"
 *
 * Compatible with Vercel Serverless Functions and Node.js
 */

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Parse query parameters
  const urlObj = new URL(req.url, 'http://localhost');
  const busStopCode =
    urlObj.searchParams.get('BusStopCode') ||
    urlObj.searchParams.get('busStopCode') ||
    '04121';

  const serviceNo =
    urlObj.searchParams.get('ServiceNo') ||
    urlObj.searchParams.get('serviceNo') ||
    '';

  const accountKey = process.env.LTA_ACCOUNT_KEY ? process.env.LTA_ACCOUNT_KEY.trim() : '';

  // If LTA_ACCOUNT_KEY is configured, call official LTA DataMall v3 API
  if (accountKey) {
    try {
      let ltaUrl = `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${encodeURIComponent(busStopCode)}`;
      if (serviceNo) {
        ltaUrl += `&ServiceNo=${encodeURIComponent(serviceNo)}`;
      }

      const ltaResponse = await fetch(ltaUrl, {
        method: 'GET',
        headers: {
          AccountKey: accountKey,
          accept: 'application/json'
        }
      });

      if (ltaResponse.ok) {
        const data = await ltaResponse.json();
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=5');
        res.setHeader('X-Data-Source', 'LTA-DataMall-v3');
        res.statusCode = 200;
        res.end(JSON.stringify({ ...data, _source: 'lta_live' }));
        return;
      }

      console.warn(`LTA DataMall API responded with status ${ltaResponse.status}: ${ltaResponse.statusText}`);
    } catch (err) {
      console.error('Error fetching from LTA DataMall:', err);
    }
  }

  // Fallback realistic simulated telemetry adhering to LTA DataMall v3 schema
  // Ensures the app works cleanly before the key is added in Vercel environment variables
  const now = new Date();
  const formatIso = (addMinutes) => {
    return new Date(now.getTime() + addMinutes * 60 * 1000).toISOString();
  };

  const mockServices = [
    {
      ServiceNo: '147',
      Operator: 'SBST',
      NextBus: {
        OriginCode: '64009',
        DestinationCode: '17179',
        EstimatedArrival: formatIso(0), // Arriving now
        Latitude: '1.294200',
        Longitude: '103.849600',
        VisitNumber: '1',
        Load: 'SEA', // Seats Available
        Feature: 'WAB', // Wheelchair Accessible
        Type: 'DD' // Double Decker
      },
      NextBus2: {
        OriginCode: '64009',
        DestinationCode: '17179',
        EstimatedArrival: formatIso(7),
        Latitude: '1.298800',
        Longitude: '103.845800',
        VisitNumber: '1',
        Load: 'SDA', // Standing Available
        Feature: 'WAB',
        Type: 'SD' // Single Decker
      },
      NextBus3: {
        OriginCode: '64009',
        DestinationCode: '17179',
        EstimatedArrival: formatIso(16),
        Latitude: '1.303000',
        Longitude: '103.842000',
        VisitNumber: '1',
        Load: 'SEA',
        Feature: 'WAB',
        Type: 'DD'
      }
    },
    {
      ServiceNo: '190',
      Operator: 'SMRT',
      NextBus: {
        OriginCode: '44009',
        DestinationCode: '10009',
        EstimatedArrival: formatIso(2),
        Latitude: '1.295000',
        Longitude: '103.848000',
        VisitNumber: '1',
        Load: 'LSD', // Limited Standing
        Feature: 'WAB',
        Type: 'DD'
      },
      NextBus2: {
        OriginCode: '44009',
        DestinationCode: '10009',
        EstimatedArrival: formatIso(9),
        Latitude: '1.300000',
        Longitude: '103.845000',
        VisitNumber: '1',
        Load: 'SEA',
        Feature: 'WAB',
        Type: 'DD'
      }
    },
    {
      ServiceNo: '124',
      Operator: 'SBST',
      NextBus: {
        OriginCode: '52009',
        DestinationCode: '14009',
        EstimatedArrival: formatIso(4),
        Latitude: '1.296000',
        Longitude: '103.847000',
        VisitNumber: '1',
        Load: 'SEA',
        Feature: 'WAB',
        Type: 'SD'
      },
      NextBus2: {
        OriginCode: '52009',
        DestinationCode: '14009',
        EstimatedArrival: formatIso(14),
        Latitude: '1.304000',
        Longitude: '103.840000',
        VisitNumber: '1',
        Load: 'SEA',
        Feature: 'WAB',
        Type: 'SD'
      }
    },
    {
      ServiceNo: '166',
      Operator: 'SBST',
      NextBus: {
        OriginCode: '54009',
        DestinationCode: '17179',
        EstimatedArrival: formatIso(6),
        Latitude: '1.297000',
        Longitude: '103.846500',
        VisitNumber: '1',
        Load: 'SDA',
        Feature: 'WAB',
        Type: 'DD'
      },
      NextBus2: {
        OriginCode: '54009',
        DestinationCode: '17179',
        EstimatedArrival: formatIso(18),
        Latitude: '1.306000',
        Longitude: '103.839000',
        VisitNumber: '1',
        Load: 'SEA',
        Feature: 'WAB',
        Type: 'DD'
      }
    },
    {
      ServiceNo: '174',
      Operator: 'SBST',
      NextBus: {
        OriginCode: '22009',
        DestinationCode: '10009',
        EstimatedArrival: formatIso(11),
        Latitude: '1.299000',
        Longitude: '103.844000',
        VisitNumber: '1',
        Load: 'SEA',
        Feature: 'WAB',
        Type: 'DD'
      },
      NextBus2: {
        OriginCode: '22009',
        DestinationCode: '10009',
        EstimatedArrival: formatIso(24),
        Latitude: '1.312000',
        Longitude: '103.835000',
        VisitNumber: '1',
        Load: 'SDA',
        Feature: 'WAB',
        Type: 'DD'
      }
    }
  ];

  const filtered = serviceNo
    ? mockServices.filter((s) => s.ServiceNo === serviceNo)
    : mockServices;

  const mockPayload = {
    'odata.metadata': 'https://datamall2.mytransport.sg/ltaodataservice/v3/$metadata#BusArrival',
    BusStopCode: busStopCode,
    Services: filtered,
    _source: 'simulation_fallback',
    _note: accountKey
      ? 'LTA API temporary fallback triggered'
      : 'Awaiting LTA_ACCOUNT_KEY in environment variables'
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Data-Source', 'Simulation-Fallback');
  res.statusCode = 200;
  res.end(JSON.stringify(mockPayload, null, 2));
}
