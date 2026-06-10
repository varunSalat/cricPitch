import express from "express";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import { corsConfig } from "./config";
import { swaggerSpec } from "./config/swagger";
import { errorMiddleware, notFoundMiddleware } from "./middlewares";

const app = express();

app.use(corsConfig);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
