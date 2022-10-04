
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
      user_id: Number, // placeholder/example

      // TODO: make this work
      user: {
        // how do I connect to a User object from another collection (table)
        // by using an ID here? Research 'Mongoose Reference'
      },

    }
  ],

}); // end of schema definition;


const model = mongoose.model('Flight', FlightSchema);

// CommonJS export syntax (i.e. you want to be able to 
//   require('./models/Flight') 
// from the seeds file or the server file
module.exports = model;