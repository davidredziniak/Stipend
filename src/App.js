<<<<<<< HEAD

import React from 'react';
=======
import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
>>>>>>> 46df577eb280fb2a6b81f36338fbea67fd463f3b
import './App.css';
//import Login from'./Login';
//import Logout from'./Logout';
import HomePage from './components/HomePage';
import Nav from './Nav';
import Activity from './Activity';
import JoinTrip from './JoinTrip';
import CreateTrip from './CreateTrip';
import TripHome from './TripHome';


import {BrowserRouter as Router, Switch,Route} from "react-router-dom";

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
      if(storedTokenId !== undefined)
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
          <Route exact path="/Home" render={(props) => ( <HomePage auth={this.authHandler} token={this.tokenHandler} isAuth={this.state.isAuthenticated} currentToken={this.state.tokenId} /> )}/>
          <Route exact path="/Activity" render={(props) => ( <Activity auth={this.authHandler} token={this.tokenHandler} isAuth={this.state.isAuthenticated} currentToken={this.state.tokenId} /> )}/>
          <Route exact path="/JoinTrip" render={(props) => ( <JoinTrip auth={this.authHandler} token={this.tokenHandler} isAuth={this.state.isAuthenticated} currentToken={this.state.tokenId} /> )}/>
          <Route exact path="/CreateTrip" render={(props) => ( <CreateTrip auth={this.authHandler} token={this.tokenHandler} isAuth={this.state.isAuthenticated} currentToken={this.state.tokenId} /> )}/>
          <Route exact path="/TripHome" render={(props) => ( <TripHome auth={this.authHandler} token={this.tokenHandler} isAuth={this.state.isAuthenticated} currentToken={this.state.tokenId} /> )}/>
        </Switch>
      </div>
    </Router>);
};

export default App;