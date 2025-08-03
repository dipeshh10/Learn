-- Fix null names in users table
UPDATE users SET name = 'Unknown' WHERE name IS NULL;

-- Alter the table to prevent future nulls
default value for name column
ALTER TABLE users ALTER COLUMN name SET DEFAULT 'Unknown';
ALTER TABLE users ALTER COLUMN name SET NOT NULL;
