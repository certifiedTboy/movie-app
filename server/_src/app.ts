import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./lib/exceptions/global-error-handler";
import { notFoundException } from "./lib/exceptions/not-found-exception";
import apiV1Routes from "./routes/apiV1Routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://movie-app-two-sepia-10.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", apiV1Routes);

app.get("/api/v1", (req, res) => {
  res.json({ message: "server is live..." });
});

app.use(globalErrorHandler);
app.use(notFoundException);
export default app;
