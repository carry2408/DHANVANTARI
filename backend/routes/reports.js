const express = require("express");
const router = express.Router();
const db = require("../database");
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
router.get("/patient/:healthId", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM medical_reports WHERE health_id = ? ORDER BY date DESC"
    );
    const rows = stmt.all(req.params.healthId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new medical report
router.post("/", upload.single("file"), (req, res) => {
  try {
    const { healthId, name, hospital, doctor, date, notes, status } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File upload required" });
    }

    const stmt = db.prepare(
      `INSERT INTO medical_reports 
       (health_id, name, hospital, doctor, date, file_path, notes, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );

    const result = stmt.run(
      healthId,
      name,
      hospital,
      doctor,
      date,
      req.file.filename,
      notes || "",
      status || "Normal"
    );

    res.json({ message: "Report added", id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing report
router.put("/:reportId", (req, res) => {
  try {
    const { name, hospital, doctor, date, notes, status } = req.body;

    const stmt = db.prepare(
      `UPDATE medical_reports 
       SET name = ?, hospital = ?, doctor = ?, date = ?, notes = ?, status = ?
       WHERE id = ?`
    );

    const result = stmt.run(name, hospital, doctor, date, notes, status, req.params.reportId);

    if (result.changes === 0)
      return res.status(404).json({ error: "Report not found" });

    res.json({ message: "Report updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a report
router.delete("/:reportId", (req, res) => {
  try {
    const stmt = db.prepare("DELETE FROM medical_reports WHERE id = ?");
    const result = stmt.run(req.params.reportId);

    if (result.changes === 0)
      return res.status(404).json({ error: "Report not found" });

    res.json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
