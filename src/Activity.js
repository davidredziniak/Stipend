import Login from './Login.js';
import React from 'react';
import './App.css';
//import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";


// get all the users in the trip from the database

// allow any user to create an activity in the form of a dictionary {USERNAME: amount_spent}

// split money equally within the activity by TOTAL_MONEY_SPENT/total_number_of_users

function Activity(props){

    return(
        <div className="activity">
             {props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/>?
             (<div><h3>Welcome to your Activity Page!</h3></div>):<h3>Please Login!!!</h3>}
        </div>
        );
}

export default Activity;

