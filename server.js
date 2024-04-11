import express from 'express';
const app = express()
const port = 3003
const version = "v1"

import router from './routes/book-routes.js';
//import router from './routes/user-routes.js';

app.use(`/api/${version}/book`,router)
//app.use(`/api/${version}/user`,router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})