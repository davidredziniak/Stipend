import React, { useState, useEffect } from 'react';
import Login from'../Login.js';
import Logout from'../Logout.js';
import {loginApi, userApi} from '../api/api.js';

function HomePage(props){
    
    const [isViewable, setViewable] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    function updateData(data){
      setEmail(data.email);
      setLastName(data.lastName);
      setFirstName(data.firstName);
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
}

export default HomePage;