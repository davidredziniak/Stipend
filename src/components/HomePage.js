import React, { useState } from 'react';
import Login from'../Login.js';
import Logout from'../Logout.js';
import {loginApi, userApi} from '../api/api.js';

function HomePage(props){
    
      function onClickButton() {
        userApi(props.currentToken).then(data => console.log('Verified Status:', data));
  }
  return (
    <div>
      <h2> Homepage </h2>
      <p>
        Token ID: {props.currentToken}
        <button onClick={onClickButton} type="button">Test API</button>
      </p>
    </div>
  )
}

export default HomePage;