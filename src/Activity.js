import logo from './logo.svg';
import Login from './Login.js';
import Logout from './Logout.js';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";


// get all the users in the trip from the database

// allow any user to create an activity in the form of a dictionary {USERNAME: amount_spent}

// split money equally within the activity by TOTAL_MONEY_SPENT/total_number_of_users

function Activity(props){
    return(
        <div className="activity">
             {props.isAuth && <Login tokenHandler={props.token} 
             authHandler={props.auth}/>?(<ul>Welcome to your Activity Page!</ul>):null}
        </div>
        );
}

export default Activity;
