import logo from './logo.svg';
import React, { useState, Component } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';

import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";

class Nav extends React.Component {
    render(){
        return(
    <nav className='navStyle'>
        <h1>Stipend</h1>
        <ul className="nav-links">
            <Link className='navStyle'to="/">
              <li>Home</li>
            </Link>
            <Link className='navStyle' to="/test">
                <li>Test</li>
            </Link>
            { !this.props.isAuth && <Login tokenHandler={this.props.token} authHandler={this.props.auth}/> }
            { this.props.isAuth && <Logout tokenHandler={this.props.token} authHandler={this.props.auth} /> }
        </ul>
    </nav>
    );
    }
}

export default Nav;