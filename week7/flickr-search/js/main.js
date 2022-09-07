
const FLICKR_BASE_URL = 'https://www.flickr.com/services/rest/';
const FLICKR_API_KEY  = '2f5ac274ecfac5a455f38745704ad084';


$( function(){

  $('#query').focus();  // so we can test easily by pressing enter

  // EITHER a click of the button OR (yeesss) pressing enter in an input
  // will trigger the form submit
  $('#searchForm').on('submit', function( ev ){
    ev.preventDefault(); // stop the form from reloading the page
    const query = $('#query').val();
    getSearchResults( query );
  }); // form submit

}); // DOM ready

const getSearchResults = (queryText) => {
  console.log('getSearchResults(): ', queryText);
  
  $('#results').html('<p>Loading results...</p>'); // replace old results with loading message

  // https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2f5ac274ecfac5a455f38745704ad084&text=ocean+coral&format=json&nojsoncallback=1)

  axios.get( FLICKR_BASE_URL, {
    params: {
      // These key-value pairs turn into querystring &key=value pairs
      method: 'flickr.photos.search',
      api_key: FLICKR_API_KEY,
      format: 'json',
      nojsoncallback: 1,
      text: queryText
    }
  })
    .then( res => {
      // console.log( res.data );
      renderSearchResults( res.data.photos );
    })
    .catch( err => {
      console.error('Error loading search results', err);
    });

}; // getSearchResults()


const renderSearchResults = (results) => {
  console.log('renderSearchResults():', results);

  $('#results').empty(); // clear any previous results

  results.photo.forEach( photo => {
    const imageUrl = generateImageUrl( photo );
    console.log('photo:', imageUrl);
    const $img = $(`<img src="${imageUrl}" alt="${photo.title}">`);
    $('#results').append($img);
    // $img.on('click', )
  });


}; // renderSearchResults()


const generateImageUrl = (p) => {
  return `https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}_q.jpg`;
}; // generateImageUrl()