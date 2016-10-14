export const requestNumber = (() => {
  let requestNumber = 0;
  return async (ctx, next) => {
    ctx.requestNumber = ++requestNumber;
    console.log(` --> Request -${ctx.request.url}- Req number START -${ctx.requestNumber}-`);
    await next();
    console.log(` --> Request -${ctx.request.url}- Req number END -${ctx.requestNumber}-`);
  };
})();
