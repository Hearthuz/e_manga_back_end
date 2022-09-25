const fs = require('fs');
const http = require('http');
const os = require('os');

const { manga } = require('./api/data');

console.log(manga);

http
    .createServer((req, res) => {
        switch (req.url) {
            case '/api/manga':
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.write(JSON.stringify(manga));
                break;
            case '/api/online':
                res.setHeader('Content-Type', 'text/plain');
                res.writeHead(200);
                res.write(os.uptime().toString());
                break;
        }
        res.end();
    })
    .listen(8080);

console.log('Listening on port 8080');