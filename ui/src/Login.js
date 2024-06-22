import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { refreshTokenSetup } from './refreshToken.js';
import { loginApi } from './api/api.js';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import {jwtDecode} from "jwt-decode";

function Login(props)
{
    //const [email,setEmail] = useState('');
    //const [name,setName] = useState('');
    //const [tokenId, setTokenId] = useState('');
    //const [givenName,setGivenName] = useState('');
   // const [logStatus,setLogStatus] = useState(false);

   const navigate = useNavigate();

   const login = useGoogleLogin({
    onSuccess: async (response) =>{
        console.log(response);
        loginApi(response.code).then(data => console.log('Verified API login:', data)).then(result => props.login(response.code));
        //refreshTokenSetup(response);
        navigate('/home');
    },
    onError: (error)=>{
      console.log(error);
    },
    flow: 'auth-code',
  });
    return (
            <div> 
                <Button onClick={login}>Login</Button>
            </div>
            );
}

export default Login;