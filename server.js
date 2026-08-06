const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function startServer(portToTry) {
  const server = http.createServer((req, res) => {
    const reqPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath;

    if (reqPath.startsWith('/visao-professor-')) {
      filePath = path.join(PUBLIC_DIR, 'visao-professor.html');
    } else {
      filePath = path.join(PUBLIC_DIR, reqPath);
    }
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    console.log(`[HTTP] ${req.method} ${req.url} -> ${filePath}`);

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('<h1 style="font-family:sans-serif; text-align:center; margin-top:50px;">404 — Página não encontrada</h1>', 'utf-8');
        } else {
          res.writeHead(500);
          res.end(`Erro interno no servidor: ${error.code}\n`);
        }
      } else {
        res.writeHead(200, { 
          'Content-Type': contentType,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        });
        res.end(content);
      }
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Porta ${portToTry} ocupada, tentando ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Erro no servidor:', err);
    }
  });

  server.listen(portToTry, () => {
    console.log(`🚀 Portal Rodin v2.0 rodando em http://localhost:${portToTry}/`);
  });
}

startServer(PORT);
