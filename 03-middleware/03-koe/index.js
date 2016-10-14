import Koe from './koe';

import { responseTime } from './middleware/response-time.js';
import { requestNumber } from './middleware/request-number.js';
import { hello } from './middleware/hello.js';

const app = Koe();

app.use(responseTime);
app.use(requestNumber);
app.use(hello);

app.listen(8090);

console.log('Listening on port 8090');
