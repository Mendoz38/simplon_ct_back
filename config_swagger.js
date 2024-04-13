import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nom de votre API",
      version: "1.0.0",
      description: "Description de votre API",
    },
  },
  apis: ["./routes/*.js"], // Spécifiez le chemin de vos fichiers de routes
};

const specs = swaggerJsdoc(options);

export default specs;