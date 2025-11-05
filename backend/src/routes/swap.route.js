import express from "express";
import { getSwappableSlots, requestSwap, respondSwap } from "../controllers/swap.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyJWT, getSwappableSlots);
router.post("/request", verifyJWT, requestSwap);
router.post("/response/:requestId", verifyJWT, respondSwap);

export default router;
