
// const first = (num) => {
//  
//   console.log('num:', num);
//   second( num + 1 );
//   console.log('End of first()');
// }; // first()

// const second = (secondNum) => {
//   console.log('secondNum:', secondNum);
//   third( secondNum + 10 );
//   console.log('End of second()');
// }; // second()

// const third = (thirdNum) => {
//   console.log('thirdNum:', thirdNum);
//   console.log('We are done!');
// }; // third()

// debugger;
// first( 1 );

const items = [ 'a', 'b', 'c', 'd', 'e', 'f' ];

// iterative solution:
// items.forEach(  item => console.log(item) );

const recursive_each = (array, indent=0) => {

  // Recursive strategy:
  // 1. REMOVE the first item from the array and print it
  // 2. Give the remaining items in the array to the same
  //    same function, recursively! ....until there
  //    are no items left in the array 
  //    i.e. our base case is an empty array (that's when we
  //    stop doing recursive calls)

  //const firstItem = array.shift(); // remove from the start
  
  const spaces = Array(indent).fill('   ').join('');

  const [firstItem, ...restOfArray] = array;  // NON-desructive, array is unchanged

  // now we have 
  // firstItem === 'a'
  // array === [ 'b', 'c' ]

  console.log(`${spaces}item:`, firstItem);  // actually print something out

  // check our base case:
  if( restOfArray.length > 0 ){

    recursive_each( restOfArray, indent + 1 ); // give our recursive call the smaller array

  }

  console.log(`${spaces}<<<< Returning from recursive_each( [${array}] )`);


}; // recursive_each()


debugger;
recursive_each( items );
