import logo from './logo.svg';
import Login from './Login.js';
import Logout from './Logout.js';
import React, { useState,useRef } from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function JoinTrip(props){
    const user = useRef('');
   
    return(
        <div className="activity">
             {props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/>?
             (<div><h3>Welcome to your Join Page!</h3>
              <input ref={user} type="Number" />
              <button onClick={()=>alert(user.current.value)} type="submit">Enter</button>
             </div>)
             :null}
        </div>
        );
}

export default JoinTrip;