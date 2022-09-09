import React from 'react';

class HelloUser extends React.Component {

  render(){

    console.log( this.props );

    return (
      <div style={ {border: '1px solid green'} }>
        <p>Hello { this.props.name }!</p>
        <img src={`http://placebear.com/${this.props.imgWidth}/200`} alt="Cute bear for Dei, pedant" />
      </div>
    );

  } // render()

 

} // class HelloUser

export default HelloUser;