import { getQuote } from "../controllers/across";
import express from "express";

const router = express.Router();

router.post("/quote", getQuote);

export default router;
