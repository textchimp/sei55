
// console.log(`About Me JS`);


    // Add a script tag to the bottom of the page, just before the closing </body> tag.
    // (In JS) Change the body tag's style so it has a font-family of "Arial, sans-serif".

    // const bodyTag = document.querySelector( 'body' );
    // const bodyTag = document.body; 

    // console.log( bodyTag );

    document.body.style.fontFamily = 'Arial, sans-serif'; 

    // (In JS) Set the content of each of the empty <span>s (nickname, favorites, hometown) to contain your own information.

    const nicknameSpan = document.querySelector('#nickname');
    nicknameSpan.innerHTML = 'Textchimp';

    const favoritesSpan = document.querySelector('#favorites');
    favoritesSpan.innerHTML = 'Ruby, Guitars, Cuttlefish';

    const hometownSpan = document.querySelector('#hometown');
    hometownSpan.innerHTML = 'Sydders';


    // Iterate through each li and change the class to "listitem". Add a style tag that sets a rule for "listitem" to make the color red.
    const allLiTags = document.querySelectorAll('li');
    // console.log( allLiTags );

    for (let i = 0; i < allLiTags.length; i++) {
      const currentLi = allLiTags[i];
      console.log(i, currentLi);
      currentLi.className = 'listitem';
    }

    // Create a new img element and set its src attribute to a picture of you. Append that element to the page.

    const imgTag = document.createElement('img');

    imgTag.src = 'http://placekitten.com/300/300';
    imgTag.alt = 'a fluffy adorable yet troubled kitten';

    // document.body.appendChild( imgTag ); // add to page





  const books = [
    {
      title: 'The Design of EveryDay Things',
      author: 'Don Norman',
      imageUrl: 'http://placekitten.com/100/100',
      alreadyRead: false
    },
    {
      title: 'The Most Human Human',
      author: 'Brian Christian',
      imageUrl: 'http://www.fillmurray.com/100/100',
      alreadyRead: true
    }
  ];

//   Iterate through the array of books. For each book, create a p element with the book title and author and append it to the page.
for (let i = 0; i < books.length; i++) {
  const currentBook = books[i];
  // console.log( currentBook.title );

  const pTag = document.createElement( 'p' );

  // TODO: how about a custom tag maker function?
  // const finishedPTag = pTagMaker('hello', 'http://', '#nickname');

  pTag.innerHTML = `<em>${currentBook.title}</em>, by ${currentBook.author}`;

  //////////////////////////////////////////////
  // Bonus: add a property to each book with the URL of the book cover, and add an img element for each book on the page.
  const imgTag = document.createElement('img');
  imgTag.src = currentBook.imageUrl; 
  imgTag.alt = `a photo of author ${currentBook.author}`;
  pTag.appendChild( imgTag ); // add to pTag
  /////////////////////////////////////////////


  /////////////////////////////////////////////
  // Bonus: Change the style of the book depending on whether you have read it or not
  if( currentBook.alreadyRead ){
    pTag.style.fontWeight = 'bold';
  }
  /////////////////////////////////////////////
  

  document.body.appendChild( pTag ); // add to the page

} // for




// const nicknameSpan = document.querySelector('#nickname');
nicknameSpan.addEventListener('click',  function(){
  console.log(`nickname clicked!`);
});

const heading = document.querySelector( 'h1 ');

heading.addEventListener('mousemove', function(){
  console.log(`heading clicked!`);
});