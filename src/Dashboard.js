import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';


function Dashboard(props){

    return(
        <div>
            <ul>GIVEN NAME: {(props.givenName).charAt(0).toUpperCase() + (props.givenName).slice(1)}</ul>
            <ul>FULLNAME: {props.name}</ul>
            <ul>EMAIL: {props.email}</ul>
        </div>
        );
}
export default Dashboard;