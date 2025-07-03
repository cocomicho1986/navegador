// Cargamos los módulos necesarios de Node.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Creamos el servidor HTTP
const server = http.createServer((req, res) => {
    let filePath;

    // Ruta base del proyecto
    const baseDir = __dirname;

    // Manejamos las rutas dinámicamente
    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(baseDir, 'index.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
    } else if (req.url.startsWith('/imagenes/')) {
        // ✅ Nueva parte: servimos cualquier imagen desde la carpeta 'imagenes'
        filePath = path.join(baseDir, req.url); // req.url incluye '/imagenes/imagen.jpg'
        const extname = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        };
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
    
    // 👇 Esta parte COMPLETA es la que sirve script.js
    } else if (req.url === '/navegador.js') {
       //  ✅ Comentamos TODO este bloque completo
         filePath = path.join(baseDir, 'script.js');
         res.writeHead(200, { 'Content-Type': 'application/javascript' });

    } else if (req.url === '/navegador.css') {
        filePath = path.join(baseDir, 'navegador.css');
        res.writeHead(200, { 'Content-Type': 'text/css' });

     } else if (req.url === '/contacto.html') {
        filePath = path.join(baseDir, 'contacto.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });    
    
    } else if (req.url === '/login.html') {
        filePath = path.join(baseDir, 'login.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });   
        
    } else {
        res.writeHead(404);
        res.end('Archivo no encontrado');
        return;
    }

    if (filePath) {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.error(`Error al leer ${filePath}:`, err.message);
                res.writeHead(500);
                res.end('Error interno del servidor');
            } else {
                res.end(content);
            }
        });
    }
});

// Puerto en el que correrá el servidor
const PORT = 3000;

// Iniciamos el servidor escuchando en el puerto especificado
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});