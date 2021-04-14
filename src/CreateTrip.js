import logo from './logo.svg';
import Login from './Login.js';
import Logout from './Logout.js';
import React, { useState,useRef } from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function CreateTrip(props){
    const user = useState('');
    const numberOfUser = useState(0);
    const date = useState([]);
    const [email,setEmail]=useState([]);
    

    return(
        <div className="activity">
             {props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/>?(
             <div>
             <h3>Welcome to your Create Trip!</h3>
             <div>
              <input ref={user} type="Text" />
              <button onClick={()=>user.current.value} type="submit">Enter Trip Name</button>
              </div>
              <div>
              <input ref={numberOfUser} type="Number" />
              <button onClick={()=>numberOfUser.current.value} type="submit">Number of User</button>
              </div>
              <div>
                <label>
                    Start Date:
                     <input type="date" id="start" name="trip-start"/>
                     End Date:
                     <input type="date" id="start" name="trip-end"/>
                 </label>
              
              </div>
             </div>)
             :null}
        </div>
        );
}

export default CreateTrip;