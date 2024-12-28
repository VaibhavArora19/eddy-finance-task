import express from "express";

import { getTransactionHistory } from "../controllers/transaction";

const router = express.Router();

router.get("/transaction/history/:address", getTransactionHistory);

export default router;
