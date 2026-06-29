import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import status from "http-status";
import globalErrorHanlder from "./middlewares/globalErrorHandler";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(status.OK).json({
    success: true,
    message: "Welcome to Job Portal",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHanlder);

export default app;
