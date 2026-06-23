import cors from "cors";
import express from "express";
import status from "http-status";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(status.OK).json({
    success: true,
    message: "Welcome to Job Portal",
  });
});

export default app;
