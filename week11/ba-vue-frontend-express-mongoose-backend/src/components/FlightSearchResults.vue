<template>
<div>
  <h2>Search Results for {{ origin }} to {{ destination }}</h2>


  <div v-if="error !== null">
    We were unable to process your flight search. Please try again shortly.
  </div>
  <div v-else-if="loading">
    Loading results...
  </div>
  <div v-else>

    <div 
      v-for="flight in flights" v-bind:key="flight.id"
      class="results" 
      
    >  
      <router-link :to="{ name: 'FlightDetails', params: {  flightId: flight._id } }">
        <div>
          {{ flight.flight_number  }} ({{ flight.airplane.name }})
          -
          {{ flight.departure_date }}
        </div>
      </router-link>

    </div><!-- v-for -->
    
  </div><!-- v-else -->



</div>
</template>

<script>

const BASE_URL = 'http://localhost:3000';

import axios from 'axios';

export default {
  name: 'FlightSearchResults',
  props: ['origin', 'destination'],
  // this.origin

  data(){
    return {
      flights: [],
      loading: true,
      error: null,
    };
  },

  // React: componentDidMount()
  // Vue:
  async mounted(){
    console.log('Mounted!');

    try {
      const res = await axios.get(`${BASE_URL}/flights/search/${this.origin}/${this.destination}`);
      console.log('flights:', res.data);
      this.flights = res.data;  // Save the array of flight results into state for render
      // this.setFlights( res.data )
      this.loading = false;     // No longer loading!
    } catch( err ){
      console.error('Error loading flight search results:', err);
      // console.dir( err );
      // debugger; // this will work because the dev server publishes a 'source map'
      // this.error = err.response.data.error;
      this.error = err; 
      this.loading = false;
    }


  }, // mounted()

  methods: {

    selectFlight( id ){
      // Formerly used like this:
      //   <div @click="selectFlight( flight.id )"
      console.log(`Selected flight!`, id);
      // this.props.history.push( `/flights/${id}` )
      this.$router.push({  
        name: 'FlightDetails',
        params: {  flightId: id }  // implies /flights/:flightId
       });
    
    }, // selectFlight()

  }, // methods

}
</script>

<style scoped>

  .results div {
    cursor: pointer;
    text-decoration: none;
    width: 30vw;
    margin: 0 auto;
  }

  .results a {
    text-decoration: none;
    color: black;
  }

  .results div:hover {
    text-decoration: underline;
    /* font-weight: bold; */
    background-color: lightblue;
  }


</style>