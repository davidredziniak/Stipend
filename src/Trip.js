import React, {useState, useEffect } from 'react';
import Activity from './Activity.js'
import CreateActivity from './CreateActivity.js'
import {useParams, useNavigate} from "react-router-dom";
import { tripIdApi,userApi,userBalanceApi, setUserPaidApi } from './api/api.js';
import LandingPage from "./LandingPage";
import './App.css';



function Trip(props)
{
    let { tripId } = useParams();
    const navigate = useNavigate();
    const [tripName, setTripName] = useState("");
    const [joinCode,setJointCode]=useState("");
    const [tripOwner, setTripOwner] = useState("");
    const [tripUsers, setTripUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fullname, setFullname] = useState([]);
    const [participants,setParticipants] = useState([]);
    const [activityIds, setActivityIds] = useState([]);
    const [balance, setBalance] = useState(0);
    

    function handleErrors(data){
      if(data.success === false){
        // Redirect user to homepage if they try to access a trip they aren't a part of
        navigate('/home');
      }
      else if(data.success === true){
        configureState(data);
      }
    }
    
    function configureState(data)
    {
        setTripName(data.tripName);
        setTripOwner(data.tripOwner);
        setTripUsers(data.participants[0].firstName);
        let newParticipants = participants;
        setParticipants(data.participants);
        setActivityIds(data.activities);
        setJointCode(data.joinCode);
    }
    
    function refresh(){
        setIsLoading(!isLoading);
    }


    useEffect(() => {
      //If user is logged in and the token ID is valid, update home page
      if(props.token !== "" && props.isAuth){
        tripIdApi(props.token, tripId).then(data => handleErrors(data));
        userBalanceApi(props.token, tripId).then(data => setBalance(data.balance));
      }
    },[isLoading, props.token, props.isAuth]);

    return (
        <div className="tripactivity">
             {props.isAuth?
             (
             <div>
             <div><h1 className="neon">{tripName}!</h1></div>
             <div><h4>Trip creator: {tripOwner}</h4></div>
             <div><p className="join">Join Code: {joinCode}</p></div>
             <div><h6><table><th>Participants on this trip: </th>{participants.map(user => (<tr><td><h6>{user.firstName} - {user.email}</h6></td></tr>))}</table></h6></div>
             <div class="triptext">
                <div className="smallBox">Outstanding balance: <b>${balance}</b></div>
                <CreateActivity createNotif={props.createNotif} token={props.token} trip={tripId} refresh={refresh} />
                {activityIds.map(activityId => <Activity createNotif={props.createNotif} token={props.token} isAuth={props.isAuth} refresh={refresh} refreshState={isLoading} id={activityId} />)}
             </div>
 
             </div>
             ):<LandingPage/>}
        </div>
        );
}
export default Trip;