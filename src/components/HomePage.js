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
      { props.isAuth && 'Token ID: ' && props.currentToken }
      <p>
        
      </p>
    </div>
  )
}
//<button onClick={onClickButton} type="button">Test API</button> 
export default HomePage;