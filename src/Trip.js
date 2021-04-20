
import React, {useState, useEffect} from 'react';


//import ReactDOM from "react-dom";


import {
  useParams
} from "react-router-dom";
import { tripIdApi } from './api/api.js';

function Trip(props)
{
     let { tripId } = useParams();
    const [tripName, setTripName] = useState("");
    const [tripOwner, setTripOwner] = useState("");
    const [tripUsers, setTripUsers] = useState([]);

    
    // Load all trip data
    useEffect(() => {
      if(props.isAuth && props.token !== ""){
        tripIdApi(props.token, tripId).then(data => console.log('Received data: ', data));
      }
    });
    
    return (
        <div className="activity">
             {props.isAuth?
             (
             <div>
             <div><h3>Welcome to your Trip {tripId}!</h3></div>
             <div><p>The trip name is : {tripName}</p></div>
             <div><button>Click</button></div>
             </div>
             ):<h3>Please Login!!!</h3>}
        </div>
        );
}
export default Trip;