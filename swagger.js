import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'TruckBuster',
    description: 'Centrale de réservation pour camions'
  },
  host: 'localhost:5000/api/v1/book'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/book_routes.js'];


swaggerAutogen()(outputFile, routes, doc).then(async () => {
    await import('./server.js'); 
  });
  