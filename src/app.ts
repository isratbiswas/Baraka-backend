import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import { envVars } from "./app/config/env";
import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandle";
import notFound from "./app/middleware/notFound";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  })
);

// app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome  to  Baraka E-Shop Backend",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
