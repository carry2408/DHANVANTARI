const db = require("./database");
const bcrypt = require("bcrypt");

console.log("🔄 Initializing database schema...");

db.serialize(() => {
  // Patients Table
  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      health_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      gender TEXT,
      age INTEGER,
      phone TEXT,
      address TEXT,
      password TEXT NOT NULL
    );
  `);

  // Medical Conditions Table
  db.run(`
    CREATE TABLE IF NOT EXISTS medical_conditions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      health_id TEXT NOT NULL,
      condition TEXT NOT NULL,
      FOREIGN KEY (health_id) REFERENCES patients(health_id)
    );
  `);

  // Allergies Table
  db.run(`
    CREATE TABLE IF NOT EXISTS allergies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      health_id TEXT NOT NULL,
      allergy TEXT NOT NULL,
      FOREIGN KEY (health_id) REFERENCES patients(health_id)
    );
  `);

  // Hospitals Table
  db.run(`
    CREATE TABLE IF NOT EXISTS hospitals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hospital_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      address TEXT,
      password TEXT NOT NULL
    );
  `);

  // Medical Reports Table
  db.run(`
    CREATE TABLE IF NOT EXISTS medical_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      health_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      file_path TEXT,
      date TEXT,
      FOREIGN KEY (health_id) REFERENCES patients(health_id)
    );
  `);

  // Doctor Login Table
  db.run(`
    CREATE TABLE IF NOT EXISTS doctor_logins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doctor_id TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  console.log("✓ All tables created");

  console.log("\n🔄 Inserting sample data...");

  // Insert sample patient
  bcrypt.hash("patient123", 10, (err, hash) => {
    db.run(
      `INSERT OR IGNORE INTO patients (health_id, name, gender, age, phone, address, password)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ["HV123456789", "John Doe", "Male", 30, "9876543210", "Sample City", hash]
    );
  });

  // Insert sample medical condition
  db.run(
    `INSERT OR IGNORE INTO medical_conditions (health_id, condition)
     VALUES ("HV123456789", "Diabetes")`
  );

  // Insert sample allergy
  db.run(
    `INSERT OR IGNORE INTO allergies (health_id, allergy)
     VALUES ("HV123456789", "Peanuts")`
  );

  // Insert sample hospital
  bcrypt.hash("hospital123", 10, (err, hash) => {
    db.run(
      `INSERT OR IGNORE INTO hospitals (hospital_id, name, address, password)
       VALUES (?, ?, ?, ?)`,
      ["HOSP12345", "City General Hospital", "Main Street", hash]
    );
  });

  // Insert sample doctor login
  bcrypt.hash("doctor123", 10, (err, hash) => {
    db.run(
      `INSERT OR IGNORE INTO doctor_logins (doctor_id, password)
       VALUES (?, ?)`,
      ["DOC999", hash]
    );
  });

  // Insert sample reports
  db.run(
    `INSERT OR IGNORE INTO medical_reports (health_id, title, description, file_path, date)
     VALUES ("HV123456789", "Blood Test", "Normal ranges", NULL, "2024-01-01")`
  );
  db.run(
    `INSERT OR IGNORE INTO medical_reports (health_id, title, description, file_path, date)
     VALUES ("HV123456789", "X-Ray", "Chest clear", NULL, "2024-02-10")`
  );

  console.log("\n✅ Database initialization complete!");

  console.log(`
📋 Login Credentials:
   Patient: HV123456789 / patient123
   Hospital: HOSP12345 / hospital123
   Doctor: DOC999 / doctor123
  `);
});
