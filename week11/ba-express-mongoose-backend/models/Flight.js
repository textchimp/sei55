
// This is like a Rails app/models/flight.rb model file
// EXCEPT it's also like the db/schema.rb or like a migration
// to create the correct columns

const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({

  // Define the 'columns' for this 'table', (SQL)
  // OR
  // Define the 'properties' for this 'document'

  // Let's use snake_case field names so that they
  // match what is used in our Rails BA database;
  // In a pure full-stack JS app you would be more 
  // likely to use camelCase names, i.e. 'flightNumber'
  // not 'flight_number'

  flight_number: {
    type: String, // 'String' is the JS constructor for a string
    required: true,
    // default: 'BA666'
  },  
  origin: String,
  destination: String,
  departure_date: Date,

  airplane: {
    name: String,
    rows: Number,
    cols: Number
  },

  reservations: [
    {
      row: Number,
      col: Number,

      // user_id: Number, // placeholder/example
      user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User' // 'a Reservation belongs to a User'
      }

    }
  ],

}); // end of schema definition;




// Adding custom model methods (just like Rails model class files!)

FlightSchema.methods.saveReservation = async function(row, col, user){

  // Why write this method? We have some 'denormalization' in this
  // database, with Flight documents containing an array of their
  // reservations, and we have duplicated that data in User documents,
  // which also have a list of the reservations for that user. This
  // makes it more convenient to query those documents - we can do a
  // single query to get a User and their list of reservations (with a
  // link to the Flight the reservation belongs to); and we can ALSO
  // do a single query to get a Flight and its list of reservations
  // (with a link to the User who the reservation belongs to). 
  //
  // The cost of this convenient duplication is that we now always
  // have TWO places we need to save or update a reservation. So the
  // more efficient READING of reservation data creates more work when
  // WRITING that data. We have to remember to update both lists of
  // reservations - for the user involved, and for the flight
  // involved.
  //
  // The easiest way to make sure we don't forget to do either of them
  // is to write a method for the Flight model (although you could
  // equally argue it should live in the User model instead) which
  // does both for us, with a simple interface: we call it on a flight
  // object, and pass a row, col, and User object. It adds a
  // reservation to the flight it's called on ('this') and also to the
  // User object.
  //
  // NOTE that we can't define this model method as an arrow function
  // because Mongoose needs to set the value of 'this' to refer to
  // "the current flight" for us i.e. if we write
  //    f1.saveReservation(12, 3, currentUser) 
  // ...then 'this' will refer to // 'f1'


  // Save our new reservation into both the current flight
  // (and include the id for the reference to the User),
  this.reservations.push( { row, col, user: user } );  
  await this.save(); // actually save the changes on the line above to the DB

  // ....and also into the User (including the id for the Flight reference)
  user.reservations.push( { row, col, flight: this } ); 
  await user.save();

  return this; // so you can chain this method with other Mongoose methods, if you want to!
}; // saveReservation()






const model = mongoose.model('Flight', FlightSchema);

// CommonJS export syntax (i.e. you want to be able to 
//   require('./models/Flight') 
// from the seeds file or the server file
module.exports = model;