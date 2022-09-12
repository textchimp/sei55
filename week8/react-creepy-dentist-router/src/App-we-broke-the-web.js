import React from 'react'
import './App.css';

// Ruby:
// require 'httparty'  # means a gem
// require_relative './geturl.rb' # local file

import TeethSales from './TeethSales';
import Home from './Home';
import Procedures from './Procedures';

class App extends React.Component {

  state = {
    currentPage: 'home',
  };

  navigateTo = (destination) => {
    console.log('Navigating to:', destination);
    this.setState({ currentPage: destination });
  } // navigateTo()

  render(){

    let pageContent;

    // This is our naive home-made router
    // i.e. we are mapping a route name to a component which handles it
    if( this.state.currentPage === 'sales' ){
      pageContent = <TeethSales />;
    } else if( this.state.currentPage === 'procedures' ){
      pageContent = <Procedures />;
    } else {
      pageContent = <Home />;
    }

    return (
      <div className="App">
        <header>
          <h1>
            Dentistry is my passion. <br />
            It's my obsession. <br />
            I need this.
          </h1>         
          <nav>

            <a href="#" onClick={ () => this.navigateTo('home')  }>Home</a>
            {' '}|{' '}
            <a href="#" onClick={ () => this.navigateTo('procedures') }>Procedures</a>
            &nbsp;|&nbsp;
            <a href="#" onClick={ () => this.navigateTo('sales') }>Teeth Sales</a>
          </nav> 
          <hr/>
        </header>

        { pageContent }

        <footer>
          <hr/>
          &copy; Unsettling Professionals 2022
        </footer>
      </div>
    );

  } // render()

} // class App

export default App;
