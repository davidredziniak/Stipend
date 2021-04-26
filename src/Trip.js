import React, {useState, useEffect} from 'react';
import Activity from './Activity.js'
import {useParams} from "react-router-dom";
import { tripIdApi,userApi } from './api/api.js';

function Trip(props)
{
     let { tripId } = useParams();
     
    const [tripName, setTripName] = useState("");
    const [tripOwner, setTripOwner] = useState("");
    const [tripUsers, setTripUsers] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [fullname, setFullname] = useState([]);
    const [emails,setEmails] = useState([]);
  
    function printData(data)
    {
        console.log(data)
        setTripName(data.tripName)
        setTripOwner(data.tripOwner)
        setTripUsers(data.participants[0].firstName)
    }

// useEffect is running infinitely
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const fetcher = await tripIdApi(props.token, tripId);
            console.log("showing fetcher",fetcher)
            setTripName(fetcher.tripName)
            setTripOwner(fetcher.tripOwner)
            setFullname([]);
            //fetcher.participants.map((index)=>setEmails(prev=>[...prev,index.email]));
            fetcher.participants.map((index)=>setFullname(prev=>[...prev,index.firstName+index.lastName]));
            setIsLoading(false);
        }
        fetchData();
        //   //If user is logged in and the token ID is valid, update home page
        //   if(props.token !== "" && props.isAuth)
        //     tripIdApi(props.token, tripId).then(data => printData(data));
    });
    
    return (
        <div className="activity">
             {props.isAuth?
             (
             <div>
             <div><h3>Welcome to trip: {tripName}!</h3></div>
             
             <div><h6>Trip users: {fullname.map(index=><h6>{index}</h6>)}</h6></div>
             
             <div class="triptext">

                <h2>Trip creator: {tripOwner}</h2>
                <Activity/>

             </div>
             </div>
             ):<h3>Please Login!!!</h3>}
        </div>
        );
}
export default Trip;