export const hello = async (ctx) => {
  const { request, response, requestNumber } = ctx;
  response.writeHead(200);
  response.write(`Hello World of Events!!! - ${requestNumber}`);
  response.end();

  console.log(` --> Request -${ctx.request.url}- Served ${requestNumber}`);
};
