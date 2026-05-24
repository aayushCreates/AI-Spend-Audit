import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
import auditRouter from "./routes/audit.routes";
import cors from "cors";

const app = express();

dotenv.config();

app.use(morgan("dev"));

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/audit", auditRouter);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port} 🚀🚀🚀`);
});
