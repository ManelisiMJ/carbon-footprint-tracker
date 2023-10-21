const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000; // Specify the port number you want to use

const server = http.createServer((req, res) => {
  // Handle the request
  let filePath = path.join(__dirname, req.url === '/' ? "./html/login.html" : req.url);
  let extname = path.extname(filePath);
  let contentType = 'text/html';

  // Set the content type based on the file extension
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    default:
      contentType = 'text/html';
  }

  // Read the file and send the response
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        // Other server error
        res.writeHead(500);
        res.end('500 Internal Server Error');
      }
    } else {
      // Successful response
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
