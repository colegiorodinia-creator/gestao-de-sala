const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname);

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
    // Sanitização e prevenção contra Directory Traversal (CWE-22)
    let rawPath = '';
    try {
      rawPath = decodeURIComponent(req.url.split('?')[0]);
    } catch(e) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('400 — Requisição Inválida');
    }

    let safePath;
    if (rawPath.startsWith('/visao-professor-')) {
      safePath = path.join(PUBLIC_DIR, 'visao-professor.html');
    } else {
      safePath = path.normalize(path.join(PUBLIC_DIR, rawPath));
    }
    
    // Garantir que a requisição não acesse diretórios fora do PUBLIC_DIR
    if (!safePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('403 — Acesso Proibido');
    }

    let filePath = safePath;
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    console.log(`[HTTP] ${req.method} ${req.url} -> ${filePath}`);

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    // Cabeçalhos de Segurança da Aplicação (OWASP Best Practices)
    const securityHeaders = {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          res.writeHead(404, securityHeaders);
          res.end('<h1 style="font-family:sans-serif; text-align:center; margin-top:50px;">404 — Página não encontrada</h1>', 'utf-8');
        } else {
          res.writeHead(500, securityHeaders);
          res.end('Erro interno no servidor\n');
        }
      } else {
        res.writeHead(200, securityHeaders);
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
    console.log(`🚀 Gestão de Mapa v2.0 rodando em http://localhost:${portToTry}/`);
  });
}

startServer(PORT);
