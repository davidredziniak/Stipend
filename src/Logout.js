import React from 'react';
import dotenv from 'dotenv'
import Login from'./Login.js';
import { GoogleLogout } from 'react-google-login';

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
                <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                style ={{marginTop: '100px'}}
                />
        </div>
        );
}
export default Logout;