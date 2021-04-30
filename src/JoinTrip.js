import { useRef } from 'react';
import { joinTripApi } from './api/api.js';
import { useHistory} from "react-router-dom";
import './App.css';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import LandingPage from './LandingPage';

function JoinTrip(props){
    const user = useRef('');
    const history = useHistory();
    
    function handleErrors(data){
      if(data.success === false)
        props.createNotif('error', data.message);
      else
          history.push('/trip/' + data.tripId);
    }
    
    function joinTrip(joinCode){
        if(props.token !== "")
            joinTripApi(props.token, joinCode).then(data => handleErrors(data));
    }
    
    return(
        
        <div>
        <NotificationContainer/>
        <div className="Activity">
             {props.isAuth ?
             (<div><h3 className="headingClass">Join an existing trip!</h3>
              <input required type="text" placeholder="Enter Invitation Code"  className = "joinTrip" ref={user} pattern="^[a-zA-Z0-9]*$" maxLength="7"/>
              <div ><button className = "joinSubmit" onClick={()=>joinTrip(user.current.value)} type="submit" required>Join Trip</button></div>
             </div>)
             :<LandingPage/>}
        </div>
        </div>
        );
}

export default JoinTrip;

