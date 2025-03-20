import express from "express";
import helmet from "helmet";
import connectDB from "./utils/database.js";
import formRouter from "./router/formRouter.js"
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT;
const app = express();
app.use(express.json()); // parse the incoming request


const corsOptions = {
  origin: process.env.FRONTEND_URL,
  method: "GET,POST,PUT,PATCH,HEAD", //not added delete as not required
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
); // for security but here not required

morgan.token("current-time", () => {
  const date =
    "Date " +
    new Date().toLocaleDateString() +
    " and time is " +
    new Date().toLocaleTimeString();
  return date;
});

app.use(
  morgan(
    "the method is :method status is :status and current-time is :current-time"
  )
);

app.get("/", (req, res) => {
  res.json({
   port:"Server is running on "+PORT
});
});

app.use("/api/form",formRouter);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
