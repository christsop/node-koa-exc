export const responseTime = async (ctx, next) => {
  console.log(` --> Request -${ctx.request.url}- duraton START`);

  const startTime = +new Date();
  await next();
  ctx.duration = +new Date() - startTime;

  console.log(` --> Request -${ctx.request.url}- duraton END ${ctx.duration} ms`);
};
