import React, { useState } from 'react';
import dotenv from 'dotenv';
import Logout from'./Logout.js';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { Redirect } from 'react-router-dom';
import {refreshTokenSetup} from './refreshToken.js';
import {loginApi} from './api/api.js';
import Dashboard from './Dashboard';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const clientId = process.env.REACT_APP_CLIENT_ID;

function Login()
{
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    
    const [givenName,setGivenName] = useState('');
    const [logStatus,setLogStatus] = useState(false);
    const [tokenId,setTokenId] = useState('');
    console.log(logStatus);
    
const onSuccess= (res)=>
    {
        console.log('[Login Success] currentUser:',res.profileObj);
        console.log('[Login Success] currentUser:',res.tokenId);
        loginApi(res.tokenId).then(data => console.log('Verified Status:', data));
        setEmail(res.profileObj['email']);
        setName(res.profileObj['name']);
        setGivenName(res.profileObj['givenName']);
        setLogStatus(true);
        // setName(givenName);
        // refreshed token after an hour
        refreshTokenSetup(res);
    };
    const onFailure = (res)=> 
    {
        console.log('[Login failed] res:',res);
    }
    //<Dashboard email={email} name={name} givenName={givenName} setLogStatus={setLogStatus}/>
    if(logStatus){
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" render={(props) => ( <Dashboard email={email} name={name} givenName={givenName} setLogStatus={setLogStatus} /> )}/>
                    </Switch>
                </div>
            </Router>
            );
    }
    else{
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
            </div>
            );
    }
}

export default Login;
