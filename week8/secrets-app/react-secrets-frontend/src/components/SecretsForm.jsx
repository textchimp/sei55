
import React from 'react';

class SecretsForm extends React.Component {

  state = {
    secretText: ''
  };

  handleInput = (ev) => {
    this.setState({ secretText: ev.target.value  });
  }


  handleSubmit = (ev) => {
    ev.preventDefault(); // Stop form submit from reloading page
    console.log('Form submitted', this.state.secretText);

    // Tell the parent that the form was submitted,
    // and exactly what the submitted secret text was;
    // then the parent can POST the data to the Rails backend
    // via another AJAX request
    this.props.notifyParent( this.state.secretText );

  } // handleSubmit()


  render(){

    return (
      <form onSubmit={ this.handleSubmit }>
        <strong>Unburden Yourself:</strong>
        <br />
        <input type="text" onChange={ this.handleInput } />
        <button>Submit Secret</button>
      </form>
    );

  } // render()

} // class SecretsForm

export default SecretsForm;