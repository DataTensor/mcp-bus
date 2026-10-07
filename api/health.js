/**
 * Health check endpoint for SG BusWatch Live APIs
 * Compatible with Vercel Serverless Functions and Node.js
 */

export default async function handler(req, res) {
  // Support CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  const ltaConfigured = Boolean(process.env.LTA_ACCOUNT_KEY && process.env.LTA_ACCOUNT_KEY.trim() !== '');

  const payload = {
    status: 'healthy',
    service: 'SG BusWatch Live API Gateway',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    ltaDataMall: {
      accountKeyConfigured: ltaConfigured,
      targetEndpoint: 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival',
      status: ltaConfigured ? 'ready' : 'awaiting_key'
    },
    version: '1.0.0'
  };

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(payload, null, 2));
}
