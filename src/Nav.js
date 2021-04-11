import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';

import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";

export default function Nav() {
    return(
    <nav className='navStyle'>
        <h1>Stipend</h1>
        <ul className="nav-links">
            <Link className='navStyle'to="/Login">
              <li>Login</li>
            </Link>
            <Link className='navStyle' to="/Logout">
                <li>Logout</li>
            </Link>
        </ul>
    </nav>
    );
    
    
}