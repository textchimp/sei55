
// The even/odd reporter

// Write a for loop that will iterate from 0 to 20. For each iteration, it will check if the current number is even or odd, and report that to the screen (e.g. "2 is even"). Do this within a single loop. Example output:

// 0 is even
// 1 is odd
// 2 is even
// (etc...)

for( let i = 0; i <= 20; i++ ){
  // console.log( i,   i % 2 === 0 );

  let answer;
  if( i % 2 === 0 ){
    answer = 'even';
  } else {
    answer = 'odd';
  } // if

  console.log(`${i} is ${answer}`);

} // for


console.log(`===========================`);


// Multiplication Tables

// Write a for loop that will iterate from 0 to 10. For each iteration of the for loop, it will multiply the number by 9 and log the result (e.g. "2 * 9 = 18").

// for( let i = 0; i <= 10; i++ ){
//   // console.log(`${i} * 9 = ${ i * 9 }`);

//   // console.log(`outer loop i:`, i);

//   for( let j = 1; j <= 10; j++ ){


//     if( (i * j) % 10 === 0 ){
//       console.info(`%c${i} * ${j} = ${ i * j }`, 'font-size: 14pt; font-weight: bold; color: hotpink', 'other output');
//     } else {
//       console.log(`${i} * ${j} = ${ i * j }`);
//     } // else


//   } // inner for

// } // outer for

// Bonus: Use a nested for loop to show the tables for every multiplier from 1 to 10 (100 results total).
// The Grade Assigner

// Check the results of assignGrade function from the conditionals exercise for every value from 50 to 100 - so your log should show "For 89, you got a B. For 90, you got an A.", etc.

const assignGrade = function( numberScore ){

  if( numberScore > 100 ){
    // return 'X'
    // console.log(`Invalid input`);
    // throw new Error('Invalid input');
  } else if( numberScore >= 90 ){
    return 'A';
  } else if( numberScore >= 80 ){
    return 'B';
  } else if( numberScore >=70 ){
    return 'C';
  } else if( numberScore >= 60 ){
    return 'D';
  } else {
    return 'F';
  }

}; // assignGrade()

// console.log( 95, assignGrade(95) );
// console.log( 80, assignGrade(80) );
// console.log( 40, assignGrade(40) );

for( let i = 50; i <= 101; i++ ){
  console.log( i, assignGrade(i) );
}

const item1 = 'socks';
const item2 = 'milk';
const item3 = 'pencils';

const shoppingList = [
  'socks', 
  'milk',
  'pencils'
];

