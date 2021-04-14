import logo from './logo.svg';
import Login from './Login.js';
import Logout from './Logout.js';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function CreateTrip(props){

    return(
        <div className="activity">
             {props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/>?
             (<div><h3>Welcome to your Create Trip!</h3></div>):null}
        </div>
        );
}

export default CreateTrip;