const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  name: String,
  email: String,
  passwordDigest: String,

  createdAt: {
    type: Date,
    default: Date.now, // automatically default this field to the current date
  },

  // Denormalization - duplicate *some* data where it makes sense;
  // i.e. both Flight AND User can keep a list of their related reservations

  reservations: [
    {
      row: Number,
      col: Number,
      // flight_id: String //?

      // Even though we are duplicating some reservation data in this User
      // model, we still want it to link to the Flight that it is a reservation
      // for, i.e. the Flight that it 'belongs_to'

      flight: {
        ref: 'Flight', // a reservation belongs to (refers to) a Flight
        type: mongoose.Schema.Types.ObjectID 
        // ^^^^^^^^^^^^^^^^^^^ i.e. this is the ID of a document in the Flight collection 
      }


    }
  ],

}); // Schema()

module.exports = mongoose.model('User', UserSchema);