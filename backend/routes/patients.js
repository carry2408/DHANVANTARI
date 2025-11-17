const express = require("express");
const router = express.Router();
const db = require("../database");

// Get patient information
router.get("/:healthId", (req, res) => {
  const { healthId } = req.params;

  db.get(
    "SELECT health_id, name, gender, age, phone, address FROM patients WHERE health_id = ?",
    [healthId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Patient not found" });

      res.json(row);
    }
  );
});

// Update patient information
router.put("/:healthId", (req, res) => {
  const { healthId } = req.params;
  const { name, gender, age, phone, address } = req.body;

  db.run(
    `UPDATE patients 
     SET name = ?, gender = ?, age = ?, phone = ?, address = ? 
     WHERE health_id = ?`,
    [name, gender, age, phone, address, healthId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0)
        return res.status(404).json({ error: "Patient not found" });

      res.json({ message: "Patient updated successfully" });
    }
  );
});

// Get medical conditions
router.get("/:healthId/conditions", (req, res) => {
  const { healthId } = req.params;

  db.all(
    "SELECT id, condition FROM medical_conditions WHERE health_id = ?",
    [healthId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Add a medical condition
router.post("/:healthId/conditions", (req, res) => {
  const { healthId } = req.params;
  const { condition } = req.body;

  db.run(
    `INSERT INTO medical_conditions (health_id, condition) VALUES (?, ?)`,
    [healthId, condition],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Condition added", id: this.lastID });
    }
  );
});

// Delete a medical condition
router.delete("/:healthId/conditions/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM medical_conditions WHERE id = ?`,
    [id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0)
        return res.status(404).json({ error: "Condition not found" });

      res.json({ message: "Condition deleted" });
    }
  );
});

// Get allergies
router.get("/:healthId/allergies", (req, res) => {
  const { healthId } = req.params;

  db.all(
    "SELECT id, allergy FROM allergies WHERE health_id = ?",
    [healthId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Add an allergy
router.post("/:healthId/allergies", (req, res) => {
  const { healthId } = req.params;
  const { allergy } = req.body;

  db.run(
    `INSERT INTO allergies (health_id, allergy) VALUES (?, ?)`,
    [healthId, allergy],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Allergy added", id: this.lastID });
    }
  );
});

// Delete an allergy
router.delete("/:healthId/allergies/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM allergies WHERE id = ?`,
    [id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0)
        return res.status(404).json({ error: "Allergy not found" });

      res.json({ message: "Allergy deleted" });
    }
  );
});

module.exports = router;
