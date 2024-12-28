import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import acrossRouter from "./routes/across";
import transactionRouter from "./routes/transaction";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(acrossRouter);
app.use(transactionRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started");
});
