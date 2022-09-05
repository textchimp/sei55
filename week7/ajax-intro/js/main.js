/*

  Web 2.0: 

    - Single Page Apps: instead of rendering HTML on the server
    and sending it to the browser to be passively rendered, and
    re-loaded every time we navigate to a new page or perform an
    action such as 'Liking' a Post,

    we want to load a base HTML page once, and use JS to load data
    'in the background' from a remote server, and then manipulate
    the DOM to render this data into the browser.

    For this to work, we need our servers to send us back not a full
    HTML page as our response, but just a piece of "raw" data - 
    and the preferred format for this data is called "JSON",
    JavaScript Object Notation.


    API:   Application Programming Interface

    1st meaning: the set of methods provided by a library to access its features
    The ActiveRecord API: .find, .where, .create, .udpate, .destroy_all
    The jQuery API: $(), $().css(), $().html(), $().animate(), $().on()

    2nd meaning: a remote data source: numbersapi.com, themoviedb.org,
    generally returning "raw" data (as opposed to HTML pages) in JSON format


*/

console.log('main.js loaded!');

// We want to make an AJAX request to load the contents of a URL
// within Javascript
// 
// AJAX: 
// Asynchronous
// Javascript
// And
// XML  - a superset of HTML, using tags to create data structures
//      - superseded by JSON

const lookupNumber = function( number ){

  $('#results').html('Loading...'); // clear old results and show loading message

  // This is a built-in method for making AJAX requests
  const xhr = new XMLHttpRequest();  // make a new instance, i.e. this is the constructor 

  // $(document).on('load', function(){});

  // This is the ancient way of attaching callback functions (event handlers)
  // to specific events: an object, such as a DOM node, has a bunch of
  // properties with names 'onSOMETHING', and you save a function definition
  // as the value of that property (i.e. the value of that key); your function
  // will then be run by browser when that event happens.

  // xhr.onreadystatechange = function(){
  //   console.log(`Ready state change:`, xhr.readyState );
  //   console.log(`Response data: `, xhr.response);
  //   if( xhr.readyState === 4 ){
  //     // safe to work with xhr.response
  //   }
  // };

  xhr.onload = function(){
    // This function's code will run when XHR decides the response has finished loading
    console.log('actually available response:', xhr.response);

    const data = JSON.parse( xhr.response );

    $('#results')
      .empty() // remove previous results
      .prepend(`
        <h2>${ data.number }</h2>
        <h3>${ data.text }</h3>
      `); // add response text to end of page

  }; // onload handler

  // Tell it which URL to open, and HOW
  xhr.open('GET', `http://www.numbersapi.com/${ number }?json`);

  xhr.send(); // actually send the request; unlike Ruby, this line does NOT block

  // console.log('This line runs TOO SOON, before we have a response!');
  // console.log('response:', xhr.response ); // too soon


}; // lookupNumber()


// console.log( $('#numberQuery') );


$( function(){

  // Wait until the DOM is ready before querying it (to get #submitButton)  
  $('#submitButton').on('click', function(){
    
    // Use jQuery to get the value typed into the form
    const userNumber = $('#numberQuery').val();
    
    console.log(`Button clicked! Number is:`, userNumber);

    lookupNumber( userNumber ); // perform the AJAX request

  });

}); // DOM ready handler
