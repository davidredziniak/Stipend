import Login from './Login.js';
import {useState, useEffect} from 'react';
import './App.css';
import { getActivityApi, setUserPaidApi } from './api/api.js';

//import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function Activity(props){
    
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [owner, setOwner] = useState(false);
    const [costPerPerson, setCostPerPerson] = useState("");
    const [participants, setParticipants] = useState([]);
    
    function markUserPaid(email){
      setUserPaidApi(props.token, props.id, email).then(data => console.log(data)).then(data => props.refresh());
    }
    
    function configureState(data){
      console.log(data);
      setName(data.name);
      setCost(data.totalCost);      
      setCostPerPerson(data.costPerPerson);
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
            <div className="box">
              <h3>{name}..</h3><h5> Total cost ${cost} - Cost per person ${costPerPerson}</h5>
              <p>Participants {participants.map( user => ( <p>{user.firstName} - {user.email} - Paid? {user.paid == 1 ? <b>Yes</b> : <b>No</b>} {owner && user.paid == 0? <div><button onClick={ () => markUserPaid(user.email)}>'Mark as Paid'</button></div> : '' }</p> ) )}</p>
            </div>
      </div>
    );
}

export default Activity;
