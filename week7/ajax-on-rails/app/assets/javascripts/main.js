
// console.log('main.js loaded', $, axios);

// DOM ready? 

// API endpoint request, back to the same server that loaded
// the HTML page this JS is loading in
// This is a bit weird - in the React era, it's more common
// for one server to load the HTML page, and another server
// to host the API, i.e. GitHub (React) and Heroku (Rails)
// - BUT if we do that, we have to deal with cross-origin (CORS)
// security restrictions enforced by the browser
axios.get('/uptime.json')
  .then( res => {
    console.log('uptime response:', res.data);
    $('#uptime').html( res.data.output );
  })
  .catch( err => {
    console.error('Error loading /uptime:', err);
  });


axios.get('/cpuhog')
  .then( res => {
    console.log(`cpu response:`, res.data);
    $('#hog').html( res.data.hog );
  })
  .catch( err => {
    console.error('Error loading /cpuhog:', err)
  });


  axios.get('/messages')
    .then( res => {
      console.log('messages response:', res.data);

      $('#messageIndex').empty(); // clear loading message

      // Loop over the array (it comes from Message.all)
      // and append each message to the container div
      res.data.forEach( message => {

        $('#messageIndex').append(`
          <div class="message">
            <p>User: ${ message.user_id }</p>
            <blockquote>
              ${ message.content }
            </blockquote>
            <p>${ message.created_at }</p>
          </div>
        `);

      }); // for each message

    })
    .catch( err => {
      console.error('Error loading /messages', err);
    });
