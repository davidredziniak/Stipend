import { useRef, useState } from 'react';
import { joinTripApi } from './api/api.js';
import { useHistory} from "react-router-dom";
import './App.css';
import LandingPage from './LandingPage'

function JoinTrip(props){
    const user = useRef('');
    const history = useHistory();
    const [check,setCheck] =useState(true); 
    function joinTrip(joinCode){
        if(props.token !== ""  && joinCode!=""){
            joinTripApi(props.token, joinCode).then(data => history.push('/trip/' + data.tripId));
            if(user==null || user=="" || user==undefined){
            setCheck(false);
            }
            user.current.value=""
        }
    }
    return(
        <div className="activity">
             {props.isAuth ?
             (<div><h3 className="headingClass">Join an existing trip!</h3>
             <form>
                <input type="text" placeholder="Enter Invitation Code" className = "joinTrip" ref={user} pattern="^[a-zA-Z0-9]*$" maxLength="7" required/>
                <div><button className = "joinSubmit" onClick={()=>joinTrip(user.current.value)} type="submit">Join Trip</button></div>
             </form>
             </div>)
             :<LandingPage/>}
        </div>
        );
}

export default JoinTrip;

