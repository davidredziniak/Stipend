import React from 'react';

import {GoogleLogin} from 'react-google-login';

import {refreshTokenSetup} from './refreshToken.js';
import {loginApi} from './api/api.js';
import { useHistory, BrowserRouter as Router,Route, Link} from "react-router-dom";


const clientId = process.env.REACT_APP_CLIENT_ID;

function Login(props)
{
    //const [email,setEmail] = useState('');
    //const [name,setName] = useState('');
    //const [tokenId, setTokenId] = useState('');
    //const [givenName,setGivenName] = useState('');
   // const [logStatus,setLogStatus] = useState(false);
    const history = useHistory();

    const onSuccess= (res)=>
    {
        console.log('[Login Success] currentUser:',res.tokenId);
        loginApi(res.tokenId).then(data => console.log('Verified API login:', data));
        //setTokenId(res.tokenId);
        //setEmail(res.profileObj['email']);
        //setName(res.profileObj['name']);
        //setGivenName(res.profileObj['givenName']);
       // setLogStatus(true);
        refreshTokenSetup(res);
        props.authHandler(true);
        props.tokenHandler(res.tokenId);
        history.push("/Home");
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
