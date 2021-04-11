import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Dashboard(props){
    return(
        <div>
            <ul>GIVEN NAME: {(props.givenName).charAt(0).toUpperCase() + (props.givenName).slice(1)}</ul>
            <ul>FULLNAME: {props.name}</ul>
            <ul>EMAIL: {props.email}</ul>
            <Logout/>
            <Router>
                <div>
                    <ul to='/logout'></ul>
                    <Route path="/logout" component={Logout} />
                </div>
            </Router>
            
        </div>
        );
}

export default Dashboard;
