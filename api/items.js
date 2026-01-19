import mongoose from "mongoose";
import connectDB from "../db.js";

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String
});

const Item =
  mongoose.models.Item || mongoose.model("Item", ItemSchema);

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "GET") {
      const items = await Item.find();
      return res.status(200).json(items);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
