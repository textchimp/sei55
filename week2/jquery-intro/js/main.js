
// console.log(`jQuery intro ready!`);

const $h1 = $('h1');
// console.log( $h1 );

$h1.html('Welcome to jQuery land!');

$h1.ht

const $allParas = $('p');
console.log( $allParas );

// Changing several features, one at a time:
// $allParas.css('background-color', 'red');
// $allParas.html('New contents');
// $allParas.fadeOut(5000);
// $allParas.html('EVEN NEWER CONTENTS');
// $allParas.fadeIn(2000);

// Chaining does NOT affect the behaviour of animations/changes
// $allParas
//   .css('background-color', 'red')
//   .html('First new contents')  // NOPE! We never see this because
//   .fadeOut(5000)
//   .html('EVEN NEWER CONTENTS')
//   .fadeIn(2000);

$allParas.css({
  backgroundColor: 'red',
  border: '10px solid blue',
  fontSize: '16pt',
  'font-family': 'Comic Sans MS' // OR:   fontFamily: 'Comic Sans MS'
});

const firstParaContents = $allParas.html(); // GETTER, only gives you the first result's value
// console.log(firstParaContents);

// SETTER - specify the new value, this will apply to all elements in your query
$allParas.html('New contents for all paragraphs'); 

// BEWARE: difference between normal/vanilla JS DOM nodes, and jQuery results
const firstParaNode = $allParas[0];
// console.log(firstParaNode); 
// firstParaNode.html('this will not work'); // "TypeError: firstParaNode is not a function"

// Get the 0th item from the results array AS A JQUERY OBJECT
const $correctFirstParaNode = $allParas.eq(0); 
console.log($correctFirstParaNode);
$correctFirstParaNode.html('this should work');

// Make a new image tag and append it to the first p tag
const $img = $('<img>') // if you give an actual <tag> as the arg, it CREATES that tag

// $img.attr('src', 'http://placekitten.com/200/200');
// $img.attr('alt', 'adorable sad kitten');
// is the same as:
$img.attr({
  src: 'http://placekitten.com/200/200',
  alt: 'adorable sad kitten'
});

// Let's add it to the first p tag on the page
// $('p').append( $img );  // WHOOPS... this adds it to all p tags! Just like .html('new contents');

// $('p').eq(0).append( $img );
// ...even better, use a more specific selector that returns a single element:
$('#intro').append( $img );

// Beast Mode: all of the above in one big chain:
$('<img>')
  .attr({
    src: 'http://placekitten.com/200/200',
    alt: 'adorable sad kitten'
  })
  .css('border', '1px solid green')
  .appendTo( '#intro' ); // opposite order to .append()


  // How do I print out the HTML contents of every <li> tag?
  const allLiContents = $('li').html();
  console.log(`allLiContents:`, allLiContents); // Nope! Just gives the first element's contents

  // To do custom looping behaviour, use .each():

  $('li').each( function(){
    // Inside this callback fn, `this` will contain "the current item"
    // ...BUT as a vanilla JS node
    // console.log( $(this).html() );
    console.log( this.innerHTML );
  } );