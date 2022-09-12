import React from 'react';

class ProcedureSearch extends React.Component {

  state = {
    searchQuery: ''
  };  

  handleInput = (ev) => {
    this.setState({ searchQuery: ev.target.value });
  }

  submitSearch = () => {
    console.log('Search submitted!');
    console.log(`New route should be: #// /procedures/search/${ this.state.searchQuery }`);

    // "Please now go to the following page:"
    this.props.history.push(`/procedures/search/${this.state.searchQuery}`)
  }


  render(){

    return (
      <div>
        <input type="text" onChange={ this.handleInput }  placeholder="Search Procedures"/>
        <button onClick={ this.submitSearch }>Search</button>
      </div>
    )

  } // render

} // class ProcedureSearch

export default ProcedureSearch;