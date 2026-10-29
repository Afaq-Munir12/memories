// Local development server. Vercel does not use this file.
const http = require('http'), fs = require('fs'), path = require('path');
try { fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split(/\r?\n/).forEach(l => { const m = /^([A-Z_]+)=(.*)$/.exec(l); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; }); } catch (e) {}
const routes = { '/api/login': require('./api/login'), '/api/logout': require('./api/logout'), '/app': require('./api/app') };
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.json': 'application/json', '.ico': 'image/x-icon' };
const root = path.join(__dirname, 'public'), port = process.env.PORT || 3000;
http.createServer((q, r) => {
  const p = q.url.split('?')[0];
  if (routes[p]) return routes[p](q, r);
  const f = path.join(root, p === '/' ? 'index.html' : p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.statusCode = 404; return r.end('Not found'); }
  r.setHeader('Content-Type', mime[path.extname(f)] || 'application/octet-stream');
  fs.createReadStream(f).pipe(r);
}).listen(port, () => console.log('Running at http://localhost:' + port));
