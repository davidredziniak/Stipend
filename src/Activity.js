import Login from './Login.js';
import {useState, useEffect} from 'react';
import './App.css';
import { getActivityApi } from './api/api.js';

//import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function Activity(props){
  
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [costPerPerson, setCostPerPerson] = useState("");
    const [participants, setParticipants] = useState([]);
    
    function configureState(data){
      setName(data.name);
      setCost(data.totalCost);      
      setCostPerPerson(data.costPerPerson);
      setParticipants(data.participants);
      console.log(data);
    }
    
    useEffect(() => {
      //If user is logged in and the token ID is valid, update home page
      if(props.token !== "" && props.isAuth)
        getActivityApi(props.token, props.id).then(data => configureState(data));
    },[props.token]);

    return (
      <div className="Activity">
            <div className="box">
              <h3>{name}..</h3><h5>Total cost ${cost} - Cost per person ${costPerPerson}</h5>
              <p>Participants {participants.map( user => ( <p>{user.firstName} - {user.email} - Paid? {user.paid == 1 ? <b>Yes</b> : <b>No</b>}</p> ) )}</p>
            </div>
      </div>
    );
}

export default Activity;
