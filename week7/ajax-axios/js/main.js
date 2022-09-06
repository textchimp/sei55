
$( function(){
  // When DOM is loaded....

  $('#submitButton').on('click', function(){
    const query = $('#query').val();
    // console.log(`clicked! Form query:`, query);
    getMovieSearchResults( query ); // give the form input contents to the search function

  }); // on click



}); // DOM ready

const getMovieSearchResults = function( searchText ){
  console.log(`getMovieSearchResults(): `, searchText );

  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=24d863d54c86392e6e1df55b9a328755&query=${ searchText }`)
    .then( function( res ){
      // Success!
      // console.log( `data:`, res.data.results );

      res.data.results.forEach( function(movie){
        // console.log(movie.title);
        
        // <div>
        //   <h3>${ movie.title}</h3>
        //   <p>${ movie.overview }</p>
        // </div>
        
        // Note we need to store the movie ID as an attribute
        // of the clickable image tag, so we know which movie
        // ID to use in our AJAX query for the movie details
        // when that image is clicked
        $('#results').append(`
          <img data-movieid="${ movie.id }" src="http://image.tmdb.org/t/p/w154${ movie.poster_path }" alt="${ movie.title }">
        `);

      }); // .forEach results      

      // After the forEach is finished adding result
      // images (or divs or whatever) to the DOM,
      // attach the same click handler to all the new
      // result thumbnail image tags
      // - but beware, if you don't clear your results 
      // before each new search, you might end up doubling
      // up on click handlers!
      $('#results img').on('click', function(ev){
        // console.log(`image clicked!`, ev.target.id );
        
        // Get 'data-movieid' attribute from the clicked image;
        // Note you could also use $(this) instead of $(ev.target)
        const id =  $(ev.target).data('movieid'); 
        getMovieDetailsById( id );
      });

    }) // end of .then()
    .catch( function( err ){
      // Error!
      console.error( 'WHOOPS!', err );
    });

}; // getMovieSearchResults()


const getMovieDetailsById = function( movieId ){
  console.log(`getMovieDetailsById():`, movieId);

  // Docs are here: https://developers.themoviedb.org/3/movies/get-movie-details
  axios.get(`https://api.themoviedb.org/3/movie/${ movieId }?api_key=24d863d54c86392e6e1df55b9a328755`)
    .then( function( res ){
      console.log(`movie details:`, res.data);

      // NEXT:
      // Hide the #results div, (to return to seach results, .show() again)
      // Show the #details div, and fill it with movie details
      // such as res.data.budget, res.data.tagline, etc etc
      //
      // i.e. make it look like you're moving between 'pages'
      // by showing and hiding divs

    })
    .catch( function( err ){
      console.error('Error loading movie details', err);
    });

}; // getMovieDetailsById()
