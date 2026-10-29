const fs = require('fs'), path = require('path'), a = require('../lib/auth');
module.exports = (req, res) => {
  const u = a.readUser(req);
  if (!u) { res.statusCode = 302; res.setHeader('Location', '/'); return res.end(); }
  const html = fs.readFileSync(path.join(process.cwd(), 'private', 'app.html'), 'utf8').replace('__USER__', u);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'private, no-store');
  res.end(html);
};
