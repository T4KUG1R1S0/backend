const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  namaBarang: String,
  deskripsi: String,
  lokasi: String,
  tanggal: String,
  status: {
    type: String,
    enum: ["hilang", "ditemukan", "diambil"],
    default: "hilang"
  }
});

module.exports = mongoose.model("Item", ItemSchema);

const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// GET semua barang
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST barang hilang
router.post("/", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json({ message: "Barang berhasil dilaporkan" });
});

// UPDATE status (ADMIN)
router.put("/:id", async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Status berhasil diubah" });
});

module.exports = router;
