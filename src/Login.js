import React, { useState } from 'react';
import dotenv from 'dotenv';
import {GoogleLogin} from 'react-google-login';

import {refreshTokenSetup} from './refreshToken.js';
import Dashboard from './Dashboard';
import App from './App';

<<<<<<< HEAD
const clientId = process.env.REACT_APP_CLIENT_ID;
// const clientId = `${process.env.REACT_APP_CLIENT_ID}`;
=======
//const clientId = `${process.env.REACT_APP_CLIENT_ID}`;

require('dotenv').config();
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

>>>>>>> 803fca10eb8d5856faa63c7d32eeb2ee8dd1aa83

function Login({log})
{
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [givenName,setGivenName] = useState('');
    const [logStatus,setLogStatus] = useState(false);
    
    const onSuccess= (res)=>
    {
        console.log('[Login Success] currentUser:',res.profileObj);
        setEmail(res.profileObj['email']);
        setName(res.profileObj['name']);
        setGivenName(res.profileObj['givenName']);
        setLogStatus(true);
        log = givenName;
        // refreshed token after an hour
        refreshTokenSetup(res);
    };
    const onFailure = (res)=> 
    {
        console.log('[Login failed] res:',res);
    }
    
    return (
        <div>
            <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy ={'single_host_origin'}
                style ={{marginTop: '100px'}}
                isSignedIn={true}
            />
            </div>
            {logStatus?
            (<div>
                
                <App email={email} name={name} givenName={givenName} log={log}/>
            </div>) : null
            }
        </div>
        );
}
// <Dashboard email={email} name={name} givenName={givenName} log={log}/>
export default Login;
