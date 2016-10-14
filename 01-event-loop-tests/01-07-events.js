const http = require('http');
const fs = require('fs');

const server = http.createServer();

const nextRequest = (() => {
  let requestNumber = 0;
  return () => ++requestNumber;
})();

server.on('request', (request, response) => {
  const requestNumber = nextRequest();

  response.writeHead(200);

  if (request.url === '/lyda') {
    response.write(`Hi Lyda!!! - ${requestNumber} ${request.url}`);
    response.end();
    return;
  }

  if (request.url === '/gerasimos') {
    response.write(`Hi Gerasimos!!! - ${requestNumber} ${request.url}`);
    response.end();
    return;
  }

  const rs = fs.createReadStream(`./static${request.url}`);
  const body = [];

  rs
  .on('error', (err) => console.error(err))
  .on('data', (chunk) => body.push(chunk))
  .on('end', () => {
    response.on('error', (err) => {
      console.error(err);
    });
    response.writeHead(200, {
      'Content-Type': 'text/html',
    });
    response.end(Buffer.concat(body).toString());
    console.log(` --> Request - ${requestNumber} - Delivered`);
  });
});

server.listen(8090);
console.log('Listening on port 8090');
