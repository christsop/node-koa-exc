const http = require('http');

const server = http.createServer((request, response) => {
  response.write('I just looped once more executing this request!!!');
  request.pipe(response);
  response.write(response);

});

server.listen(8090);
console.log('Listening on port 8090');
