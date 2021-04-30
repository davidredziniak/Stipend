import { useState, useEffect } from 'react';
import './App.css';
//import Login from'./Login';
//import Logout from'./Logout';
import HomePage from './components/HomePage';
import Nav from './Nav';
import Activity from './Activity';
import JoinTrip from './JoinTrip';
import CreateTrip from './CreateTrip';
import Trip from './Trip';
import 'react-notifications/lib/notifications.css';
import LandingPage from './LandingPage';
import {NotificationContainer, NotificationManager} from 'react-notifications';


import {BrowserRouter as Router, HashRouter, Switch,Route} from "react-router-dom";
// removed props from App()
function App() {
    const [isAuthenticated, setAuth] = useState(false);
    const [tokenId, setTokenId] = useState('');
    
    function createNotification(type, title, message) {
      switch (type) {
        case 'info':
          console.log(type);
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success(message, title, 3000);
          break;
        case 'warning':
          NotificationManager.warning(message, title, 5000);
          break;
        case 'error':
          NotificationManager.error(message, title, 5000);
          break;
      }
    };
  
    // When components gets added to the DOM tree, state is loaded from localStorage (if available)
    useEffect(() => {
      let storedAuth = localStorage.getItem('isAuth') === 'true';
      let storedTokenId = localStorage.getItem('tokenId');
      let newAuth = isAuthenticated;
      let newToken = tokenId;
      if(storedAuth !== undefined)
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
    //<Route path="/trip" render={(props) => ( <Trip logout={logoutHandler} isAuth={isAuthenticated} token={tokenId} /> )}/>
    return (
    <HashRouter>
    <div className="App">
        <Nav login={loginHandler} logout={logoutHandler} isAuth={isAuthenticated} token={tokenId}/>
        <Switch>
          <Route exact path="/" render={() => ( <LandingPage/>)}/>
          <Route exact path="/home" render={(props) => ( <HomePage createNotif={createNotification} logout={logoutHandler} isAuth={isAuthenticated} token={tokenId} /> )}/>
          <Route exact path="/activity" render={(props) => ( <Activity createNotif={createNotification} logout={logoutHandler} isAuth={isAuthenticated} token={tokenId} /> )}/>
          <Route exact path="/jointrip" render={(props) => ( <JoinTrip createNotif={createNotification} logout={logoutHandler} isAuth={isAuthenticated} token={tokenId} /> )}/>
          <Route exact path="/createtrip" render={(props) => ( <CreateTrip createNotif={createNotification} logout={logoutHandler} isAuth={isAuthenticated} token={tokenId} /> )}/>
          <Route path="/trip/:tripId" render={(props) => ( <Trip createNotif={createNotification} logout={logoutHandler} isAuth={isAuthenticated} token={tokenId} /> )}/>
        </Switch>
      </div>
    </HashRouter>);
};

export default App;