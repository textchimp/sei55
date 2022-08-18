
-- This is the "Create" of CRUD:
-- We want to add some specific user records to our 'users' table,
-- i.e. add some rows

-- This is called "seed" data - data that you pre-load into the website
-- e.g. before it's live and users can even create accounts,
-- so you can still test the site

INSERT INTO users ( id, name, email, password, profile_image, verified, age )
  VALUES (
    1,
    'Luke',
    'luke@ga.co',
    'chicken',
    'http://placekitten.com/200/200',
    1,   -- this is actually still a boolean, 1 means true
    100
  );
  
INSERT INTO users ( id, name, email, password, profile_image, verified, age )
  VALUES (
    2,
    'Kris',
    'kris@ga.co',
    'chicken',
    'http://placekitten.com/400/400',
    0,   -- this is actually still a boolean, 0 means false
    20
  );

INSERT INTO users ( id, name, email, password, profile_image, verified, age )
  VALUES (
    3,
    'Shayni',
    'shayni@ga.co',
    'chicken',
    'http://placekitten.com/100/100',
    0,   -- this is actually still a boolean, 0 means false
    26
  );
