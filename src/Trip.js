
import React, {useState, useEffect} from 'react';


//import ReactDOM from "react-dom";

import {
  useParams
} from "react-router-dom";
import { tripIdApi,userApi } from './api/api.js';

function Trip(props)
{
     let { tripId } = useParams();
     
    const [tripName, setTripName] = useState("");
    const [tripOwner, setTripOwner] = useState("");
    const [tripUsers, setTripUsers] = useState([]);

    function printData(data)
    {
        setTripName(data.tripName)
        setTripOwner(data.tripOwner)
    }
    // Load all trip data
    // useEffect(() => {
    //   if(props.isAuth && props.token !== ""){
    //     tripIdApi(props.token, tripId).then(data => console.log('Received data: ', data));
        
    //   }
    // });
    useEffect(() => {
      //If user is logged in and the token ID is valid, update home page
      if(props.token !== "" && props.isAuth)
        tripIdApi(props.token, tripId).then(data => printData(data));
  
    });
    
    return (
        <div className="activity">
             {props.isAuth?
             (
             <div>
             <div><h3>Welcome to your Trip {tripId}!</h3></div>
             <div class="triptext">
                <p>The trip name is : {tripName}</p>
                <p>Trip owner is : {tripOwner}</p>
             </div>
             <div><button>Click</button></div>
             </div>
             ):<h3>Please Login!!!</h3>}
        </div>
        );
}
export default Trip;