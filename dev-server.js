const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 5500;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function sendResponse(res, statusCode, body, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function resolvePath(urlPath) {
  const raw = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = raw === '/' ? '/index.html' : raw;
  const target = path.normalize(path.join(ROOT, normalized));

  if (!target.startsWith(ROOT)) {
    return null;
  }

  return target;
}

const server = http.createServer((req, res) => {
  const filePath = resolvePath(req.url || '/');

  if (!filePath) {
    sendResponse(res, 403, 'Forbidden');
    return;
  }

  fs.stat(filePath, (statErr, stats) => {
    if (statErr) {
      sendResponse(res, 404, 'Not Found');
      return;
    }

    const finalPath = stats.isDirectory() ? path.join(filePath, 'index.html') : filePath;

    fs.readFile(finalPath, (readErr, data) => {
      if (readErr) {
        sendResponse(res, 404, 'Not Found');
        return;
      }

      const ext = path.extname(finalPath).toLowerCase();
      const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
      sendResponse(res, 200, data, mimeType);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Ecos do Medo rodando em http://localhost:${PORT}`);
});
