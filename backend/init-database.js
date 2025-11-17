const Database = require("better-sqlite3");
const path = require("path");
require("dotenv").config();

const dbPath = path.resolve(__dirname, process.env.DATABASE_PATH);
const db = new Database(dbPath);

console.log("🔄 Initializing database...");

// TABLE CREATION
try {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS patients (
      health_id TEXT PRIMARY KEY,
      name TEXT,
      gender TEXT,
      age INTEGER,
      phone TEXT,
      address TEXT,
      password TEXT
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS medical_conditions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      health_id TEXT,
      condition TEXT
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS allergies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      health_id TEXT,
      allergy TEXT
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS hospitals (
      hospital_id TEXT PRIMARY KEY,
      name TEXT,
      address TEXT,
      password TEXT
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS doctor_logins (
      doctor_id TEXT PRIMARY KEY,
      password TEXT
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS medical_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      health_id TEXT,
      report_name TEXT,
      doctor_name TEXT,
      hospital_name TEXT,
      date TEXT,
      file_path TEXT
    )
  `).run();

  console.log("✅ Tables created successfully!");

} catch (err) {
  console.error("❌ Error creating tables:", err.message);
}

// SAMPLE DATA
try {
  // Patient
  db.prepare(`
    INSERT OR IGNORE INTO patients (health_id, name, gender, age, phone, address, password)
    VALUES ('HV123456789', 'John Doe', 'Male', 34, '9876543210', 'New York', '$2b$10$eJv9lGf8gZq7bN2PwIt8B.z4GJxk4I8BxHh3uQKENqJT9n05Nd3P6')
  `).run();

  // Medical Condition
  db.prepare(`
    INSERT OR IGNORE INTO medical_conditions (health_id, condition)
    VALUES ('HV123456789', 'Hypertension')
  `).run();

  // Allergy
  db.prepare(`
    INSERT OR IGNORE INTO allergies (health_id, allergy)
    VALUES ('HV123456789', 'Peanuts')
  `).run();

  // Hospital
  db.prepare(`
    INSERT OR IGNORE INTO hospitals (hospital_id, name, address, password)
    VALUES ('HOSP12345', 'City General Hospital', 'Main Road', '$2b$10$0Uj9PRR7dBEz0FgVtUchOuQjPPAVWl7ASnbM8gbKzFXWWx4IpHq6a')
  `).run();

  // Doctor Login
  db.prepare(`
    INSERT OR IGNORE INTO doctor_logins (doctor_id, password)
    VALUES ('DOC999', '$2b$10$Q1yY0xejP2wArMRR8pN0EOf1C.9iUoEMrAwt8pYzW8qgX2HFqRS4C')
  `).run();

  // Reports
  db.prepare(`
    INSERT OR IGNORE INTO medical_reports
    (health_id, report_name, doctor_name, hospital_name, date, file_path)
    VALUES 
    ('HV123456789', 'Blood Test', 'Dr. Sarah', 'City Hospital', '2024-01-10', 'sample1.pdf'),
    ('HV123456789', 'X-Ray Chest', 'Dr. John', 'Health Center', '2024-02-14', 'sample2.png')
  `).run();

  console.log("✅ Sample data inserted!");

} catch (err) {
  console.error("❌ Error inserting sample data:", err.message);
}

console.log("🎉 Database initialization complete!");
