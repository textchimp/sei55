
console.log(`Loaded!`);

// Callbacks review 

// A callback is a function which is given to
// another function as an argument.
// This works in JS because functions are 
// 'first-class' - they are data like any other
// kind, so they can be stored in variables,
// passed as arguments, etc
//
// Mostly we use callbacks as event handlers - i.e.,
// WHEN a click happens, run THIS function for me
//
// $('#button').on('click', sayHello);
// $('#button').on('click', function(){
//   // do something when the click happens
//
// });

const sayHello = function(){
  console.log('Hello!');  
};

const runNicely = function( callback ){
  console.log('About to run nicely');
  callback(); // run the provided argument as a function
  console.log('Have a nice day');
};



// const each = function( array, callback ){

//   // write a for loop which runs the callback
//   // and gives it each item from the array
//   for (let i = 0; i < array.length; i++) {
//     const element = array[i];
//     callback( element, i );
//   }

// };``

const bros = [ 'groucho', 'chico', 'harpo' ];

// each( [1,2,3], function(item, index){
//   console.log(`current item ${index}:`, item);
// });


// bros.each do |item|
//   puts item
// end


bros.forEach( function(currentItem, currentIndex, wholeArray){
  console.log(x);
} );

