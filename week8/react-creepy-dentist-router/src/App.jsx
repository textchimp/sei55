import React from 'react';
import './App.css';

// Our page components, needed by the React Router
import Home from './Home';
import Procedures from './Procedures';
import TeethSales from './TeethSales';
import ProcedureSearch from './ProcedureSearch';
import ProcedureSearchResults from './ProcedureSearchResults';


// There is no default export from the Router package, so we have to
// import the named exports from the package, using their correct names;
// BUT we can rename them at the point of import using 'as'
import {Route, HashRouter as Router, Link} from 'react-router-dom';

class App extends React.Component {

  render(){

     return (
      <div className="App">
        <Router>
          <header>
            <h1>
              Dentistry is my passion. <br />
              It's my obsession. <br />
              I need this.
            </h1>         
            <nav>
              <Link to="/">Home</Link>
              {' '}|{' '}
              <Link to="/sales">Teeth Sales</Link>
              {' '}|{' '}
              <Link to="/procedures">Procedures</Link>

              {
                // We need the Router to render this ProcedureSearch
                // component so we can use the prop 'history' and
                // in particular its push() method, to trigger a new
                // route visit from JS code.
                // To make sure the component is always visible, i.e.
                // not dependent on a specific path, we can just leave
                // out the "path=" prop.
              }
              <Route component={ ProcedureSearch } />

            </nav>
            <hr/>
          </header>

          {
            // This is like the Rails routes.rb file
            //    get '/sales' => 'sales#teeth'
            //
            // The weird thing about the React route list is that it is all
            // mixed up with the layout, i.e. all the HTML tags
          }

          <Route exact path="/"           component={ Home } />
          <Route exact path="/sales"      component={ TeethSales } />
          <Route exact path="/procedures" component={ Procedures } />
          <Route exact path="/procedures/search/:query" component={ ProcedureSearchResults } />

          <footer>
            <hr/>
            &copy; Unsettling Professionals 2022
          </footer>
        </Router>
      </div>
     );
  } // render()

} // class App

export default App;
