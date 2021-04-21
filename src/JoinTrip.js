import { useRef } from 'react';
import { joinTripApi } from './api/api.js';
import { useHistory} from "react-router-dom";
import './App.css';

function JoinTrip(props){
    const user = useRef('');
    const history = useHistory();
    
    function joinTrip(joinCode){
        if(props.token !== ""){
            joinTripApi(props.token, joinCode).then(data => history.push('/trip/' + data.tripId));
        }
    }
    
    return(
        <div className="activity">
             {props.isAuth ?
             (<div><h3>Welcome to your Join Page!</h3>
              <input ref={user} type="text" />
              <button onClick={()=>joinTrip(user.current.value)} type="submit" required>Enter</button>
             </div>)
             :null}
        </div>
        );
}

export default JoinTrip;