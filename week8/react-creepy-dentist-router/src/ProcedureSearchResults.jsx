import React from 'react';

class ProcedureSearchResults extends React.Component {

  // React "lifecycle" method:
  // if you give this method this exact name, React will
  // run it at the appropriate time: in this case,
  // when the component is 'mounted', meaning "added to
  // the DOM" 
  componentDidMount(){
    // THIS IS THE PLACE TO LOAD API DATA
    console.log('componentDidMount(): Loading data with query:', this.props.match.params.query);
  }

  // componentWillUnmount is for detaching any weird event 
  // handlers you might have attached to the DOM but which 
  // are only relevant to this component;
  // you might also use it to 'unsubscribe' from any
  // notifications or streaming data the component might
  // have started listening to;
  // i.e. any cleanup you need to do
  componentWillUnmount(){
    console.log('componentWillUnmount()');
  }
  
  // This runs after a prop or state is updated,
  // but before the render() - if you return
  // false from it, you can prevent the render
  shouldComponentUpdate(prevProps, prevState){
    console.log('shouldComponentUpdate()');
    return true; // to prevent errors
  }

  // This runs AFTER a prop or state is update, and
  // after render() - you can use it to see if
  // props have have changed, i.e. search query
  // props from the router - i.e.,do you need to
  // trigger another AJAX axios.get() request?
  componentDidUpdate(prevProps, prevState){
    console.log('componentDidUpdate()');
  }


  render(){

    // Where to do our axios.get() ??????

    // DEFINITELY NOT INSIDE render() - this function
    // runs every time state updates, and your axios.get()
    // will need to itself run this.setState(),
    // leading to AN INFINITE setState -> render() LOOP

    return (
      <div>
        <h3>Results for "{ this.props.match.params.query }"</h3>
      </div>
    );

  } // render()

} // class ProcedureSearchResults

export default ProcedureSearchResults;