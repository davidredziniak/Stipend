import React from 'react';
import dotenv from 'dotenv';
import {GoogleLogin} from 'react-google-login';

import {refreshTokenSetup} from './refreshToken.js';

const clientId = `${process.env.REACT_APP_CLIENT_ID}`;
console.log(clientId)

function Login()
{
    const onSuccess= (res)=>
    {
        console.log('[Login Success] currentUser:',res.profileObj);
        // refreshed token after an hour
        refreshTokenSetup(res);
    };
    const onFailure = (res)=> 
    {
        console.log('[Login failed] res:',res);
        
    }
    return (
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
        
        
        );
}
export default Login;