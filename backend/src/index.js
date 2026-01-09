import path from "path";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/connectdb.js";

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error while starting the service:", error);
  });