const crypto = require('crypto');
const USERS = ['afaqu', 'hado'];
const secret = () => process.env.SESSION_SECRET || '';
const configured = () => secret().length >= 16 && (process.env.APP_PASSWORD || '').length > 0;
const sign = v => crypto.createHmac('sha256', secret()).update(v).digest('base64url');
const hash = x => crypto.createHash('sha256').update(String(x)).digest();
const passOk = p => crypto.timingSafeEqual(hash(p), hash(process.env.APP_PASSWORD || ''));
function makeToken(user) { const v = user + '.' + (Date.now() + 30 * 864e5); return v + '.' + sign(v); }
function readUser(req) {
  if (!configured()) return null;
  const m = /(?:^|;\s*)hm_session=([^;]+)/.exec(req.headers.cookie || '');
  if (!m) return null;
  const [u, e, s] = m[1].split('.');
  if (!u || !e || !s || !USERS.includes(u) || Date.now() > Number(e)) return null;
  const a = Buffer.from(s), b = Buffer.from(sign(u + '.' + e));
  return a.length === b.length && crypto.timingSafeEqual(a, b) ? u : null;
}
const cookie = (val, max, req) =>
  `hm_session=${val}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${max}` +
  ((req.headers['x-forwarded-proto'] || '').includes('https') ? '; Secure' : '');
async function readBody(req) {
  if (req.body !== undefined) return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  let d = ''; for await (const c of req) d += c;
  try { return JSON.parse(d || '{}'); } catch (e) { return {}; }
}
const roomId = () => crypto.createHmac('sha256', secret()).update('room-v1').digest('hex').slice(0, 20);
module.exports = { roomId, USERS, configured, passOk, makeToken, readUser, cookie, readBody };
