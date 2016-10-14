var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');

const server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'post') {
      processAllFieldsOfTheForm(req, res);
    }
  });

const nextRequest = (() => {
  let requestNumber = 0;
  return () => ++requestNumber;
})();

server.on('request', (request, response) => {
  const requestNumber = nextRequest();
  response.writeHead(200);
  if (request.url === '/lyda') {
    response.write(`Hi Lyda!!! - ${requestNumber} ${request.url}`);
    response.end('' + requestNumber);
    return;
  }

  if (request.url === '/gerasimos') {
    response.write(`Hi Gerasimos!!! - ${requestNumber} ${request.url}`);
    response.end();
    return;
  }

  if (request.url === '/') {
    const rs = fs.createReadStream(`./static/index.html`);
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

function processAllFieldsOfTheForm(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      res.writeHead(200, {
          'content-type': 'text/plain',
        });
      res.write(`hello my name is: ${fields.firstname} ,
      my lastname is: ${fields.lastname} and
      I am: ${fields.age} years old`);
      res.end();
    });
}

server.listen(8090);
console.log('Listening on port 8090');
