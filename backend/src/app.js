import express from "express";
import path from "path";
import fs from "fs";
import helmet from "helmet";
import userRouter from "./routes/user.routes.js";
import jdrouter from "./routes/analysis.routes.js";
const app = express();
const BASE_DIR = process.cwd();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/analysis", jdrouter);
const DIST_DIR = path.join(BASE_DIR, "../frontend/dist");
app.use(express.static(DIST_DIR));
app.use((req, res, next) => {
    return res.sendFile(path.join(DIST_DIR, "index.html"));
});
export default app;