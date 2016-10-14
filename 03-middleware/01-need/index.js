const http = require('http');

const server = http.createServer();

const requestNumber = (() => {
  let requestNumber = 0;
  return async (ctx) => {
    ctx.requestNumber = ++requestNumber;
    console.log(` --> Request -${ctx.request.url}- Req number START -${ctx.requestNumber}-`);
    await responseTime();
    console.log(` --> Request -${ctx.request.url}- Req number END -${ctx.requestNumber}-`);
  };
})();

const responseTime = async (ctx) => {
  console.log(` --> Request -${ctx.request.url}- duraton START`);

  const startTime = +new Date();
  await hello();
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

const requestHandler = (request, response) => {
  const ctx = {
    request,
    response,
  };

  requestNumber(ctx);

  // const dispatch = async (i) => {
  //   const fn = middleware[i];
  //   if (!fn) return Promise.resolve();
  //   try {
  //     return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // }
};

server.on('request', requestHandler);
server.listen(8090);
console.log('Listening on port 8090');
