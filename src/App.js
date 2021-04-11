import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';
import Nav from './Nav';

import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";

export default function App() {
  
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Logout" component={Logout}/>
        </Switch>
      </div>
    </Router>

  );
}


const Home = ()=> (
  <div>
    <h1>Home Page</h1>
  </div>
  )