import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';
import Dashboard from './Dashboard';

function App() {
  
  // const [login, setLogin] = useState(false);
  // const [name, setName] = useState('');
  
  // const log = (username) => {
  //   setNewUser(username);
  //   setLogin(!login);
  // };
  
// if(name != ''){
//   return (name);
// }
// else{
    return (
      <div className="App">
      <h1 className='heading'><i>STIPEND, Trips Made Easy </i></h1>
        <Login />
      </div>
    );
  }
//}

export default App;
