const express = require("express");
const router = express.Router();
const db = require("../database");
const multer = require("multer");
const path = require("path");

// File storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Get all reports for a patient
router.get("/patient/:healthId", (req, res) => {
  const { healthId } = req.params;

  db.all(
    "SELECT * FROM medical_reports WHERE health_id = ?",
    [healthId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Add a report (with file upload)
router.post("/", upload.single("file"), (req, res) => {
  const { healthId, title, description, date } = req.body;
  const file_path = req.file ? req.file.filename : null;

  db.run(
    `INSERT INTO medical_reports (health_id, title, description, file_path, date)
     VALUES (?, ?, ?, ?, ?)`,
    [healthId, title, description, file_path, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Report added",
        id: this.lastID,
        file: file_path,
      });
    }
  );
});

// Update report details
router.put("/:reportId", (req, res) => {
  const { reportId } = req.params;
  const { title, description, date } = req.body;

  db.run(
    `UPDATE medical_reports
     SET title = ?, description = ?, date = ?
     WHERE id = ?`,
    [title, description, date, reportId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0)
        return res.status(404).json({ error: "Report not found" });

      res.json({ message: "Report updated successfully" });
    }
  );
});

// Delete a report
router.delete("/:reportId", (req, res) => {
  const { reportId } = req.params;

  db.run(
    `DELETE FROM medical_reports WHERE id = ?`,
    [reportId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0)
        return res.status(404).json({ error: "Report not found" });

      res.json({ message: "Report deleted" });
    }
  );
});

module.exports = router;
