import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express'

import specs from './config_swagger.js'
import router from './routes/book_routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT;
const version = process.env.VERSION;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(`/api/${version}/book`, router);

app.listen(port, () => {
  console.log(`Example app version ${version} listening on port ${port}`);
});

mongoose.connect('mongodb+srv://'+ process.env.mongoDB_user + ':'+ process.env.mongoDB_password +'@'+ process.env.mongoDB_cluster_url +'/'+ process.env.mongoDB_dbName +'?retryWrites=true&w=majority',)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
