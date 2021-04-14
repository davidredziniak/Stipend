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
       <h1 className='topic'>STIPEND</h1>

        <ul className="nav-links">

        <div>
            {this.props.isAuth && <Login tokenHandler={this.props.token} 
            authHandler={this.props.auth}/>?
            (
            <Link className='navStyle'to='/Activity'><li><button>Activity</button></li></Link>
            )
            :null}
        </div>
        <div>
            {this.props.isAuth && <Login tokenHandler={this.props.token} 
            authHandler={this.props.auth}/>?
            (
            <Link className='navStyle'to='/Home'><li><button>Home</button></li></Link>
            )
            :null}
        </div>
        <div>
            {this.props.isAuth && <Login tokenHandler={this.props.token} 
            authHandler={this.props.auth}/>?
            (
            <Link className='navStyle'to='/JoinTrip'><li><button>JoinTrip</button></li></Link>
            )
            :null}
        </div>
        <div>
            {this.props.isAuth && <Login tokenHandler={this.props.token} 
            authHandler={this.props.auth}/>?
            (
            <Link className='navStyle'to='/CreateTrip'><li><button>CreateTrip</button></li></Link>
            )
            :null}
        </div>


            { !this.props.isAuth && <Login tokenHandler={this.props.token} authHandler={this.props.auth}/> }
            { this.props.isAuth && <Logout tokenHandler={this.props.token} authHandler={this.props.auth} currentToken={this.props.currentToken} /> }
        </ul>
    </nav>
    );
    }
}

export default Nav;

//<button type="submit" onClick={()=>{<Router><Switch><Route path="/Activity" exact component={Test}/></Switch></Router>}}>Activity</button>