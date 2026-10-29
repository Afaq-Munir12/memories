const a = require('../lib/auth');
module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') { res.statusCode = 405; return res.end('{}'); }
  if (!a.configured()) { res.statusCode = 500; return res.end(JSON.stringify({ error: 'Server is not configured yet (set APP_PASSWORD and SESSION_SECRET).' })); }
  const b = await a.readBody(req), u = String(b.user || '').trim().toLowerCase();
  await new Promise(r => setTimeout(r, 600));
  if (!a.USERS.includes(u) || !a.passOk(b.pass || '')) { res.statusCode = 401; return res.end(JSON.stringify({ error: 'Wrong username or password.' })); }
  res.setHeader('Set-Cookie', a.cookie(a.makeToken(u), 2592000, req));
  res.end(JSON.stringify({ ok: true }));
};
