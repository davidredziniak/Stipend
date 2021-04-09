import React, { useState } from 'react';
import dotenv from 'dotenv';
<<<<<<< HEAD
import {GoogleLogin} from 'react-google-login';
import {GoogleLogout} from 'react-google-login';
=======
import {GoogleLogin,GoogleLogout} from 'react-google-login';

>>>>>>> 221a0135b0c599038e709a1c93c546104362f26f
import {refreshTokenSetup} from './refreshToken.js';
import Dashboard from './Dashboard';



const clientId = process.env.REACT_APP_CLIENT_ID;



function Login()
{
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    
    const [givenName,setGivenName] = useState('');
    const [logStatus,setLogStatus] = useState(false);
<<<<<<< HEAD
    const [tokenId,setTokenId] = useState('');
    console.log(logStatus);
    
    // NEED TO FIND HOW TO DO GOOGLE LOGOUT
 
    // const logout=()=>{
    //     setLogStatus(false);
    // }
=======
    
    
>>>>>>> 221a0135b0c599038e709a1c93c546104362f26f
    const onSuccessLogout=()=>
    {
        alert('Logout made successfully');
        console.log('Logout made successfully');
    };
<<<<<<< HEAD
=======
    
>>>>>>> 221a0135b0c599038e709a1c93c546104362f26f
    
    const onSuccess= (res)=>
    {
        console.log('[Login Success] currentUser:',res.profileObj);
<<<<<<< HEAD
        
        //console.log(res['tokenId']);
        setTokenId(res['tokenId']);
=======
        console.log('[Login Success] currentUser:',res.tokenId);
>>>>>>> 221a0135b0c599038e709a1c93c546104362f26f
        setEmail(res.profileObj['email']);
        setName(res.profileObj['name']);
        setGivenName(res.profileObj['givenName']);
        setLogStatus(true);
    
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
<<<<<<< HEAD
                <Dashboard email={email} name={name} givenName={givenName} setLogStatus={setLogStatus}/>
                <div>
                    <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onSuccessLogout}
                    style ={{marginTop: '100px'}}
                    />
                </div>
            </div>
            );
=======
            <Dashboard email={email} name={name} givenName={givenName} setLogStatus={setLogStatus}/>
           <div>
                <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccessLogout}
                style ={{marginTop: '100px'}}
                />
            </div>
            </div>
        );
>>>>>>> 221a0135b0c599038e709a1c93c546104362f26f
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
