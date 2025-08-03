// Automatically run fix_null_names.sql against database.sqlite
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'database.sqlite');
const sqlPath = path.join(__dirname, 'sql', 'fix_null_names.sql');

const sql = fs.readFileSync(sqlPath, 'utf8');
const db = new sqlite3.Database(dbPath);

db.exec(sql, (err) => {
  if (err) {
    console.error('Error running SQL:', err.message);
    process.exit(1);
  } else {
    console.log('SQL script executed successfully.');
    process.exit(0);
  }
});
