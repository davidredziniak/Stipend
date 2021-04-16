import React, { useState,useRef } from 'react';
import Login from './Login.js';
function TripHome(props)
{
    return (
        <div className="activity">
             {props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/>?
             (<div><h3>Welcome to your TripHome!</h3></div>):<h3>Please Login!!!</h3>}
        </div>
        );
}
export default TripHome;