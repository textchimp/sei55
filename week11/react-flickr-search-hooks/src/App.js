import React from 'react'; // get used to this
import './App.css';
import HelloUser from './HelloUser'

// function App() {
//   return (
//     <div className="App">
//       Hello World !!!!!
//       <p>
//         Another paragraph
//       </p>
//       <img src="http://placekitten.com/300/300"/>
//     </div>
//   );
// } // App()


class App extends React.Component {

  render(){

    return (
      <div className="App">
        <h1>Hello World from our class component!</h1>

        <HelloUser name="Cassie" imgWidth="300" imgHeight="200" />
        <HelloUser name="Steven" imgWidth="200" imgHeight="400" />

      </div>
    );

  } // render()


} // class App




export default App;
// so that index.js can 'import App from "./App"'
