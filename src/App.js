import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';
import Dashboard from './Dashboard';

function App() {
  
    return (
      <div className="App">
      <h1 className='heading'><i>STIPEND, Trips Made Easy </i></h1>
        <Login />
      </div>
    );
  }


export default App;
