import React from 'react'; // from node_modules, i.e. load a package
import './App.css';

import HelloUser from './HelloUser';

class App extends React.Component {

  // Every React class component must define
  // a render() which tells the browser what
  // to draw when this conmponent is used

  render(){

    // Every render() method must, eventually, return
    // some JSX (HTML) tags for the browser to show

    const bearName = 'Paddington';

    const imageUrl = 'http://placebear.com/300/300';

    const leiImgWidth = 100;

    return (
      <div className="App">
        <h1>Hello { bearName }!</h1>
        <img src={ imageUrl } />
        <br/>
        {
          /*
            The below line is really saying:
            give me an instance (an object)
            of the HelloUser class, and run
            its render() method to cause
            some HTML to be displayed:
              const obj = new HelloUser();
              obj.render();
          */
        }
        <HelloUser name="Shae" imgWidth="300" />
        <HelloUser name="Lei"  imgWidth={leiImgWidth} />
        <HelloUser imgWidth="400" name="Crai-g" />

        

      </div>
    );

  } // end render()


} // end of class App


export default App;
