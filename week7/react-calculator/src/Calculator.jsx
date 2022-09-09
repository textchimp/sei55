import React from 'react';

class Calculator extends React.Component {


  // Define an instance variable "this.state"
  // which is special because it's a centralised
  // storage area for any variables that might change
  // as our component is interacted with - 
  // in particular, any variables we might want to
  // show on the page
  state = {
    firstNum: 0,  // default values for each piece of state
    secondNum: 0
  };

  // The old way 
  // We need the equivalent of Ruby's "def initialise"
  // constructor(props){
  //   super(props);  // Run the constructor of the parent class
  //   this.state = {
  //     firstNum: 0, 
  //     secondNum: 0
  //   }
  // }


  // $('#query').on('change', function( event ){})

  // We MUST use arrow functions to define methods which are used
  // as event handlers, otherwise they get the wrong definition of
  // 'this' ... they get "undefined" instead of the current object
  updateFirstNum = (event) => {
    console.log( event.target.value );

    // To update a piece of state in React, we call a method provided
    // by the parent class Component, which is called this.setState()
    // The whole point of setState() is that it re-runs your render()
    // method, which in turn will cause any updated state variables
    // used in your JSX to be updated in the DOM
    this.setState({ 
      firstNum: parseInt(event.target.value) // update the specific state called 'firstNum'
    });
  
  } // updateFirstNum()

  updateSecondNum = (event) => {
    this.setState({
      secondNum: parseInt(event.target.value)
    });
  }

  render(){

    // const firstNum = this.state.firstNum;
    // const secondNum = this.state.secondNum;
    const {firstNum, secondNum} = this.state;  // ES6 object destructuring

    console.log('render value of "this":', this);

    return (
      <div>
        <h1>CalculatoReact!</h1>

        <input type="text" placeholder="First Number" onChange={ this.updateFirstNum } />

        <input type="text" placeholder="Second Number" onChange={ this.updateSecondNum } />

        <p>{ firstNum } + { secondNum } = { firstNum + secondNum }</p>
        <p>{ firstNum } - { secondNum } = { firstNum - secondNum }</p>
        <p>{ firstNum } / { secondNum } = { firstNum / secondNum }</p>
        <p>{ firstNum } * { secondNum } = { firstNum * secondNum }</p>
        
      </div>
    );

  } // render()

} // class Calculator

export default Calculator;