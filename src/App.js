import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';
import HomePage from './components/HomePage';
import TestPage from './components/TestPage';
import Nav from './Nav';

import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";

export default function App() {
  
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [tokenId, setTokenId] = useState("");

    function authHandler(auth){
        setAuthenticated(auth);
    }
    
    function tokenHandler(tokenId){
        setTokenId(tokenId);
    }

  return (
    <Router>
    <div className="App">
        <Nav />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
          </ul>
        <Switch>
          <Route exact path="/" render={(props) => ( <HomePage auth={authHandler} token={tokenHandler} isAuth={isAuthenticated} currentToken={tokenId} /> )}/>
          <Route path="/test" component={TestPage}/>
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