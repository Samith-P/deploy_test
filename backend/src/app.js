import express from "express";
import path from "path";
import dotenv from "dotenv";

import userRouter from "./routes/user.routes.js";
import jdrouter from "./routes/analysis.routes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/analysis", jdrouter);

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../frontend/dist"))
  );

  app.get((req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

export default app;
