


// The Fortune Teller

// Why pay a fortune teller when you can just program your fortune yourself?

// Store the following into variables: number of children, partner's name, geographic location, job title. Output your fortune to the screen like so: "You will be a X in Y, and married to Z with N kids."

const numberOfChildren = 8;
const partnersName = 'Betty';
const geographicLocation = 'Glasgow';
const jobTitle = 'chimney sweep';

// const fortuneOutput = 'You will be a ' + jobTitle + ' in ' + geographicLocation + ', and married to ' + partnersName + ' with ' + numberOfChildren + ' kids.' ;

const fortuneOutput = `You will be a ${ jobTitle } in ${ geographicLocation }, and married to ${ partnersName } with ${ numberOfChildren } kids.`;

console.log( fortuneOutput );

console.log('-------------------------------------');


// The Age Calculator

// Forgot how old someone is? Calculate it!

//     Store the current year in a variable.
//     Store their birth year in a variable.
//     Calculate their 2 possible ages based on the stored values.
//     Output them to the screen like so: "They are either NN or NN", substituting the values.

const currentYear = 2022;
const birthYear = 1990;

const ageAfterBirthday = currentYear - birthYear;
const ageBeforeBirthday = ageAfterBirthday - 1;

const ageOutput = `They are either ${ageAfterBirthday} or ${ageBeforeBirthday}.`;

console.log( ageOutput );

// console.log( `They are either ${ageAfterBirthday} or ${ageAfterBirthday - 1}.` );

console.log('-------------------------------');




// The Lifetime Supply Calculator

// Ever wonder how much a "lifetime supply" of your favorite snack is? Wonder no more!

//     Store your current age into a variable.
//     Store a maximum age into a variable.
//     Store an estimated amount per day (as a number).
//     Calculate how many you would eat total for the rest of your life.
//     Output the result to the screen like so: "You will need NN to last you until the ripe old age of X".

const currentAge = 100;
const maximumAge = 150;
const amountPerDay = 5;

const remainingYears = maximumAge - currentAge;
const daysPerYear = 365.25;
const remainingDays = remainingYears * daysPerYear;
const totalSnacksRequired = remainingDays * amountPerDay;

console.log(`You will need ${totalSnacksRequired} to last you until the ripe old age of ${maximumAge}.`);





// The Temperature Converter

// It's hot out! Let's make a converter.

//     Store a celsius temperature into a variable.
//     Convert it to fahrenheit and output "NN°C is NN°F".
//     Now store a fahrenheit temperature into a variable.
//     Convert it to celsius and output "NN°F is NN°C."

const celsiusTemp = 47;

const farenheitEquivalentTemp = (celsiusTemp * 1.8) + 32;

console.log(`${celsiusTemp}°C is ${ farenheitEquivalentTemp.toFixed(1) }°F.`);

const farenheitTemp = 116.6;

const celsiusEquivalentTemp = (farenheitTemp - 32) / 1.8;

console.log(`${farenheitTemp}°F is ${ celsiusEquivalentTemp.toFixed(1) }°C.`);

