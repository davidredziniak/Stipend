import React from 'react';
import {GoogleLogout} from 'react-google-login';
const clientId = 'YOUR-CLIENT_ID.apps.googleusercontent.com';

function Logout()
{
    const onSuccess=()=>
    {
        alert('Logout made successfully');
    };
    
    return(
        <div>
        <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSucess={onSuccess}
        style ={{marginTop: '100px'}}
        ></GoogleLogout>
        </div>
        
        );
}
export default Logout;