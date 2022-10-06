
import React from 'react';

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

export default SearchForm;
