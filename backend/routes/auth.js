const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔐 Helper: Create JWT token
function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
}

// 🧍 Patient Login
router.post("/patient/login", (req, res) => {
  const { healthId, password } = req.body;

  try {
    const stmt = db.prepare("SELECT * FROM patients WHERE health_id = ?");
    const user = stmt.get(healthId);

    if (!user) return res.status(404).json({ error: "Patient not found" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = createToken({ healthId: user.health_id });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🏥 Hospital Login
router.post("/hospital/login", (req, res) => {
  const { hospitalId, password } = req.body;

  try {
    const stmt = db.prepare("SELECT * FROM hospitals WHERE hospital_id = ?");
    const hospital = stmt.get(hospitalId);

    if (!hospital)
      return res.status(404).json({ error: "Hospital not found" });

    const valid = bcrypt.compareSync(password, hospital.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = createToken({ hospitalId: hospital.hospital_id });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👨‍⚕️ Doctor Login
router.post("/doctor/login", (req, res) => {
  const { doctorId, password } = req.body;

  try {
    const stmt = db.prepare("SELECT * FROM doctor_logins WHERE doctor_id = ?");
    const doctor = stmt.get(doctorId);

    if (!doctor)
      return res.status(404).json({ error: "Doctor not found" });

    const valid = bcrypt.compareSync(password, doctor.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = createToken({ doctorId: doctor.doctor_id });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
