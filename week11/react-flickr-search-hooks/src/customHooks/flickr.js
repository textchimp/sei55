// Custom hooks for loading API data from Flickr

import { useState, useEffect } from 'react';
import axios from 'axios';

const FLICKR_API_KEY = '2f5ac274ecfac5a455f38745704ad084';
const FLICKR_BASE_URL = 'https://api.flickr.com/services/rest';


function useFlickrSearchResults( queryText ){

  const [loading, setLoading] = useState( false );
  const [error, setError]     = useState( null );
  const [results, setResults] = useState( [] );
  
  useEffect( async () => {

    try {

      const flickrParams = {
        method: 'flickr.photos.search',
        api_key: FLICKR_API_KEY,
        format: 'json',
        nojsoncallback: 1,
        text: queryText 
      };

      setLoading( true ); // To show message when re-searching

      const res = await axios.get( FLICKR_BASE_URL, { params: flickrParams } );
      console.log('data', res.data);

      setLoading( false );
      setResults( res.data.photos.photo );

    } catch( err ){
      console.error('Error loading Flickr search results', err );

      setLoading( false );
      setError( err );

    }

  }, [queryText] ); // NOTE param as second argument - it means do AJAX search whenever the router param changes

  // Return to the code using this custom hook
  // the three pieces of the hook's state that
  // the code will need
  return { loading, results, error };

} // useFlickrSearchResults()


// Named export instead of default export;
// this means you have to use the right name 
// when you import:
//   import { useFlickrSearchResults } from 'customHooks/flickr';
export { useFlickrSearchResults };
