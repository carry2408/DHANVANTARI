const express = require("express");
const router = express.Router();
const db = require("../database");

// Get patient information
router.get("/:healthId", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT health_id, name, gender, age, phone, address FROM patients WHERE health_id = ?"
    );
    const row = stmt.get(req.params.healthId);

    if (!row) return res.status(404).json({ error: "Patient not found" });

    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update patient information
router.put("/:healthId", (req, res) => {
  const { name, gender, age, phone, address } = req.body;

  try {
    const stmt = db.prepare(
      `UPDATE patients 
       SET name = ?, gender = ?, age = ?, phone = ?, address = ?
       WHERE health_id = ?`
    );
    const result = stmt.run(name, gender, age, phone, address, req.params.healthId);

    if (result.changes === 0)
      return res.status(404).json({ error: "Patient not found" });

    res.json({ message: "Patient updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get medical conditions
router.get("/:healthId/conditions", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT id, condition FROM medical_conditions WHERE health_id = ?"
    );
    const rows = stmt.all(req.params.healthId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a medical condition
router.post("/:healthId/conditions", (req, res) => {
  const { condition } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO medical_conditions (health_id, condition) VALUES (?, ?)"
    );
    const result = stmt.run(req.params.healthId, condition);

    res.json({ message: "Condition added", id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a medical condition
router.delete("/:healthId/conditions/:id", (req, res) => {
  try {
    const stmt = db.prepare("DELETE FROM medical_conditions WHERE id = ?");
    const result = stmt.run(req.params.id);

    if (result.changes === 0)
      return res.status(404).json({ error: "Condition not found" });

    res.json({ message: "Condition deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get allergies
router.get("/:healthId/allergies", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT id, allergy FROM allergies WHERE health_id = ?"
    );
    const rows = stmt.all(req.params.healthId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add an allergy
router.post("/:healthId/allergies", (req, res) => {
  const { allergy } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO allergies (health_id, allergy) VALUES (?, ?)"
    );
    const result = stmt.run(req.params.healthId, allergy);

    res.json({ message: "Allergy added", id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an allergy
router.delete("/:healthId/allergies/:id", (req, res) => {
  try {
    const stmt = db.prepare("DELETE FROM allergies WHERE id = ?");
    const result = stmt.run(req.params.id);

    if (result.changes === 0)
      return res.status(404).json({ error: "Allergy not found" });

    res.json({ message: "Allergy deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
