const http = require('http');

const server = http.createServer();

const requestNumber = (() => {
  let requestNumber = 0;
  return async (ctx, next) => {
    ctx.requestNumber = ++requestNumber;
    console.log(` --> Request -${ctx.request.url}- Req number START -${ctx.requestNumber}-`);
    await next();
    console.log(` --> Request -${ctx.request.url}- Req number END -${ctx.requestNumber}-`);
  };
})();

const responseTime = async (ctx, next) => {
  console.log(` --> Request -${ctx.request.url}- duraton START`);

  const startTime = +new Date();
  await next();
  ctx.duration = +new Date() - startTime;

  console.log(` --> Request -${ctx.request.url}- duraton END ${ctx.duration} ms`);
};

const hello = async (ctx) => {
  const { request, response, requestNumber } = ctx;
  response.writeHead(200);
  response.write(`Hello World of Events!!! - ${requestNumber}`);
  response.end();

  console.log(` --> Request -${ctx.request.url}- Served ${requestNumber}`);
};

const middleware = [
  responseTime,
  requestNumber,
  hello,
];

const requestHandler = (request, response) => {
  const ctx = {
    request,
    response,
  };

  const dispatch = async (i) => {
    const fn = middleware[i];
    if (fn) fn(ctx, () => dispatch(i + 1));
  };

  dispatch(0);
};

server.on('request', requestHandler);
server.listen(8090);
console.log('Listening on port 8090');
