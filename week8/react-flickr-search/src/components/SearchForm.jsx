import React from 'react';

class SearchForm extends React.Component {

  state = {
    searchText: ''
  };

  handleChange = (event) => {
    this.setState({ searchText: event.target.value });
  }

  handleSubmit = (event) => {
    console.log('Form submitted:', this.state.searchText);
    event.preventDefault(); // stop form submit from reloading page

    // Notify the parent component FlickrSearch that a
    // search has been submitted
    this.props.onSubmit( this.state.searchText );

  }

  render(){

     return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" onChange={ this.handleChange } />
          <button>Search</button>
        </form>
      </div>
     );

  } // render()

} // class SearchForm


export default SearchForm;