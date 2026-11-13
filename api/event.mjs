const json = (body, status = 200) => Response.json(body, {
  status, headers: {'Cache-Control': 'no-store'}
});

export default {
  async fetch(request) {
    if (request.method !== 'POST') return json({error: 'Method not allowed'}, 405);
    const {visitor, action} = (await request.json().catch(() => null)) ?? {};
    if (typeof visitor !== 'string' || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(visitor)
      || !['presence', 'claim'].includes(action)) {
      return json({error: 'Invalid request'}, 400);
    }

    const code = process.env.ACTIVITY_CODE?.trim() || '';
    if (action === 'claim' && !code) return json({code, details: ''});
    const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
    const key = process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) return json({error: 'Database configuration missing'}, 503);

    try {
      const response = await fetch(url + '/rest/v1/rpc/hotza_event_record', {
        method: 'POST',
        headers: {apikey: key, 'Content-Type': 'application/json'},
        body: JSON.stringify({visitor_id: visitor, claim_code: action === 'claim'}),
        signal: AbortSignal.timeout(8000)
      });
      if (!response.ok) return json({error: 'Database unavailable'}, 503);
      const stats = await response.json();
      if (action === 'presence') return json(stats);
      return json({code, details: (process.env.ACTIVITY_DETAILS || '').replaceAll('\\n', '\n'), claimed: stats.claimed});
    } catch {
      return json({error: 'Database unavailable'}, 503);
    }
  }
};


