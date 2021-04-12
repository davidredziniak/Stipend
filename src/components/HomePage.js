import React, { useState } from 'react';
import Login from '../Login.js';
import Logout from '../Logout.js';
import Activity from '../Activity.js';
import {loginApi, userApi} from '../api/api.js';

function HomePage(props){
    
  function onClickButton() {
    userApi(props.currentToken).then(data => console.log('Verified Status:', data));
  }
  //<button onClick={onClickButton} type="button">Test API</button>
  // { props.isAuth && 'Token ID: ' && props.currentToken }
  return (
    <div>
      <ul>Welcome to your Home Page</ul>
    </div>
  )
}

export default HomePage;