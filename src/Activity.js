import Login from './Login.js';
import {useState, useEffect} from 'react';
import './App.css';
import { getActivityApi, setUserPaidApi, removeFromActivityApi } from './api/api.js';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

//import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function Activity(props){
    
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [owner, setOwner] = useState(false);
    const [costPerPerson, setCostPerPerson] = useState("");
    const [participants, setParticipants] = useState([]);
    
    function handleErrors(data){
      if(data.success === false)
        props.createNotif('error', data.message);
      else if(data.success === true)
        props.createNotif('success', data.message);
    }
    
    function markUserPaid(email){
      setUserPaidApi(props.token, props.id, email).then(data => handleErrors(data)).then(data => props.refresh());
    }
    
    function removeUserFromActivity(email){
      removeFromActivityApi(props.token, props.id, email).then(data => handleErrors(data)).then(data => props.refresh());
    }
    
    function configureState(data){
      console.log(data);
      setName(data.name);
      setCost(data.totalCost);
      setCostPerPerson(data.costPerPerson);
      setDate(data.date);
      setTime(data.time);
      setParticipants(data.participants);
      setOwner(data.owner);
    }
    
    useEffect(() => {
      //If user is logged in and the token ID is valid, update home page
      if(props.token !== "" && props.isAuth)
        getActivityApi(props.token, props.id).then(data => configureState(data));
    },[props.token, props.refreshState]);

    return (
      <div className="Activity">
        <NotificationContainer/>
            <div className="box">
              <h3>{name}.. </h3><h4>({date} at {time})</h4><h5> Total cost ${cost} - Cost per person ${costPerPerson}</h5>
              <p>Participants {participants.map( user => ( 
                <p>
                  {user.firstName} - {user.email} - Paid? {user.paid == 1 ? <b>Yes</b> : <b>No</b>} {owner && user.paid == 0? <div><button onClick={ () => markUserPaid(user.email)}>'Mark as Paid'</button></div> : '' }
                                                                                                    {owner && user.email != owner.email? <div><button onClick={ () => removeUserFromActivity(user.email)}>'Remove User'</button></div> : '' }
                </p> 
              ) )}</p>
            </div>
      </div>
    );
}

export default Activity;