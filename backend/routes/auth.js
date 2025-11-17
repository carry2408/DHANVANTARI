const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Patient Login
router.post("/patient/login", (req, res) => {
  const { healthId, password } = req.body;

  db.get(
    "SELECT * FROM patients WHERE health_id = ?",
    [healthId],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(404).json({ error: "Patient not found" });

      bcrypt.compare(password, user.password, (err, result) => {
        if (!result)
          return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign({ healthId: user.health_id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        res.json({ message: "Login successful", token });
      });
    }
  );
});

// Hospital Login
router.post("/hospital/login", (req, res) => {
  const { hospitalId, password } = req.body;

  db.get(
    "SELECT * FROM hospitals WHERE hospital_id = ?",
    [hospitalId],
    (err, hospital) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!hospital)
        return res.status(404).json({ error: "Hospital not found" });

      bcrypt.compare(password, hospital.password, (err, result) => {
        if (!result)
          return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign(
          { hospitalId: hospital.hospital_id },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.json({ message: "Login successful", token });
      });
    }
  );
});

// Doctor Login
router.post("/doctor/login", (req, res) => {
  const { doctorId, password } = req.body;

  db.get(
    "SELECT * FROM doctor_logins WHERE doctor_id = ?",
    [doctorId],
    (err, doctor) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!doctor) return res.status(404).json({ error: "Doctor not found" });

      bcrypt.compare(password, doctor.password, (err, result) => {
        if (!result)
          return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign(
          { doctorId: doctor.doctor_id },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.json({ message: "Login successful", token });
      });
    }
  );
});

module.exports = router;
