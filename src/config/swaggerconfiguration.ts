import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "SuperLabs Store API",
    version: "1.0.0",
    description: "Product Listing API Documentation",
  },
  servers: [
    { url: "http://192.168.1.103:6000/api", description: "Local server" }
  ],
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ["./src/modules/**/routes/*.ts"],  // points to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;