
const express = require('express');
const app = express();
const PORT = 3000; // process.argv[2] to get from command like

const cors = require('cors');
// Use this CORS package as part of the Express "middleware stack"
app.use( cors() ); // set the CORS allow header for us on every request, for AJAX requests

// To get access to POSTed 'formdata' body content, we have to explicitly
// add a new middleware handler for it  (Rails does this automatically)
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT} ...`);
});

// Mongoose DB initialisation
const mongoose = require('mongoose');
const Flight   = require('./models/Flight'); // Flight model
const User     = require('./models/User');

mongoose.connect('mongodb://127.0.0.1/ba');
const db = mongoose.connection;

db.on('error', err => {
  console.log('Error connecting to DB server', err);
  process.exit( 1 );
  // TODO: leave Express server running, but set global error flag
  // and respond to all HTTP requests with an error message automatically
});


// Authentication

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const jwtAuthenticate = require('express-jwt');

console.log('jwta', jwtAuthenticate);

const checkAuth = () => {

  return jwtAuthenticate.expressjwt({
    secret: SERVER_SECRET_KEY, // check the token hasn't been tampered with
    algorithms: ['HS256'],
    requestProperty: 'auth'  // gives us 'req.auth'
  });

}; // checkAuth()

// TODO: This should be in a .env file which is not committed to this
// repo (because it's mentioned in your .gitignore), and loaded from 
// the shell environment using an NPM package like 'dotenv'
// - other sensitive data such as API access keys should also be stored
// this way.
// Also, use a command like 'md5' to generate a truly random secret key
const SERVER_SECRET_KEY = 'yourSecretKeyHereCHICKEN';

// bcrypt  - take a plaintext password and return an encrypted version a.k.a. "digest",
//           verify that a password given during login process is the matching password
//
// jsonwebtoken - create JWTs which encode a user ID in a tamper-proof 'signed' format
//                so the frontend can store it as proof of our login
//
// express-jwt  - Express 'middleware', like a plugin that Expres can use to provide
//                extra information to our route handler callbacks, in this case by
//                attaching something to the 'req' first agument, which will be 'req.auth'
//                - like the 'knock' gem in Rails
//
// 1. Create a POST /login to check credentials coming from a frontend form and return
//    to the frontend a JWT if the credentials entered match what is stored in the database.
//
// 2. Create a GET /current_user so we can request the relevant details about the logged-in user
//
// 3. Lock down certain routes to require authentication to be accessible, using the Express middleware system



// BA API routes

app.get('/', (req, res) => {
  console.log('Root route was requested.');
  res.json( { hello: 'there' } );
});

// Index of flights (for debugging): GET /flights
app.get('/flights', async (req, res) => {

  try {
    const flights = await Flight.find();
    res.json( flights );
  } catch( err ){
    console.error('Error loading all flights:', err);
    // res.sendStatus( 422 );
    res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()
  }

}); // GET /flights


// Search route: GET /flights/search/:origin/:destination
app.get('/flights/search/:origin/:destination', async (req, res) => {
  // res.json( req.params );

  try {

    const flights = await Flight.find({ 
      origin: req.params.origin,
      destination: req.params.destination,
    });

    res.json( flights );
  
  } catch( err ){
    console.error('Error searching flights', req.params, err);
    res.sendStatus( 422 );
  }

}); //  GET /flights/search/:origin/:destination


// Flight show route: GET /flights/:id
app.get('/flights/:id', async (req, res) => {

  try {

    const flight = await Flight.findOne( { _id: req.params.id } );

    const reservations = {};
    // for( const res of flight.reservations ){
    flight.reservations.forEach( res => {
      console.log('res', res);
      reservations[ `${res.row}-${res.col}` ] = res.user_id;
    });

    console.log('reservations', reservations);

    res.send({ flight, reservations });

  } catch( err ){
    console.log('Error finding flight by ID:', req.params, err);
    res.sendStatus( 422 );
  }

});

// Reservation booking route: POST /reservations
// TODO: need to tell Express to handle POSTed formdata
//  and then work out how to do a Mongoose query to 
//  find the reservation's flight (by ID), and push
//  a new reservation onto the flight's array of 
//  reservations

app.post('/reservations', async (req, res) => {
  console.log('POST /reservations');
  console.log('body:', req.body);

  // Strong params?
  const newReservation  = {
    row: req.body.row,
    col: req.body.col,
    user_id: 3 // Use the same ID as in FAKE_USER_ID in FlightDetails.vue
  };

  try {

    const result = await Flight.updateOne(
      
      // First argument: search object which specifies how to find the Flight
      // that you want to update
      // { _id: '633cd6ab5fa2059a48dbc4e9' },
      { _id: req.body.flight_id },

      // Second arguement: what update to perform, i.e. fields and their new values
      {
        // flight_number: 'BA789',
        // origin: 'SIN',
        // reservations: [ newReservation ]   // NOPE! *REPLACES* existing reservations
        $push: {
          reservations: newReservation
        }
      }

    ); // .updateOne()

    console.log('result of updateOne: ', result);

    if( result.matchedCount === 0 ){
      console.error('Flight not found for reservation update', result, req.body);
      // res.sendStatus( 422 );
      throw new Error('Flight not found by ID');
    }

    // Send reservation object as response to this AJAX request,
    // because Vue is expecting it, to add the new reservation into
    // state and update the seating diagram immediately
    res.json( newReservation ); 

  } catch( err ){
    console.error('Error updating flight to add reservation', err);
    res.sendStatus( 422 );
  }

});


// Login route
app.post('/login', async (req, res) => {

  console.log('login:', req.body);

  const { email, password } = req.body;
  // const email = req.body.email;
  // const password = req.body.password; 

  try {

    const user = await User.findOne({ email });  // { email: email }

    if( user && bcrypt.compareSync(password, user.passwordDigest) ){
      // correct credentials
      // res.json({ success: true })

      const token = jwt.sign(
        // the data to encode in the 'payload':
        { _id: user._id },
        // the secret key to use to encrypt the token - this is what ensures that although
        // the token payload can be READ by anyone, only the server can MODIFY the payload
        // by using the secret key - i.e. users can't change their user ID
        SERVER_SECRET_KEY,
        // expiry date/other config:
        { expiresIn: '72h' }  // 3 days
      );

      // strong params
      const filteredUser = {
        name: user.name,
        email: user.email
      }

      res.json({ token }); // TODO: why not include the user object in this response to save you at least one call to the /current_user API endpoint

    } else {
      // incorrect credentials: user not found (by email), or passwords don't match
      res.status( 401 ).json({ success: false }); // Unauthorized
    }

  } catch( err ){
    console.log('Error verifying login credentials:', err);
    res.sendStatus( 500 ); // Low-level error
  }



}); // POST /login


// Routes below this line only work for authenticated users

app.use( checkAuth() );  // provide req.auth (the User ID from the token) to all following routes

// Custom middleware, defined inline:
// Use the req.auth ID from the middleware above and try to look up a user with it -
// if found, attach to req.current_user for all the requests that follow this;
// if not found, return an error code
app.use( async (req, res, next) => {

  try {
    const user = await User.findOne({ _id: req.auth._id });

    if( user === null ){
      res.sendStatus( 401 ); // invalid/stale token
      // Note that by running a response method here, this middleware will not
      // allow any further routes to be handled
    } else {
      req.current_user = user; // add 'current_user' for the next route to access
      next(); // move on to the next route handler/middleware in this server
    }

  } catch( err ){
    console.log('Error querying User in auth middleware', err);
    res.sendStatus( 500 );
  }

});

// All routes below now have a 'req.current_user' defined

app.get('/current_user', (req, res) => {
  res.json( req.current_user );
});

app.get('/seekrits', (req, res) => {

  // permissions?
  // if( req.current_user.admin === true ){
  // }

  res.json({
    secret: 'I am an alien',
    name: req.current_user.name
  });

});