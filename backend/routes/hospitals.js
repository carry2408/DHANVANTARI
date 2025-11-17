const express = require("express");
const router = express.Router();
const db = require("../database");

// Get all hospitals
router.get("/", (req, res) => {
  db.all(
    "SELECT hospital_id, name, address FROM hospitals",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Get hospital by ID
router.get("/:hospitalId", (req, res) => {
  const { hospitalId } = req.params;

  db.get(
    "SELECT hospital_id, name, address FROM hospitals WHERE hospital_id = ?",
    [hospitalId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Hospital not found" });

      res.json(row);
    }
  );
});

module.exports = router;
