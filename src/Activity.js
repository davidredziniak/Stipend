import logo from './logo.svg';
import Login from './Login.js';
import Logout from './Logout.js';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function Activity(props){
    const activity= ()=>
    {
        <div><h3>Welcome to your Activity Page!</h3></div>
    }
    return(
        <div className="activity">
             {props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/>?
             (<div><h3>Welcome to your Activity Page!</h3></div>):<h3>Please Login!!!</h3>}
        </div>
        );
}

export default Activity;

