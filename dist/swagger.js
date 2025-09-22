import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
const app = express();
// Swagger options
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Platform API",
            version: "1.0.0",
            description: "API documentation for job platform",
        },
        servers: [
            {
                url: "http://localhost:5000", // Update this according to your backend server
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ["dist/routes/*.js", "src/routes/*.ts"], // Path to your route files
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
