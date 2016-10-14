const http = require('http');
const _ = require('lodash');

const server = http.createServer((request, response) => {
  const { headers, method, url } = request;
  const body = [];

  request
  .on('error', (err) => console.error(err))
  .on('data', (chunk) => body.push(chunk))
  .on('end', () => {
    response.on('error', (err) => {
      console.error(err);
    });
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify({
      headers,
      method,
      url,
      body: Buffer.concat(body).toString(),
    }));
    console.log(` --> Request ${url} End`);
  });

  console.log(` --> Request ${url} Served`);
});

server.listen(8080);
console.log('Listening on port 8080');
