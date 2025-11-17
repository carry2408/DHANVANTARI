const express = require("express");
const router = express.Router();
const pool = require("../database");

// Get all hospitals
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT hospital_id, name, address FROM hospitals"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific hospital
router.get("/:hospitalId", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT hospital_id, name, address FROM hospitals WHERE hospital_id = $1",
      [req.params.hospitalId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
