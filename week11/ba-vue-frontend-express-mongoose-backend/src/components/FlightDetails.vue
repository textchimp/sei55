<template>
<div>
  <h2>Flight Details</h2>

  <div v-if="error !== null">
    There was a problem loading the flight details. Please try again.
  </div>
  <div v-else-if="loading">
    Loading flight details...
  </div>
  <div v-else>

    <h4>Flight {{ flight.flight_number }}</h4>

    <div class="departure_date">
      <strong>Departure Date:</strong>
      {{ flight.departure_date }}
    </div>

    <div class="origin">
      <strong>Origin:</strong>
      {{ flight.origin }}
    </div>

    <div class="destination">
      <strong>Destination:</strong>
      {{ flight.destination }}
    </div>

    <div class="airplane">
      <strong>Aircraft:</strong>
      {{ flight.airplane.name }}
    </div>

    <ReservationConfirm 
     v-if="selectedSeat.row !== null"
     :row="selectedSeat.row"
     :col="selectedSeat.col | seatColToLetter"
     @seat-confirmed="handleSeatConfirmed"
    />

    <div v-if="confirmationMessage.length > 0" class="confirmation">
      {{ confirmationMessage }}
    </div>

    <div class="seating">

      <div v-for="row in flight.airplane.rows" :key="row">
        {{ row }} 
         <div v-for="col in flight.airplane.cols" :key="col"
           :class="['planeSeat', showAisle(col), seatStatus(row, col) ]"
           @click="selectSeat(row, col)"
         >

          {{ col | seatColToLetter }}
          

         </div>
        {{ row }}
      </div>

    </div><!-- .seating -->



  </div><!-- v-else showing flight details -->


</div>
</template>

<script>
const BASE_URL = 'http://localhost:3000';

const FAKE_USER_ID = 3; // this must match the fake ID in the Rails controller

import axios from 'axios';

import ReservationConfirm from './ReservationConfirm';

window.seatIterations = 0; // sneaky global var for debugging

export default {
  name: 'FlightDetails',
  props: [ 'flightId' ], // this prop comes from the router params

  // Declare the child components that will be used
  // by the current component
  components: { ReservationConfirm },

  data(){
    return {
      flight: {},
      reservations: {}, // now arriving separately, not nested within flight
      loading: true,
      error: null,

      // Keep track of the user's choice of seat
      selectedSeat: {
        row: null,
        col: null
      },

      confirmationMessage: '', // for reservation confirm

    };
  }, // data()

  mounted(){
    this.fetchFlight( this.flightId );

    // setInterval( () => this.fetchFlight(this.flightId), 2000 ); // polling the backend for updates

  }, // mounted()

  methods: {
    
    async fetchFlight( id ){

      try {
        const res = await axios.get(`${BASE_URL}/flights/${id}`);
        console.log('flight data:', res.data);
        
        this.flight = res.data.flight;
        this.reservations = res.data.reservations;

        this.loading = false;
      } catch( err ){
        console.error('Error loading flight details', err);
        this.loading = false;
        this.error = err;
      }

    }, // fetchFlight()

    showAisle( column ){
      return column === (this.flight.airplane.cols / 2) ? 'aisle' : '';
    }, // showAisle()

    // seatColToLetter( column ){
    //   // Turn 1 into A, 2 into B, etc
    //   // if( column === 1 ){
    //   //   return 'A';
    //   // } else if( column === 2 ){
    //   //   return 'B';
    //   // }

    //   // const array = [ '', 'A', 'B', 'C', 'D', 'E', 'F' ];
    //   // return array[ column ];

    //   return String.fromCharCode( 64 + column );

    // }, // seatColToLetter()

    seatStatus(row, col){

      // for / forEach  : this.flight.reservations
      //
      // .find, .some

      // this.flight.reservations.forEach( res => {
      //   console.log(row, col, 'res:', res);  
      //   if( ??????????????????????????????? ){
      //     return 'occupied';
      //   }      
      // });

      // const found = this.flight.reservations.some( res => row === res.row && col === res.col  );
      // return found ? 'occupied' : 'available';

      // Homework: HOW to avoid this nested loop for an improved efficiency/
      // time complexity? 
      // Construct a 'fast lookup table', i.e. an object/hash which has keys like
      // '10-2': 1,
      // '10-3': 1,


      if( row === this.selectedSeat.row  &&  col === this.selectedSeat.col ){
        return 'selected'; 
      }

      window.seatIterations++; 

      // Instead of a loop over the reservations array, we check if a key is set in
      // the reservations object:
      const resKey = `${row}-${col}`;
      if( resKey in this.reservations ){
        if( this.reservations[resKey] === FAKE_USER_ID ){
          return 'booked'; 
        } else {
          return 'occupied';
        }
      }

      // for (let i = 0; i < this.flight.reservations.length; i++) {
      //   window.seatIterations++; 
      //   const res = this.flight.reservations[i];
      //   if( row === res.row && col === res.col ){
      //     if( res.user_id === FAKE_USER_ID ){
      //       return 'booked'; // this is one of the logged-in user's own reservations
      //     } else {
      //       return 'occupied'; // can't use a forEach because of this!
      //     }
      //   }
      // } // for

      return 'available';

    }, // seatStatus()

    selectSeat(row, col){
      console.log('seat selected:', row, col);

      this.confirmationMessage = ''; // turn off any older confirmation message

      // This is an update to the component state - when you update a piece of component
      // state, the template is re-rendered automatically. This will include re-rendering
      // all the seats by looping over the rows and columns, and running the 'seatStatus(row, col)'
      // method to work out what extra class name to give the seat to show it as occupied, available,
      // or (as a result of this click) selected
      this.selectedSeat = { row, col }; // shorthand for { row: row, col: col };

    }, // selectSeat()


    async handleSeatConfirmed( a, b, c){

      console.log('FlightDetails::handleSeatConfirmed()');
      console.log('args:', a, b, c);

      try {
        const res = await axios.post(`${BASE_URL}/reservations`, { 
          row: this.selectedSeat.row,
          col: this.selectedSeat.col,
          flight_id: this.flightId  // or this.flight.id
        });

        console.log('reservation response', res.data);

        // Don't forget to add this new reservation to the list of reservations in
        // state, so it updates in the template to appear as booked
        // this.flight.reservations.push( res.data );

        // Update the reservation state by constructing a new key-value pair
        // in the same style as the hash created by the Rails backend  
        this.reservations[ `${res.data.row}-${res.data.col}` ] = res.data.user_id;

        this.confirmationMessage = 'Your seat was successfully booked.';
        this.selectedSeat = { row: null, col: null }; // stop the ReservationConfirm child from showing
      
      } catch( err ){
        console.error('Error saving reservation: ', err);
        this.error = err; // This will stop showing the seating diagram 
        // and show a generic error instead - is this what we want?
        // TODO: more specific error message for reservation issues
        // that doesn't hide the seating diagram
      }


    }, // handleSeatConfirmed()

  }, // methods

  filters: {
    seatColToLetter( column ){
      return String.fromCharCode( 64 + column );
    }, // seatColToLetter()
  },

}
</script>

<style>

  .seating {
    margin-top: 50px;
  }

  .seating .planeSeat{
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid #CCCCCC;
    margin: 4px;
    line-height: 40px;
    border-radius: 20% 20% 0 0;
    cursor: pointer;
  }

  .seating .planeSeat.occupied {
    background-color: grey;
    pointer-events: none;
  }

  .seating .planeSeat.selected {
    background-color: green;
  }

  .seating .planeSeat.booked {
    /* for seats already reserved by the logged-in user */
    background-color: orange;
    pointer-events: none; /* no double-booking of your own seats! */
  }

  



  .seating .planeSeat.aisle {
    margin-right: 20px;
  }

  .confirmation {
    margin-top: 20px;
    font-size: 18pt;
    font-weight: bold;
    color: green;
  }

</style>