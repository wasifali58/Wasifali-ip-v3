// IP INFO API V3 - WASIF ALI (ipinfo.io Backend)
// Developer: WASIF ALI | Telegram: @FREEHACKS95

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  let { ip } = req.query;

  // If no IP provided, get client IP
  if (!ip) {
    ip = req.headers['x-forwarded-for']?.split(',')[0] || 
         req.socket.remoteAddress || 
         '8.8.8.8';
    if (ip.startsWith('::ffff:')) ip = ip.substring(7);
    if (ip === '::1' || ip === '127.0.0.1') ip = '8.8.8.8';
  }

  try {
    // ipinfo.io API call (no token = limited data)
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await response.json();

    // Error check
    if (data.error || !data.ip) {
      return res.status(200).send(JSON.stringify({
        success: false,
        message: data.error?.message || "IP not found",
        developer: "WASIF ALI",
        telegram: "@FREEHACKS95"
      }, null, 2));
    }

    // Format response exactly as you showed
    const result = {
      ip: data.ip,
      hostname: data.hostname || null,
      city: data.city || null,
      region: data.region || null,
      country: data.country || null,
      loc: data.loc || null,
      org: data.org || null,
      postal: data.postal || null,
      timezone: data.timezone || null,
      developer: "WASIF ALI",
      telegram: "@FREEHACKS95"
    };

    // Pretty print with 2 spaces
    return res.status(200).send(JSON.stringify(result, null, 2));

  } catch (error) {
    const errorResponse = {
      success: false,
      message: "Service unavailable",
      developer: "WASIF ALI",
      telegram: "@FREEHACKS95"
    };
    return res.status(200).send(JSON.stringify(errorResponse, null, 2));
  }
}
