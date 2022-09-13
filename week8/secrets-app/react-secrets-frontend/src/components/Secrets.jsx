
import React from 'react';
import '../App.css';

import SecretsForm from './SecretsForm';

import axios from 'axios';

const RAILS_SECRETS_BASE_URL = 'http://localhost:3000/secrets'; 

// This is a 'functional component' - not a class, but just a function
// that gets its props as an argument.
// Functional components CANNOT HAVE THEIR OWN STATE - so they can't
// handle or store user input; they are limited to just rendering
// their props in some way. I.e. they are for display only, no logic.

function SecretItem( props ){
  return (
    <li>
      <strong>{ props.secret.content }</strong>
      <br />
      <em>Posted: { props.secret.created_at }</em>
    </li>
  );
} // SecretItem


class Secrets extends React.Component {

  state = {
    secrets: [],    // stores results from API for render
    loading: true,  // whether or not we are still loading
    error: null     // was there an error loading?
  };

  componentDidMount(){
    // We want to load the list of Secrets from the backend
    // as soon as our frontend loads, so our AJAX request
    // should be initiated from componentDidMount()
    // console.log('componentDidMount()');
    
    this.fetchSecrets();

    // Poll the server every 2s to get any secrets that
    // were added by other users since the page loaded
    // (or since the last poll)
    // setInterval( this.fetchSecrets, 2000 );

  }


  fetchSecrets = async () => {

    try {
      const res = await axios.get(RAILS_SECRETS_BASE_URL);
      console.log( 'response:', res.data );
      
      this.setState({ 
        secrets: res.data, //.reverse(),   // this is the array of secrets
        loading: false 
      });

    } catch( err ){
      console.error('Error loading secrets from API', err);

      this.setState({
        loading: false,
        error: err  // Store the error in state, for the render
      });

    } // catch

      // .then( res => { console.log(res.data); } )
      // .catch();
  
  } // fetchSecrets()


  // This method will be given as a prop to the child component
  // SecretsForm so that child can 'notify' the parent when the
  // secrets form is submitted - the content of the form
  // will be passed as an argument, i.e. 'text'
  postSecret = async (text) => {
    console.log('Secrets::postSecret()', text);

    try {
      const res = await axios.post(RAILS_SECRETS_BASE_URL, { content: text });
      console.log('POST response:', res.data);

      // add it to the array of secrets in state that were
      // loaded when the component first mounted
      // this.state.secrets.push(  ); // not using setState

      // Instead of .push() or .unshift(), we make a copy
      // of the current state 'secrets' array using the
      // spread operator '...', and prepend the freshly-
      // created secret object to the start

      this.setState({
        secrets: [  res.data, ...this.state.secrets ]
      })

    } catch( err ){
      console.error('Error saving secret to backend', err);
    }

  } // postSecret


  render(){

    if( this.state.error !== null ){
      return <p>There was an error loading the Secrets.</p>; // early return
    }


    return (
      <div className="App">
        <h1>Spill Yer Guts</h1>

        <SecretsForm notifyParent={ this.postSecret } />

        <hr/>

        <h3>Terrible Secrets of the General Public</h3>

        {
          this.state.loading 
          ?
          <p>Loading secrets...</p>
          :
          <ul>
            { this.state.secrets.map( s => <SecretItem key={ s.id } secret={ s } /> ) }
          </ul>

        }

      </div>
    );

  } // render()

} // class Secrets

export default Secrets;