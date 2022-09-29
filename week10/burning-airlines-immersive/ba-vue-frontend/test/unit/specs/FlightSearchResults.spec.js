
import Vue from 'vue';

import FlightSearchResults from '@/components/FlightSearchResults';

// TODO: how to import and fake axios here?
// Remember that axios.get() returns not data, but a promise
// that RESOLVES to the data.... Promise.resolve({ data: {} })

describe('FlightSearchResults', () => {

  it('should render without errors', () => {
  });

  it('should render a list of matching flights', () => {
    // 1. it should not show the loading message once the data has arrived
    // 2. it should call our faked axios.get() with a URL that includes the 
    //    origin and destination params passed from the Search component
    // 3. it should show a div for each flight which includes the flight number
  });

  it('should show an error message if the server responds with an error', () => {

  });

  it('should push the clicked flight result to the router as a show route', () => {
  });


});