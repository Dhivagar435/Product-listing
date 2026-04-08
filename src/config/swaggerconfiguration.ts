import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "School Project",
    version: "1.0.0",
    description: "My API Description",
  },
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, "../Routing/adminSwagger.ts"),
    path.join(__dirname, "../Routing/staffSwagger.ts"),
    path.join(__dirname, "../Routing/studentSwagger.ts"),
    path.join(__dirname, "../Routing/userSwagger.ts"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
