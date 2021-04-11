import React, { useState } from 'react';
import dotenv from 'dotenv';
<<<<<<< HEAD
import Logout from'./Logout.js';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { Redirect } from 'react-router-dom';
=======
import {GoogleLogin} from 'react-google-login';

>>>>>>> 6a3cb9bf7b3376a63647fad176c5c91428e3e397
import {refreshTokenSetup} from './refreshToken.js';
import {loginApi, userApi} from './api/api.js';
import Dashboard from './Dashboard';

<<<<<<< HEAD
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const clientId = process.env.REACT_APP_CLIENT_ID;

function Login()
=======
const clientId = process.env.REACT_APP_CLIENT_ID;

function Login(props)
>>>>>>> bee57b52b63726c0427716929fd1d905898280a7
{
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [givenName,setGivenName] = useState('');
    const [logStatus,setLogStatus] = useState(false);
    const [tokenId,setTokenId] = useState('');
    console.log(logStatus);
    
    
    const onSuccess= (res)=>
    {
        console.log('[Login Success] currentUser:',res.tokenId);
        loginApi(res.tokenId).then(data => console.log('Verified Status:', data));
        //setTokenId(res.tokenId);
        //setEmail(res.profileObj['email']);
        //setName(res.profileObj['name']);
        //setGivenName(res.profileObj['givenName']);
        setLogStatus(true);
        refreshTokenSetup(res);
        props.authHandler(true);
        props.tokenHandler(res.tokenId);
    };
    const onFailure = (res)=> 
    {
        console.log('[Login failed] res: ',res);
    }
<<<<<<< HEAD
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
=======

    return (
>>>>>>> bee57b52b63726c0427716929fd1d905898280a7
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

export default Login;
