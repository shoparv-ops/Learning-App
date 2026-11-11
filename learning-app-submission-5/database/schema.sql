-- Run this SQL inside the database/schema assigned to your MariaDB account.
-- Do not run CREATE DATABASE unless your school account has permission to create databases.

CREATE TABLE IF NOT EXISTS learning_entries (
  id INT NOT NULL AUTO_INCREMENT,
  topic VARCHAR(150) NOT NULL,
  entry_date DATE NOT NULL,
  learned TEXT NOT NULL,
  confidence TINYINT NOT NULL,
  category VARCHAR(80) NOT NULL,
  PRIMARY KEY (id)
);

-- Optional test rows. Run these only if you want sample data.
INSERT INTO learning_entries (topic, entry_date, learned, confidence, category)
VALUES
  ('Java Programming', '2026-11-10', 'Practised classes, methods and basic object-oriented programming.', 4, 'Programming'),
  ('MariaDB', '2026-11-11', 'Created a table and practised SELECT and INSERT queries.', 3, 'Database');