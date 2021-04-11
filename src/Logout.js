import React from 'react';
import dotenv from 'dotenv'
import Login from'./Login.js';
import {GoogleLogout} from 'react-google-login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const clientId = process.env.REACT_APP_CLIENT_ID;


function Logout()
{
    const onSuccess=()=>
    {
        alert('Logout made successfully');
        console.log('Logout made successfully');
    };
    
    return(
        <div>
            <div>
                
                <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                style ={{marginTop: '100px'}}
                to='/login'
                />
        
                
            </div>
        </div>
        );
}
export default Logout;