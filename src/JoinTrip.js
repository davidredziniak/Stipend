import Login from './Login.js';
import React, { useRef } from 'react';
import './App.css';

function JoinTrip(props){
    const user = useRef('');
   
    return(
        <div className="activity">
             {props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/>?
             (<div><h3>Welcome to your Join Page!</h3>
              <input ref={user} type="Number" />
              <button onClick={()=>alert(user.current.value)} type="submit" required>Enter</button>
             </div>)
             :null}
        </div>
        );
}

export default JoinTrip;