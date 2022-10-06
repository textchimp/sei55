
import React from 'react';
import '../App.css';


import {HashRouter as Router, Route} from 'react-router-dom';


import SearchForm from './SearchForm';
import ThumbnailGallery from './ThumbnailGallery';

// Flickr URLs were here -------------->>>>>>>>>


class FlickrSearch extends React.Component {

  // state and performSearch were here  ------->>>>>>>


  render(){

    // this.state.error check was here -------------->

    return (
      <div className="App">
        <h1>Flickr Search</h1>
        <hr/>

        <Router>
          <Route component={ SearchForm } />
          <Route exact path="/search/:searchText" component={ ThumbnailGallery } />
        </Router>

        {
          /*

        <SearchForm onSearch={ this.performSearch } />

        <ThumbnailGallery
          loading={ this.state.loading }
          photos={ this.state.resultPhotos }
        />


        */
      }


      </div>
    );

  } // render()

} // class FlickrSearch

export default FlickrSearch;
