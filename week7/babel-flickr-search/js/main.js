'use strict';

var FLICKR_BASE_URL = 'https://www.flickr.com/services/rest/';
var FLICKR_API_KEY = '2f5ac274ecfac5a455f38745704ad084';

$(function () {

  $('#query').focus(); // so we can test easily by pressing enter

  // EITHER a click of the button OR (yeesss) pressing enter in an input
  // will trigger the form submit
  $('#searchForm').on('submit', function (ev) {
    ev.preventDefault(); // stop the form from reloading the page
    var query = $('#query').val();
    getSearchResults(query);
  }); // form submit
}); // DOM ready

var getSearchResults = function getSearchResults(queryText) {
  console.log('getSearchResults(): ', queryText);

  $('#results').html('<p>Loading results...</p>'); // replace old results with loading message

  // https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2f5ac274ecfac5a455f38745704ad084&text=ocean+coral&format=json&nojsoncallback=1)

  axios.get(FLICKR_BASE_URL, {
    params: {
      // These key-value pairs turn into querystring &key=value pairs
      method: 'flickr.photos.search',
      api_key: FLICKR_API_KEY,
      format: 'json',
      nojsoncallback: 1,
      text: queryText
    }
  }).then(function (res) {
    // console.log( res.data );
    renderSearchResults(res.data.photos);
  }).catch(function (err) {
    console.error('Error loading search results', err);
  });
}; // getSearchResults()


var renderSearchResults = function renderSearchResults(results) {
  console.log('renderSearchResults():', results);

  $('#results').empty(); // clear any previous results

  results.photo.forEach(function (photo) {
    var imageUrl = generateImageUrl(photo);
    console.log('photo:', imageUrl);
    var $img = $('<img src="' + imageUrl + '" alt="' + photo.title + '">');
    $('#results').append($img);
    // $img.on('click', )
  });
}; // renderSearchResults()


var generateImageUrl = function generateImageUrl(p) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'q';

  return 'https://live.staticflickr.com/' + p.server + '/' + p.id + '_' + p.secret + '_' + size + '.jpg';
}; // generateImageUrl()