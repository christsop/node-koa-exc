const http = require('http');

export default function Koe() {

  const app = http.createServer();

  const middleware = [];

  app.use = (handler) => middleware.push(handler);

  const requestHandler = (request, response) => {
    const ctx = {
      request,
      response,
    };

    const dispatch = async (i) => {
      const currentMidleware = middleware[i];
      if (currentMidleware) currentMidleware(ctx, () => dispatch(i + 1));
    };

    dispatch(0);
  };

  app.on('request', requestHandler);
  
  return app;
};
