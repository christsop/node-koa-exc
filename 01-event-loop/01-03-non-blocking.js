const http = require('http');
const fs = require('fs');

const server = http.createServer();

const nextRequest = () => {
  let requestNumber = 0;
  return () => ++requestNumber;
}();

server.on('request', (request, response) => {
  requestNumber = nextRequest();
  
  const rs = fs.createReadStream('./package.json');
  const body = [];

  rs
  .on('error', (err) => console.error(err))
  .on('data', (chunk) => body.push(chunk))
  .on('end', () => {
    response.on('error', (err) => {
      console.error(err);
    });
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(Buffer.concat(body).toString());
    console.log(` --> Request - ${requestNumber} - Delivered`);
  });

  console.log(` --> Request - ${requestNumber} - Served`);
});

server.listen(8090);
console.log('Listening on port 8090');
