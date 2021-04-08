import React from 'react';
import dotenv from 'dotenv'
import Login from'./Login.js';
import {GoogleLogout} from 'react-google-login';
<<<<<<< HEAD

const clientId = process.env.REACT_APP_CLIENT_ID;
// const clientId = `${process.env.REACT_APP_CLIENT_ID}`;
=======
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
>>>>>>> 803fca10eb8d5856faa63c7d32eeb2ee8dd1aa83

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
                />
            </div>
        </div>
        );
}
export default Logout;