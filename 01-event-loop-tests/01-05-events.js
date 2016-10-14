const http = require('http');

const server = http.createServer();

const nextRequest = (() => {
  let requestNumber = 0;
  return () => ++requestNumber;
})();

server.on('request', (request, response) => {
  requestNumber = nextRequest();

  response.writeHead(200);
  response.write(`Hello World of Events!!! - ${requestNumber}`);
  response.end();

  if (requestNumber === 5) {
    server.emit('an-event-to-die-for');
  }
});

server.on('an-event-to-die-for', (request, response) => {
  console.log(`Bye Bye life :( ... - ${requestNumber}`);
  process.exit();
});

server.listen(8090);
console.log('Listening on port 8090');
