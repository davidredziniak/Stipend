import React, { useState } from 'react';
import dotenv from 'dotenv';
import {GoogleLogin} from 'react-google-login';

import {refreshTokenSetup} from './refreshToken.js';
import {loginApi, userApi} from './api/api.js';
import Dashboard from './Dashboard';



const clientId = process.env.REACT_APP_CLIENT_ID;



function Login()
{
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [givenName,setGivenName] = useState('');
    const [logStatus,setLogStatus] = useState(false);
    
    
    const onSuccess= (res)=>
    {
        console.log('[Login Success] currentUser:',res.profileObj);
        console.log('[Login Success] currentUser:',res.tokenId);
        loginApi(res.tokenId).then(data => console.log('Verified Status:', data));
        setTokenId(res.tokenId);
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
    if(logStatus){
        return (
            <div>
            <Dashboard email={email} name={name} givenName={givenName} setLogStatus={setLogStatus}/>
            </div>
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
