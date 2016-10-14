const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200);
  response.write('I just looped once more executing this request!!!');
  response.end();
});

server.listen(8090);
console.log('Listening on port 8090');
