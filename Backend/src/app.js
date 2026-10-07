import express from "express";
import cors from "cors";
import env from "./config/env.js";
import router from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use("/api", router);
app.use(notFound);
app.use(errorHandler);

export default app;
