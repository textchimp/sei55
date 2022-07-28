// The Recipe Card
// 
// Never forget another recipe!
// 
// Create an object to hold information on your favorite recipe. It should have properties for title (a string), servings (a number), and ingredients (an array of strings).
// On separate lines (one console.log statement for each), log the recipe information so it looks like:
// 
// Mole
// Serves: 2
// Ingredients:
// cinnamon
// cumin
// cocoa

const recipe = {
  title: 'Butterscotch',
  servings: 2,
  ingredients: [ 'butter', 'scotch', 'sugar' ]
};

console.log( recipe.title );
console.log( `Serves: ${ recipe.servings }` );
console.log( `Ingredients: \n${ recipe.ingredients.join('\n') }`);
// console.log( `Ingredients:`);

// for (let i = 0; i < recipe.ingredients.length; i++) {
//   // const currentIngredient = recipe.ingredients[i];
//   console.log( recipe.ingredients[i] );
// }





// The Reading List
// 
// Keep track of which books you read and which books you want to read!
// 
//     Create an array of objects, where each object describes a book and has properties for the title (a string), author (a string), and alreadyRead (a boolean indicating if you read it yet).
//     Iterate through the array of books. For each book, log the book title and book author like so: "The Hobbit by J.R.R. Tolkien".
//     Now use an if/else statement to change the output depending on whether you read it yet or not. If you read it, log a string like 'You already read "The Hobbit" by J.R.R. Tolkien', and if not, log a string like 'You still need to read "The Lord of the Rings" by J.R.R. Tolkien.'

const books = [

  {
    title: 'It',
    author: 'Stephen King',
    alreadyRead: true
  },
  
  {
    title: `The Handmaid's Tale`,
    author: 'Margaret Atwood',
    alreadyRead: false
  },

  {
    title: `Annihilation`,
    author: 'Jeff Van der Meer',
    alreadyRead: true
  },

];

for( let i = 0; i < books.length; i++ ){
  
  const currentBook = books[i];

  if( currentBook.alreadyRead === true){
    console.log(`You already read ${readStatus} "${currentBook.title}" by ${currentBook.author}`);  
  } else {
    console.log(`You still need to read ${readStatus} "${currentBook.title}" by ${currentBook.author}`);  
  }

  // Less console.log repetition, using an extra variable
  //
  // let readStatus;
  // if( currentBook.alreadyRead === true ){
  //   readStatus = 'You already read';
  // }  else {
  //   readStatus = 'You still need to read';
  // }
  
  // console.log(`${readStatus} "${currentBook.title}" by ${currentBook.author}`);


  // Shortest: no else, thanks to default value for 'readStatus'
  //
  // let readStatus = 'You still need to read';
  // if( currentBook.alreadyRead ){
  //   readStatus = 'You already read';
  // } 
  
  // console.log(`${readStatus} "${currentBook.title}" by ${currentBook.author}`);

} // for



// The Movie Database
// 
// It's like IMDB, but much much smaller!
// 
//     Create an object to store the following information about your favorite movie: title (a string), duration (a number), and stars (an array of strings).
//     Create a function to print out the movie information like so: "Puff the Magic Dragon lasts for 30 minutes. Stars: Puff, Jackie, Living Sneezes."
//         Maybe the join method will be helpful here

console.log(`=========================`);

const favouriteMovie = {
  title: 'Inherent Vice',
  duration: 120,
  stars: [ 'Joaquim Phoenix', 'Josh Brolin', 'Reese Witherspoon' ],
};

const favouriteOtherMovie = {
  title: 'Point Break',
  duration: 140,
  stars: [ 'Joaquim Phoenix', 'Josh Brolin', 'Reese Witherspoon' ],
};


const printMovieInfo = function( movie ){

  console.log(`'${movie.title}' lasts for ${movie.duration} minutes. Stars: ${movie.stars.join(', ')}`);

}; // printMovieInfo()

// BONUS: make the printing function a method of the favouriteMovie object and use 'this' to print the data
// DOUBLE BONUS: make the object contain an array of movie objects, and the print function iterate through that list

printMovieInfo( favouriteMovie );
printMovieInfo( favouriteOtherMovie );