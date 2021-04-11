import React from 'react';
import dotenv from 'dotenv'
import Login from'./Login.js';
<<<<<<< HEAD
import {GoogleLogout} from 'react-google-login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
=======
import { GoogleLogout } from 'react-google-login';
>>>>>>> bee57b52b63726c0427716929fd1d905898280a7

const clientId = process.env.REACT_APP_CLIENT_ID;

function Logout(props)
{
    const onSuccess=()=>
    {
        props.authHandler(false);
        props.tokenHandler("");
        console.log('Logout made successfully');
    };
    
    return(
        <div>
<<<<<<< HEAD
            <div>
                
=======
>>>>>>> bee57b52b63726c0427716929fd1d905898280a7
                <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                style ={{marginTop: '100px'}}
                to='/login'
                />
<<<<<<< HEAD
        
                
            </div>
=======
>>>>>>> bee57b52b63726c0427716929fd1d905898280a7
        </div>
        );
}
export default Logout;