const express = require("express");
const router = express.Router();
const pool = require("../database");

// Get patient information
router.get("/:healthId", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT health_id, name, gender, age, phone, address FROM patients WHERE health_id = $1",
      [req.params.healthId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update patient information
router.put("/:healthId", async (req, res) => {
  const { name, gender, age, phone, address } = req.body;

  try {
    const result = await pool.query(
      `UPDATE patients 
       SET name = $1, gender = $2, age = $3, phone = $4, address = $5
       WHERE health_id = $6`,
      [name, gender, age, phone, address, req.params.healthId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json({ message: "Patient updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get medical conditions
router.get("/:healthId/conditions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, condition FROM medical_conditions WHERE health_id = $1",
      [req.params.healthId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a medical condition
router.post("/:healthId/conditions", async (req, res) => {
  const { condition } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO medical_conditions (health_id, condition) VALUES ($1, $2) RETURNING id",
      [req.params.healthId, condition]
    );

    res.json({ message: "Condition added", id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a medical condition
router.delete("/:healthId/conditions/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM medical_conditions WHERE id = $1",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Condition not found" });
    }

    res.json({ message: "Condition deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get allergies
router.get("/:healthId/allergies", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, allergy FROM allergies WHERE health_id = $1",
      [req.params.healthId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add an allergy
router.post("/:healthId/allergies", async (req, res) => {
  const { allergy } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO allergies (health_id, allergy) VALUES ($1, $2) RETURNING id",
      [req.params.healthId, allergy]
    );

    res.json({ message: "Allergy added", id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an allergy
router.delete("/:healthId/allergies/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM allergies WHERE id = $1",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Allergy not found" });
    }

    res.json({ message: "Allergy deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
