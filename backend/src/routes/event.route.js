import express from "express";
import { createEvent, getMyEvents, updateEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createEvent);
router.get("/", verifyJWT, getMyEvents);
router.put("/:id", verifyJWT, updateEvent);

export default router;
