import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';
import HomePage from './components/HomePage';
import Nav from './Nav';

import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";

function App(props) {
    const [isAuthenticated, setAuth] = useState(false);
    const [tokenId, setTokenId] = useState('');
    
    // When components gets added to the DOM tree, state is loaded from localStorage (if available)
    useEffect(() => {
      let storedAuth = localStorage.getItem('isAuth') === 'true';
      let storedTokenId = localStorage.getItem('tokenId');
      let newAuth = isAuthenticated;
      let newToken = tokenId;
      if(storedAuth != undefined)
        newAuth = storedAuth;
      if(storedTokenId != undefined)
        newToken = storedTokenId;
      setAuth(newAuth);
      setTokenId(newToken);
    }, []);
  
    // Update the authenticated state and token ID
    function loginHandler(tokenId){
      setAuth(true);
      setTokenId(tokenId);
      localStorage.setItem("isAuth", true);
      localStorage.setItem('tokenId', tokenId );
    }
    
    // Clear the authenticated state and token ID
    function logoutHandler(){
      setAuth(false);
      setTokenId("");
      localStorage.setItem("isAuth", false);
      localStorage.setItem('tokenId', "" );
    }
    
    return (
    <Router>
    <div className="App">
        <Nav login={loginHandler} logout={logoutHandler} isAuth={isAuthenticated} token={tokenId}/>
        <Switch>
          <Route exact path="/" render={(props) => ( <HomePage isAuth={isAuthenticated} logout={logoutHandler} token={tokenId} /> )}/>
        </Switch>
      </div>
    </Router>);
};

export default App;