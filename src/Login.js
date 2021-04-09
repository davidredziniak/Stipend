import React, { useState } from 'react';
import dotenv from 'dotenv';
import {GoogleLogin} from 'react-google-login';

import {refreshTokenSetup} from './refreshToken.js';
import Dashboard from './Dashboard';
import App from './App';


const clientId = process.env.REACT_APP_CLIENT_ID;
// const clientId = `${process.env.REACT_APP_CLIENT_ID}`;


function Login()
{
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [givenName,setGivenName] = useState('');
    const [logStatus,setLogStatus] = useState(false);
    console.log(logStatus);
    
    // NEED TO FIND HOW TO DO GOOGLE LOGOUT
    // const logout=()=>{
    //     setLogStatus(false);
    // }
    
    
    const onSuccess= (res)=>
    {
        console.log('[Login Success] currentUser:',res.profileObj);
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
        return (<Dashboard email={email} name={name} givenName={givenName} setLogStatus={setLogStatus}/>);
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
