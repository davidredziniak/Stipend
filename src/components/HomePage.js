import React, { useState } from 'react';
import Login from'../Login.js';
import Logout from'../Logout.js';

function HomePage(props){
    
      function onClickButton() {
    
  }
  return (
    <div>
      <h2> Homepage </h2>
      <p>
        { !props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/> }
        { props.isAuth && <Logout tokenHandler={props.token} authHandler={props.auth} /> }
        Token ID: {props.currentToken}
        <button onClick={onClickButton} type="button">Test API</button>
      </p>
    </div>
  )
}

export default HomePage;