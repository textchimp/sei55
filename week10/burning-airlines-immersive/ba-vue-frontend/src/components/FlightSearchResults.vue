<template>
<div>
  <h2>Search Results for {{ origin }} to {{ destination }}</h2>

  <div v-if="loading">
    Loading results...
  </div>
  <div v-else>

    <div v-for="flight in flights">
      Flight number: {{ flight.flight_number  }}<br/>
      Departure Date: {{ flight.departure_date }}
    </div>    
    
  </div>

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
      this.loading = false;     // No longer loading!
    } catch( err ){
      console.error('Error loading flight search results:', err);
      this.error = err;
      this.loading = false;
    }


  }, // mounted()

}
</script>

<style>

</style>