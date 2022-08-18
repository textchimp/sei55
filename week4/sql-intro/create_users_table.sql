
-- This file defines the structure for creating a new table called "users"
-- It's also known as a "schema"

CREATE TABLE users (
  
  id INTEGER PRIMARY KEY,   -- make sure the values in this column are unique
  name TEXT,
  email TEXT,
  password TEXT,  -- CAREFUL! We don't really store passwords as plain text
  profile_image TEXT,
  verified BOOLEAN,
  age INTEGER  -- probably instead you would store a date of birth as a date field

); -- DON'T FORGET THE SEMICOLON