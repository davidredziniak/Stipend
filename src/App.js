import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';
import Dashboard from './Dashboard';

function App(props) {
  
  // const [login, setLogin] = useState(false);
  // const [newUser, setNewUser] = useState('');
  
  // const log = (username) => {
  //   setNewUser(username);
  //   setLogin(!login);
  // };
  if (props.name !=null){
    return(<Dashboard name={props.name} email={props.email} givenName={props.givenName}/>);
  }
  else{
    return (
      <div className="App">
      <h1 className='heading'><i>STIPEND, Trips Made Easy </i></h1>
        <Login/>
        <br/>
        <Logout/>
      </div>
    );
  }
}

export default App;
