import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import acrossRouter from "./routes/across";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(acrossRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started");
});
