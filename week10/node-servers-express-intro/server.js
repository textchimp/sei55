
// This is the older Node.js syntax for 
// importing code; it's equivalent to
//    import express from 'express';
//    import axios from 'axios';
// This is called "CommonJS" import syntax,
// and it's gradually being replaced by
// the 'import from' syntax we've been
// using in our React/Vue apps
const express = require('express');

// Use the express function returned from
// the package require() above to create
// a webserver app object
const app = express();

// What about a database?
// SQL: 'sequel'

// MERN:
// MongoDB, Express, React, Node


const ejs = require('ejs');
// Use the EJS template system as an Express plugin
app.set('view-engine', ejs);

// Use the 'public' folder as an assets/'passthrough' folder
app.use( express.static('public') );


app.listen( 8000, () => {
  console.log('Now listening at http://localhost:8000 ...');
});


// Define the routes that we want to respond to, 
// and how we should respond to them

// get '/' do
//   "Here is the content"
// end

app.get( '/', (req, res) => {
  console.log('Someone requested /');
  res.send('<h1>Hello World from Express!!</h1>');
}); // GET / 


app.get( '/guestbook', (req, res) => {
  res.send('<h2>Sign my guestbook!</h2><img src="http://www.fillmurray.com/300/200"/>');
});


app.get( '/dogs/:id', (req, res) => {
  console.log('params:', req.params);
  console.log('querystring:', req.query);
  
  // console.log(req);
  // res.send(`Your dog info, sir! ${ req.params.id } `);

  // res.json( { name: 'Rufus', roundness: 9 } );
  res.json( req.params );

});

app.get( '/dogs/:id/:action', (req, res) => {
  console.log('params:', req.params);
  res.send(`Your dog action info, sir! ${ req.params.id } `);
});


app.get( '/hello/:person', (req, res) => {
  const message = 'This is an example message';
  res.render('greeting.ejs', {
    msg: message,
    number: Math.random(),
    name: req.params.person
  });
});