const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = './';

    // Normalize the request URL to handle trailing slashes
    const normalizedUrl = req.url.replace(/\/+$/, '');

    switch (normalizedUrl) {
        case '':
        case '/':
            filePath += 'index.html';
            res.statusCode = 200;
            break;

        case '/about':
            filePath += 'about.html';
            res.statusCode = 200;
            break;

        case '/contact':
            filePath += 'contact-me.html';
            res.statusCode = 200;
            break;

        default:
            filePath += '404.html';
            res.statusCode = 404;
    }

    // Read the file from the file system
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end('Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });
});

server.listen(8080, 'localhost', () => {
    console.log('Working Server');
});
