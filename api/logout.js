const a = require('../lib/auth');
module.exports = (req, res) => {
  res.setHeader('Set-Cookie', a.cookie('', 0, req));
  res.setHeader('Content-Type', 'application/json');
  res.end('{"ok":true}');
};
