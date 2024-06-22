import React from 'react';
import { googleLogout } from '@react-oauth/google';
import {logoutApi} from './api/api.js';
import { Button } from '@mui/material';

function Logout(props)
{
    const logout=()=>
    {
        logoutApi(props.token).then(data => console.log('Verified API logout:', data)).then(result => props.logout());
        console.log('Logout made successfully');
    };
    
    return(
        <div >
                <Button onClick={logout}>Logout</Button>
        </div>
        );
}

export default Logout;
