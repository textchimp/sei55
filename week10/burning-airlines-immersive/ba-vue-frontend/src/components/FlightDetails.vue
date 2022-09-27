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
      {{ flight.departure_date_formatted }}
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


    <div class="seating">

      <div v-for="row in flight.airplane.rows" :key="row">
        {{ row }} 
         <div v-for="col in flight.airplane.cols" :key="col"
         :class="['planeSeat', showAisle(col), seatStatus(row, col) ]"
         >

          {{ col|seatColToLetter }}
          

         </div>
        {{ row }}
      </div>

    </div><!-- .seating -->



  </div><!-- v-else showing flight details -->


</div>
</template>

<script>
const BASE_URL = 'http://localhost:3000';

import axios from 'axios';

window.seatIterations = 0; // sneaky global var for debugging

export default {
  name: 'FlightDetails',
  props: [ 'flightId' ], // this prop comes from the router params

  data(){
    return {
      flight: {},
      loading: true,
      error: null
    };
  }, // data()

  mounted(){
    this.fetchFlight( this.flightId );
  }, // mounted()

  methods: {
    
    async fetchFlight( id ){

      try {
        const res = await axios.get(`${BASE_URL}/flights/${id}`);
        console.log('flight data:', res.data);
        this.flight = res.data;
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


      for (let i = 0; i < this.flight.reservations.length; i++) {
        window.seatIterations++; 
        const res = this.flight.reservations[i];
        if( row === res.row && col === res.col ){
          return 'occupied'; // can't use a forEach because of this!
        }
      } // for

      return 'available';




    }, // seatStatus()

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

  .seating .planeSeat.available {
    /* background-color: green; */
  }



  .seating .planeSeat.aisle {
    margin-right: 20px;
  }

</style>