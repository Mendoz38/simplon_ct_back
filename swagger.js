import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'TruckBuster',
    description: 'Centrale de réservation pour camions'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/book_routes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);

export default generateSwagger;