
DROP TABLE IF EXISTS owners;

CREATE TABLE owners( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT
);

INSERT INTO owners( name, email ) VALUES ( 'Luke', 'luke@ga.co' );
INSERT INTO owners( name, email ) VALUES ( 'Kris', 'kris@ga.co' );
INSERT INTO owners( name, email ) VALUES ( 'Shay', 'shay@ga.co' );
INSERT INTO owners( name, email ) VALUES ( 'Dave', 'dave@ga.co' );

