import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema({
  mySlotId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  theirSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING"
  }
}, { timestamps: true });

export const SwapRequest = mongoose.model("SwapRequest", swapRequestSchema);
