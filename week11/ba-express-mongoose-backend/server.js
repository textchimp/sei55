
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

mongoose.connect('mongodb://127.0.0.1/ba');
const db = mongoose.connection;

db.on('error', err => {
  console.log('Error connecting to DB server', err);
  process.exit( 1 );
  // TODO: leave Express server running, but set global error flag
  // and respond to all HTTP requests with an error message automatically
});



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