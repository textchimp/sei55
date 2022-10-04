
const mongoose = require('mongoose');

// Load the Flight model
// Remember this will return the value of 'module.exports'
// as set at the end of that file:
//    const model = mongoose.model('Flight', FlightSchema);
//    module.exports = model;
const Flight = require('./Flight'); 

// Use the Mongoose syntax for connecting to the db;
// Note it uses a series of event handlers to avoid the
// big mess of options and callback functions that we had
// to give to the vanilla MongoDB connect method
//
// Noete the DB selection at the end of the URL, like giving a path
mongoose.connect('mongodb://127.0.0.1/ba');

const db = mongoose.connection;

db.on('error', err => {
  console.log('DB Connection error', err);
  process.exit( 1 ); // quit the program
});

db.once('open', async () => {
  console.log('Success! DB connected, model loaded.');


  // 1. ActiveRecord: Flight.destroy_all
  await Flight.deleteMany();

  // 2. ActiveRecord: Flight.create!( [] ) 
  const createdFlights = await Flight.create([
    {
        flight_number: 'BA123',
        country: 'Test Junk here', // this will be ignored by default
        origin: 'SYD',
        destination: 'MEL',
        departure_date: new Date('2022-11-20T04:20:00Z'),
        airplane: { name: '737 Max', rows: 20, cols: 6 },
        reservations: [
          { row: 1, col: 1, user_id: 10 },  // NOT real user_ids, just placeholders
          { row: 2, col: 3, user_id: 10 },
          { row: 3, col: 3, user_id: 11 },
        ] // reservations[]
    },
    
    {
      flight_number: 'BA456',
      origin: 'SYD',
      destination: 'MEL',
      departure_date: new Date('2022-11-23T04:20:00Z'),
      airplane: { name: '767', rows: 16, cols: 4 },
      reservations: [
        { row: 1, col: 1, user_id: 10 },  // NOT real user_ids, just placeholders
        { row: 1, col: 3, user_id: 11 },
        { row: 1, col: 3, user_id: 11 },
      ] // reservations[]
    },
  ]);

  console.log('flights:', createdFlights);

  // 3. ActiveRecord: Flight.all
  // const flights = await Flight.find();
  // console.log('flights:', flights);


  process.exit( 0 );
});