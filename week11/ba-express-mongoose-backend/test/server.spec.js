// Prerequisites for running this test suite:
// 
// 1. Install the following packages:
//      npm i mocha chai axios
//
// 2. Add to package.json scripts:
//     "test": "mocha test/",
//     "watch": "mocha --reporter=min -w  test/"
//
// 3. Capture server in server.js:
//     const server = app.listen(PORT, () => {
// .... and export at end of file:
//     module.exports = server; // export for the test suite require()
// .... so we can require() it in the before() action below
// (this makes it easier for the test suite to restart the server)
//
// 4. Make sure your MongoDB server is running, or you'll get a timeout error!
// TODO: use test version of MongoDB database instead of dev/prod version
// - see server.js for hints

const { expect } = require('chai'); // assertion library

// process.env.mode = 'testing';

// So we can delete the Flight model
// after every reload to prevent 'Cannot overwrite
// Flight model' errors when the test suite re-runs
const mongoose = require('mongoose');

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

describe('Express server', () => {

  let server;

  // Start the server ONCE at the START of the whole
  // testing process
  // NOT once before each example (that's what
  // beforeEach() is for)
  before( () => {
    server = require('../server');
    // console.log(server);
  });

  after( () => {
    // avoid 'address in use' errors when re-running tests
    server.close();

    // Avoid the 'cannot overwrite Flight model' errors
    delete mongoose.connection.models.Flight;
    delete mongoose.connection.models.User
    mongoose.connection.close();
  });

  describe('GET /flights', () => {

    let response;

    before( async () => {
      response = await axios.get(`${BASE_URL}/flights`);
    });



    it('returns an HTTP 200 success status', () =>{
      expect( response.status ).to.equal( 200 );
      // done();
    }); // it returns 200 success

    it('returns a valid JSON object with the correct number of flights', () => {
      expect( response.data.length ).to.equal( 2 );
      // TODO: Test using a TEST database, not the live one!
      // 1. Set an environment variable to 'testing' from
      // the test suite
      // 2. In server.js, check the process.env variable
      // and if its value is 'testing', connect to a test
      // version of the database - NOT the live/development
      // one
    });

    it('contains the correct information about the flights', () => {
      // console.log('res', response.data);
      expect( response.data[0].flight_number ).to.equal('BA123');
      expect( response.data[1].flight_number ).to.equal('BA456');

    });


  }); // GET /flights


  describe('GET /flights/search/:origin/:destination', () => {

    let response;

    before( async () => {
      response = await axios.get(`${BASE_URL}/flights/search/SYD/MEL`);
    });

    it('returns a HTTP 200 success status', () => {
      expect( response.status ).to.equal( 200 );
    });

    it('returns the correct number of results', () => {
      expect( response.data.length ).to.equal( 2 );
    });

    it('returns only flights with the specified origin and destination', () => {

      response.data.forEach( flight => {
        expect( flight.origin ).to.equal('SYD');
        expect( flight.destination ).to.equal('MEL');
      });

    });


  }); // GET /flights/search/:origin/:destination


}); // describe server
