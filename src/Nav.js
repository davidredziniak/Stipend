import logo from './logo.svg';
import React, { useState, Component } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';

import Test from './Test.js';

import Activity from './Activity';

import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";

class Nav extends React.Component {
    render(){
        return(
    <nav className='navStyle'>
        <h1>Stipend</h1>

        <ul className="nav-links">

        <div>
            {this.props.isAuth && <Login tokenHandler={this.props.token} 
            authHandler={this.props.auth}/>?(<Link to='/activity'><button>Activity</button></Link>):null}
        </div>
            <Link className='navStyle'to="/">
              <li>Home</li>
            </Link>

            { !this.props.isAuth && <Login tokenHandler={this.props.token} authHandler={this.props.auth}/> }
            { this.props.isAuth && <Logout tokenHandler={this.props.token} authHandler={this.props.auth} currentToken={this.props.currentToken} /> }
        </ul>
    </nav>
    );
    }
}

export default Nav;

//<button type="submit" onClick={()=>{<Router><Switch><Route path="/Activity" exact component={Test}/></Switch></Router>}}>Activity</button>