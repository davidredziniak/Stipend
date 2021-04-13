import logo from './logo.svg';
import React, { useState, Component } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';

import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";

function Nav(props) {
    
    return(
    <nav className='navStyle'>
        <h1>Stipend</h1>
        <ul className="nav-links">
            <Link className='navStyle'to="/">
              <li>Home</li>
            </Link>
            { !props.isAuth && <Login login={props.login}/> }
            { props.isAuth && <Logout logout={props.logout} token={props.token}/> }
        </ul>
    </nav>
    );
}

export default Nav;