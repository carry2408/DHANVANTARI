const express = require("express");
const router = express.Router();
const pool = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 Helper: Create JWT token
function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
}

// 🧍 Patient Login
router.post("/patient/login", async (req, res) => {
  const { healthId, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM patients WHERE health_id = $1",
      [healthId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    
    if (!valid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = createToken({ healthId: user.health_id });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🏥 Hospital Login
router.post("/hospital/login", async (req, res) => {
  const { hospitalId, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM hospitals WHERE hospital_id = $1",
      [hospitalId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    const hospital = result.rows[0];
    const valid = await bcrypt.compare(password, hospital.password);
    
    if (!valid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = createToken({ hospitalId: hospital.hospital_id });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👨‍⚕️ Doctor Login
router.post("/doctor/login", async (req, res) => {
  const { doctorId, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM doctor_logins WHERE doctor_id = $1",
      [doctorId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const doctor = result.rows[0];
    const valid = await bcrypt.compare(password, doctor.password);
    
    if (!valid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = createToken({ doctorId: doctor.doctor_id });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🧾 Patient Register
router.post("/patient/register", async (req, res) => {
  res.json({ message: "Registration endpoint is under construction." });
  const { healthId, password, name, gender, age, phone, address } = req.body;

  if (!healthId || !password || !name) {
    return res.status(400).json({ error: "Health ID, password and name are required." });
  }

  try {
    // Check if user exists
    const exists = await pool.query(
      "SELECT health_id FROM patients WHERE health_id = $1",
      [healthId]
    );

    if (exists.rows.length > 0) {
      return res.status(409).json({ error: "Health ID already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new patient
    const insert = await pool.query(
      `INSERT INTO patients 
        (health_id, password, name, gender, age, phone, address)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING health_id, name`,
      [healthId, hashedPassword, name, gender, age, phone, address]
    );

    return res.status(201).json({
      message: "Patient registered successfully",
      patient: insert.rows[0]
    });

  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
