import Vue from 'vue';
import { mount } from '@vue/test-utils';
import sinon from 'sinon'; // mock library

import FlightSearchResults from '@/components/FlightSearchResults';

import axios from 'axios'; // so we can mock it

// Fake API test data like this in a test is called a 'fixture';
// it could be imported from another file to keep the test suite
// shorter
const fakeFlights = [
  {
    id: 1,
    flight_number: 'BA256',
    departure_date: '2022-03-01T04:20:00.000Z',
    origin: 'SYD',
    destination: 'MEL',
    airplane_id: 7,
    created_at: '2022-02-28T01:44:21.490Z',
    updated_at: '2022-02-28T01:44:21.490Z',
    airplane: {
      name: '747'
    }
  }, // First flight
  {
    id: 2,
    flight_number: 'BA512',
    departure_date: '2022-03-02T11:20:00.000Z',
    origin: 'SYD',
    destination: 'MEL',
    airplane_id: 7,
    created_at: '2022-02-28T01:44:21.504Z',
    updated_at: '2022-02-28T01:44:21.504Z',
    airplane: {
      name: '737 MAX'
    }
  } // second flight
];

const $router = {
  push: sinon.spy()
};

describe('FlightSearchResults.vue', () => {

  describe('successful API fetch', () => {


    let wrapper;
    beforeEach( () => {

      // Create a stubbed version of axios's `get` method that returns a promise,
      // which immediately resolves to the list of flights, since this is what
      // our component code is expecting from axios.
      // This is the version our component will use (instead of the original library version)
      axios.get = sinon.stub().returns( Promise.resolve( {data: fakeFlights} ) );


      wrapper = mount(FlightSearchResults, {
        mocks: { $router: $router },
        propsData: { origin: 'SYD', destination: 'MEL'  }, // fake props (from router)
        // stubs: ['router-link']  // fake router-link component (from router)
      });

      // spy - fake version of a function that lets
      //       you ask whether the function was called
      //       or not by the application code, and
      //       which arguments it was called with
      // stub - a spy which ALSO lets you fake
      //        the behaviour (i.e. the return value)
      //        of the function you are faking


    }); // beforeEach



    it('should render without errors', () => {
      expect( wrapper.text()).to.contain('Search Results for SYD to MEL');
      expect( wrapper.text()).to.contain('Loading results');
    }); // it renders without smoke pouring out of it

    it('should render a list of matching flights', async () => {
      // console.log('page:', wrapper.text() );

      // The axios.get() inside the component's mounted() method
      // returns a promise, and the component will not have access to the
      // AJAX response, and can't show the flights on its template, UNTIL
      // that axios promise resolves - the line below waits for this:
      await wrapper.vm.$nextTick();

      // console.log('page after waiting:', wrapper.text());

      // Test that our stubbed version (which is also a spy) was called with
      // the correct Rails API endpoint URL (including the test origin
      // & destination)
      // TODO: don't rely on hardcoded URLs - extract them into a config file
      // that is imported by the component, and also imported by this test
      // spec file
      expect( axios.get ).to.have.been.calledWith( 'http://localhost:3000/flights/search/SYD/MEL' );

      // It should stop showing the loading message once the response data arrives!
      expect( wrapper.text() ).to.not.contain('Loading flight results');

      const results = wrapper.findAll('div.results');

      // It should show the same number of results as in our fakeData flights array
      expect( results.length ).to.equal( 2 );

      // The first flight result should contain the flight number
      expect( results.at(0).text() ).to.contain('BA256');

      // The first flight result should also contain the airplane model
      expect( results.at(0).text() ).to.contain('747');

      // TODO: do the same checks for the second test flight

    }); // it renders flights



    it('should push the clicked result to the router', async () => {

        await wrapper.vm.$nextTick(); // wait for results to render

        const results = wrapper.findAll('div.results div'); 

        await results.at(0).trigger('click'); // click the result to trigger a push
        
        // expect( $router.push ).to.have.been.called

        expect( $router.push ).to.have.been.calledWith({
          name: 'FlightDetails',
          params: { flightId: 1 }
        })

    }); // it pushes to the router

  }); // API success


  describe('failed API fetch', () => {


    it('should show an error message', async () => {

      // Fake a version of axios.get that resolves with an error code
      // (the code is not as important as the fact that it rejects instead
      // of resolving - this is what triggers the 'catch' in the component's
      // AJAX fetch code)
      axios.get = sinon.stub().returns( Promise.reject( {status: 422} ) );

      const wrapper = mount(FlightSearchResults, {
        mocks: { $router: $router },
        propsData: { origin: 'SYD', destination: 'MEL'  }, // fake props (from router)
      });

      // Give the request time to respond with the rejected promise and update the page
      await wrapper.vm.$nextTick();

      // Assert that the error div is on the page
      expect( wrapper.find('div.error').exists() ).to.be.true;

    });

  }); // failed API request


}); // describe <FlightSearchResults>
