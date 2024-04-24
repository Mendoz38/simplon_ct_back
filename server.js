import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';import swaggerUi from 'swagger-ui-express';
import swaggerJson from './swagger-output.json' assert { type: "json" };


import router from './routes/book_routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT;
const version = "v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors());

app.use(`/api/${version}/book`, router);

// Serve Swagger UI à l'URL /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(port, () => {
  console.log(`TruckBuster app version ${version} listening on port ${port}`);
});

mongoose.connect('mongodb+srv://'+ process.env.mongoDB_user + ':'+ process.env.mongoDB_password +'@'+ process.env.mongoDB_cluster_url +'/'+ process.env.mongoDB_dbName +'?retryWrites=true&w=majority',)
  .then(() => console.log(`Connexion à MongoDB réussie sur la collection ${process.env.mongoDB_dbName} !`))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
