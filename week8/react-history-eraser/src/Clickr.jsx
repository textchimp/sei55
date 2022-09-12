
import React from 'react';

class Clickr extends React.Component {

  state = {
    clickCounter: 0,
  };


  handleClick = () => {
    // NOPE:
    // this.state.clickCounter++;
    // console.log(this.state.clickCounter);
    // YOU ARE NOT ALLOWED TO CHANGE STATE DIRECTLY

    const newCounterValue = this.state.clickCounter + 1;

    // You need to use setState to get the re-render() to happen
    this.setState({ clickCounter: newCounterValue });

    // Let's get the parent HistoryEraser component to check
    // whether the click threshold has been passed
    //
    // Dear parent, the current clickcounter value is 'newCounterValue'
    this.props.phoneHome( newCounterValue );


    // BECAUSE this.setState() is *asynchronous*, it takes some time
    // to perform its state update.
    // This means you can't rely on the state data to be updated in time
    // to use it in a line within the same function, as below:
    // console.log( 'count:', this.state.clickCounter ); // shows old state

  } // handleClick


  render(){

    return (
      <div>
        
        Click count: { this.state.clickCounter }

        <br/>

        <button onClick={ this.handleClick }>ERASE HISTORY</button>
      </div>
    );

  } // render()

} // class Clickr

export default Clickr;