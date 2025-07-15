import express from "express";
import dotenv from "dotenv";
import indexRoute from "./routes/index.route.js";
import instanceDB from "./config/singleton_pattern.js"
import cookieParser from "cookie-parser";
import { errorHandler }from "./handler/error-handler.js"

dotenv.config();
const app = express()
const PORT = process.env.PORT || 8000;

instanceDB;

app.use(express.json());
app.use(cookieParser());

indexRoute(app);

app.use(errorHandler);

app.use('*', (req, res) => {
  res.status(404).json({error: "Resource not found"});
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
})