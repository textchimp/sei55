
import React from 'react';


function BearImage( props ){
  return <img src={`http://placebear.com/${ props.width }/${ props.height }`} />;
}

// Ruby: class User < ApplicationRecord
class HelloUser extends React.Component {

  render(){

    console.log( 'props', this.props );

    return (
      <div>
        Hello { this.props.name }!
        <br/>
        <BearImage width={ this.props.imgWidth } height={ this.props.imgHeight } />
      </div>
    );

  } // render()

} // class HelloUser

export default HelloUser;
