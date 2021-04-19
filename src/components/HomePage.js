<<<<<<< HEAD
import React, { useState } from 'react';
import Login from '../Login.js';
import Logout from '../Logout.js';
import Activity from '../Activity.js';
=======
import React, { useState, useEffect } from 'react';
import Login from'../Login.js';
import Logout from'../Logout.js';
>>>>>>> 46df577eb280fb2a6b81f36338fbea67fd463f3b
import {loginApi, userApi} from '../api/api.js';

function HomePage(props){
    
<<<<<<< HEAD
  function onClickButton() {
    userApi(props.currentToken).then(data => console.log('Verified Status:', props));
  }
  //<button onClick={onClickButton} type="button">Test API</button>
  // { props.isAuth && 'Token ID: ' && props.currentToken }
  return (
            <div className="activity">
             {props.isAuth ?(
             <div>

             <h3>Welcome to your Home Page</h3>
              <p>{userApi}</p>
             </div>
             )
             :null}



        </div>
  )
=======
    const [isViewable, setViewable] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    function updateData(data){
      // If the user data API call fails, log the user out.
      if(data.hasOwnProperty('success')){
        if(data.success == false){
          props.logout();
        }
        else{
          setEmail(data.email);
          setLastName(data.lastName);
          setFirstName(data.firstName);
        }
      }
    }
    
    //Rerender component when token ID and isAuth updates.
    useEffect(() => {
      //If user is logged in and the token ID is valid, update home page
      if(props.token != "" && props.isAuth)
        userApi(props.token).then(data => updateData(data)).then(data => setViewable(true));
      
      //Upon user logout, clear all user data
      if(!props.isAuth){
        setEmail("");
        setLastName("");
        setFirstName("");
        setViewable(false);
      }
    }, [props.token, props.isAuth]);
  
  if(isViewable){
    return (
      <div>
        <h2>Hello, {firstName}</h2>
        <h5>Email: {email}</h5>
        <h5>Last Name: {lastName}</h5>
      </div>
    );
  }
  else{
    return (<div>
      <h2>Please log in!</h2>
    </div>
    );
  }
>>>>>>> 46df577eb280fb2a6b81f36338fbea67fd463f3b
}

export default HomePage;

//<button onClick={onClickButton} type="button">Test API</button> 