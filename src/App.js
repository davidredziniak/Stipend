import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';

import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";

export default function App() {
  
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/Logout">Logout</Link>
            </li>


          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/Logout">
            <Logout />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}


