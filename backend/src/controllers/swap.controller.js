import { Event } from "../models/event.model.js";
import { SwapRequest } from "../models/swapRequest.model.js";

export const getSwappableSlots = async (req, res) => {
  try {
    const slots = await Event.find({
      userId: { $ne: req.user.id },
      status: "SWAPPABLE"
    });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const requestSwap = async (req, res) => {
  try {
    const { mySlotId, theirSlotId } = req.body;
    const mySlot = await Event.findById(mySlotId);
    const theirSlot = await Event.findById(theirSlotId);

    if (!mySlot || !theirSlot)
      return res.status(404).json({ message: "Slot not found" });

    if (mySlot.status !== "SWAPPABLE" || theirSlot.status !== "SWAPPABLE")
      return res.status(400).json({ message: "Slot not swappable" });

    const swap = await SwapRequest.create({
      mySlotId,
      theirSlotId,
      requesterId: req.user.id,
      receiverId: theirSlot.userId
    });

    mySlot.status = theirSlot.status = "SWAP_PENDING";
    await mySlot.save();
    await theirSlot.save();

    res.status(201).json({ message: "Swap request sent", swap });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const respondSwap = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { accept } = req.body;
    const request = await SwapRequest.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });

    const mySlot = await Event.findById(request.mySlotId);
    const theirSlot = await Event.findById(request.theirSlotId);

    if (accept) {
      const tempUser = mySlot.userId;
      mySlot.userId = theirSlot.userId;
      theirSlot.userId = tempUser;
      mySlot.status = theirSlot.status = "BUSY";
      request.status = "ACCEPTED";
    } else {
      mySlot.status = theirSlot.status = "SWAPPABLE";
      request.status = "REJECTED";
    }

    await mySlot.save();
    await theirSlot.save();
    await request.save();

    res.json({ message: accept ? "Swap accepted" : "Swap rejected" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
