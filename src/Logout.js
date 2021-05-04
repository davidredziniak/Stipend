import React from 'react';
import { GoogleLogout } from 'react-google-login';
import {logoutApi} from './api/api.js';
const clientId = process.env.REACT_APP_CLIENT_ID;

function Logout(props)
{
    const onSuccess=()=>
    {
        logoutApi(props.token).then(data => console.log('Verified API logout:', data)).then(result => props.logout());
        console.log('Logout made successfully');
    };
    
    return(
        <div >
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
