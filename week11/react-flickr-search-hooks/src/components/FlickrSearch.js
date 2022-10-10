
import React from 'react';
import '../App.css';

import { useSelector, useDispatch } from 'react-redux';


import {HashRouter as Router, Route, Routes} from 'react-router-dom';


import SearchForm from './SearchForm';
import ThumbnailGallery from './ThumbnailGallery';

function FlickrSearch(){

  // Use an arrow function to return just the part of
  // the data store that you need in the current component
  const counter = useSelector( state => state.counter );
  const favourites = useSelector( state => state.favouritePhotos );

  // Redux jargon: we "dispatch an action"
  // to trigger code in the reducer and update the state
  // of our global data store
  const dispatch = useDispatch();

  function handleClick(){
    dispatch({ type: 'clickCounter/incremented' });
  }


    return (
      <div className="App">
        <h1>Flickr Search</h1>
        <nav>
          Global counter: { counter }
          <br/>
          <button onClick={ handleClick }>Increment Counter</button>

          <div> 
            <h6>Faves:</h6>
            <ul>
              { favourites.map( f => <li key={f.id}>photo: {f.id} </li>  ) }
            </ul>
          </div>

        </nav>
        <hr/>

        <Router>
          <Routes>

            <Route path="" element={ <SearchForm/> } >
              <Route path="/search/:searchText" element={ <ThumbnailGallery/> } />
            </Route>``
          </Routes>
        </Router>

      </div>
    );

    // } // end of render()

} // FlickrSearch()

export default FlickrSearch;
