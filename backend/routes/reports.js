const express = require("express");
const router = express.Router();
const pool = require("../database");
const multer = require("multer");
const path = require("path");

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH || "./uploads");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get all reports for a patient
router.get("/patient/:healthId", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM medical_reports WHERE health_id = $1 ORDER BY date DESC",
      [req.params.healthId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new medical report
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { healthId, name, hospital, doctor, date, notes, status } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File upload required" });
    }

    const result = await pool.query(
      `INSERT INTO medical_reports 
       (health_id, report_name, hospital_name, doctor_name, date, file_path) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [healthId, name, hospital, doctor, date, req.file.filename]
    );

    res.json({ message: "Report added", id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing report
router.put("/:reportId", async (req, res) => {
  try {
    const { name, hospital, doctor, date } = req.body;

    const result = await pool.query(
      `UPDATE medical_reports 
       SET report_name = $1, hospital_name = $2, doctor_name = $3, date = $4
       WHERE id = $5`,
      [name, hospital, doctor, date, req.params.reportId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ message: "Report updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a report
router.delete("/:reportId", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM medical_reports WHERE id = $1",
      [req.params.reportId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
