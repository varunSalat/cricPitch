import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crictiph API",
      version: "1.0.0",
      description: "Crictiph Ground Booking API",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
