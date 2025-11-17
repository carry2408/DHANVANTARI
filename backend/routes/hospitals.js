const express = require("express");
const router = express.Router();
const db = require("../database");

// Get all hospitals
router.get("/", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT hospital_id, name, address FROM hospitals"
    );
    const rows = stmt.all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific hospital
router.get("/:hospitalId", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT hospital_id, name, address FROM hospitals WHERE hospital_id = ?"
    );
    const row = stmt.get(req.params.hospitalId);

    if (!row)
      return res.status(404).json({ error: "Hospital not found" });

    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
