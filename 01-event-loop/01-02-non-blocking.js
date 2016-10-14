const http = require('http');

const server = http.createServer();

const nextRequest = () => {
  let requestNumber = 0;
  return () => ++requestNumber;
}();

server.on('request', (request, response) => {
  const requestNumber = nextRequest();

  response.writeHead(200);
  response.write(`Hello World of Events!!! - ${requestNumber}`);
  setTimeout(() => {
    response.end();
    console.log(` --> Request - ${requestNumber} - Delivered`);
  }, 5000);
  console.log(` --> Request - ${requestNumber} - Served`);
});

server.listen(8090);
console.log('Listening on port 8090');
