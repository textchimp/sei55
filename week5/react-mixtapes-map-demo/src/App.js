
import React from 'react';
import './App.css';

// Why do we need a package? 
// For a non-React page, i.e. a Rails template, we can just
// use a <script> tag to load the Gmaps API and add markers
// in vanilla JS
// BUT because the Google Maps JS the script tag loads directly
// accesses the DOM, it will break if we try to do that in React
// ... so as with any DOM-related library, when using React we
// generally need to find a 'react wrapper' or React version of
// that library so that React + library are not fighting over 
// the DOM
import GoogleMapReact from 'google-map-react';

import axios from 'axios';

const GMAPS_API_KEY = 'AIzaSyCl101Dkuw6zqcwqVETjEYyt5HgATs2WwU';

const RAILS_MIXTAPES_INDEX_URL = 'http://localhost:3000/mixtapes/locations';

function MyMarker( props ){
  return (
    <div className="mapMarker" onClick={ props.onClick } >
      { props.name }
      <div className="details">{ props.address }</div>
    </div>
  );
}

class App extends React.Component {

  state = {
    mixtapes: [],
    loading: true,
    error: null
  }

  componentDidMount(){
    this.fetchMixtapes();
  }


  fetchMixtapes = async() => {

    try {
      // TODO: get user location from Geolocation browser API
      // and set lat, lng to your backend as part of a AJAX request -
      // then your controller can use them for Mixtape.near query!
      // You could additionally let the user select a search from a dropdown
      // and send that to the backend too, to use with the .near() query
      const res = await axios.get(RAILS_MIXTAPES_INDEX_URL);
      console.log('response:', res.data);
      this.setState({ loading: false, mixtapes: res.data });
    } catch( err ){
      console.error(`Error loading mixtapes:`, err);
      this.setState({ loading: false, error: err });
    }

  } // fetchMixtapes()


  handleMarkerClick = (mixtapeId) => {
    console.log('Marker clicked: ', mixtapeId);
  }

  handleMapClick = (ev) => {
    console.log('Map clicked', ev);
  }

  // TODO: instead of hardcoding the defaultCenter, it should be worked 
  // out by calculating "bounding box" for all the marker items you want
  // to show; GMaps API can do this, check the google-map-react docs to
  // see how to access the underlying Gmaps API behaviour;
  // OR see if Geocoder can it for you using a bounding box method of
  // the geocoded model?

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Mixtape Map</h1>

        <div className="mapContainer">

          <GoogleMapReact 
            onClick={ this.handleMapClick }
            bootstrapURLKeys={ { key: GMAPS_API_KEY } }
            defaultCenter={ {lat: -33.7536, lng: 151.2886 } }
            defaultZoom={ 7 }
          >
            
            {
              /*
                <MyMarker lat={-33.7536} lng={151.2886} />
                <MyMarker lat={-34.7537} lng={152.28} />
              */
            }

            {
              this.state.mixtapes.map( tape => (
                <MyMarker 
                  lat={tape.latitude} lng={tape.longitude} 
                  name={tape.name} 
                  address={tape.address}  
                  key={tape.id} 
                  onClick={ () => this.handleMarkerClick(tape.id) }
                />
              ))
            }

            {/* 
              If you create your own component tags here, and they have lat and lng props,
              then they will be rendered on this map! Exactly how they look depends on
              what tags the component renders
             */}

          </GoogleMapReact>


        </div>

        </header>
      </div>
    );
  } // render()

} // class App

export default App;
