import React, { useState } from 'react';
import dotenv from 'dotenv';
import {GoogleLogin} from 'react-google-login';

import {refreshTokenSetup} from './refreshToken.js';
import {loginApi} from './api/api.js';
import Dashboard from './Dashboard';

const clientId = process.env.REACT_APP_CLIENT_ID;

function Login(props)
{
    const [logStatus,setLogStatus] = useState(false);
    
    const onSuccess= (res)=>
    {
        console.log('[Login Success] currentUser:',res.tokenId);
        loginApi(res.tokenId).then(data => console.log('Verified API login:', data)).then(result => props.login(res.tokenId));
        setLogStatus(true);
        refreshTokenSetup(res);
    };
    const onFailure = (res)=> 
    {
        console.log('[Login failed] res: ',res);
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
                    isSignedIn={false}
                />
                </div>
            </div>
            );
}

export default Login;
