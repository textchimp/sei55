
import { useState } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

// const SearchForm = (props) => {};

function SearchForm( props ){

  // useState() always use "array destructuring" to pull the returned array values
  // out of the array into local variables on a single line
  //  current value, setter fn for updating value
  const [searchText, setSearchText] = useState( '' );

  // Instead of passing the router history object (which contains a push() method)
  // down as a prop when rendered with a <Route> tag, we "hook into" the stateful
  // logic of the router with the useNavigate() hook; later we'll also use useParams()
  const push = useNavigate(); 

  // const result = useState( '' );  
  // result will be an array with 2 elements: current state value, setter function
  // const searchText = result[0];
  // const setSearchText = result[1];

  function handleSubmit( ev ){
    ev.preventDefault();
    push( `/search/${ searchText }` );  // navigate to the search results route
  }

  function handleInput( ev ){
    // this.setState({ searchText: ev.target.value });
    setSearchText( ev.target.value );
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input type="text" onChange={ handleInput } />
        <button>Search</button>
      </form>

      { /* The ThumbnailGallery component which is a child route of this SearchForm should appear here */ }
      <Outlet />

    </div>
  );

}

/********************** 
 
class SearchForm extends React.Component {

  state = {
    searchText: ''
  };


  handleInput = (ev) => {
    // console.log('handleInput():', ev.target.value);
    this.setState({ searchText: ev.target.value });
  }; // handleInput()


  handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('handleSubmit()');

    // Tell the parent component that there is a search ready
    // to perform, and tell it the query text for the search
    // this.props.onSearch( this.state.searchText );
    // We are REALLY running the method called 'performSearch' in the
    // parent component <FlickrSearch>
    this.props.history.push(`/search/${ this.state.searchText }`);
    // This is as if in Rails we had a `redirect_to search_results_path('query here')`

  }; //

  render(){

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" onChange={ this.handleInput } />
          <button>Search</button>
        </form>
      </div>
    );

  } // render()

} // class SearchForm

*****************************/


export default SearchForm;
