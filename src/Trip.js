import React, {useState, useEffect} from 'react';
import Activity from './Activity.js'
import CreateActivity from './CreateActivity.js'
import {useParams} from "react-router-dom";
import { tripIdApi,userApi,userBalanceApi } from './api/api.js';

function Trip(props)
{
     let { tripId } = useParams();
     
    const [tripName, setTripName] = useState("");
    const [tripOwner, setTripOwner] = useState("");
    const [tripUsers, setTripUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fullname, setFullname] = useState([]);
    const [participants,setParticipants] = useState([]);
    const [activityIds, setActivityIds] = useState([]);
    const [balance, setBalance] = useState(0);
    
    //useState with activity id []
    function configureState(data)
    {
        console.log(data);
        setTripName(data.tripName);
        setTripOwner(data.tripOwner);
        setTripUsers(data.participants[0].firstName);
        let newParticipants = participants;
        setParticipants(data.participants);
        setActivityIds(data.activities);
    }

    useEffect(() => {
      //If user is logged in and the token ID is valid, update home page
      if(props.token !== "" && props.isAuth){
        tripIdApi(props.token, tripId).then(data => configureState(data));
        userBalanceApi(props.token, tripId).then(data => setBalance(data.balance));
      }
    },[props.token]);

    return (
        <div className="activity">
             {props.isAuth?
             (
             <div>
             <div><h1>{tripName}!</h1></div>
             <div><h4>Trip creator: {tripOwner}</h4></div>
             
             <div><h6><table><th>Participants on this trip: </th>{participants.map(user => (<tr><td><h6>{user.firstName} - {user.email}</h6></td></tr>))}</table></h6></div>
             <div class="triptext">
                <div className="smallBox">Outstanding balance: <b>${balance}</b></div>
                <CreateActivity token={props.token} trip={tripId} />
                {activityIds.map(activityId => <Activity token={props.token} isAuth={props.isAuth} id={activityId} />)}
             </div>
             </div>
             ):<h3>Please Login!!!</h3>}
        </div>
        );
}
export default Trip;


// useEffect is running infinitely
    // useEffect(() => {
    //     async function fetchData() {
    //         console.log('look')
    //         setIsLoading(true);
    //         const fetcher = await tripIdApi(props.token, tripId);
    //         console.log("showing fetcher",fetcher)
    //         setTripName(fetcher.tripName)
    //         setTripOwner(fetcher.tripOwner)
    //         setFullname([]);
    //         //setEmails([]);
    //         fetcher.participants.map((index)=>setEmails(prev=>[...prev,index.email]));
    //         //fetcher.participants.map((index)=>setFullname(prev=>[...prev,index.firstName+" "+index.lastName]));
    //         setIsLoading(false);
    //     }
    //     fetchData();
    //     //   //If user is logged in and the token ID is valid, update home page
    //     //   if(props.token !== "" && props.isAuth)
    //     //     tripIdApi(props.token, tripId).then(data => printData(data));
    // },[props.token]);
    