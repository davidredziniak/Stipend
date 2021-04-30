import { useState, useEffect } from 'react';
// import Login from'../Login.js';
// import Logout from'../Logout.js';
//import {loginApi, userApi} from '../api/api.js';
import { userApi,deleteTripIdApi} from '../api/api.js';

import LandingPage from "../LandingPage";

import {NotificationContainer} from 'react-notifications';


function HomePage(props){
    
    const [isViewable, setViewable] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [trips, setTrips] = useState([]);
    const [hide, setHide]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    
    function randomImages(){
      var images = ["https://i.stack.imgur.com/CJT47.jpg","https://www.freegreatpicture.com/files/85/2994-man-and-nature.jpg"
                    ,"https://www.freegreatpicture.com/files/31/10971-world-scenery.jpg"
                    ,"https://media.cntraveler.com/photos/5949abf42bd0d42819c6065e/master/pass/Big-Bend-GettyImages-516259396.jpg"
                    ,"https://media.timeout.com/images/105685502/image.jpg"];
     var randomImage = images[Math.floor(Math.random()*images.length)];
      return randomImage;
    }
    
    function handleErrors(data){
      if(data.success === false)
        props.createNotif('error', data.message);
      else if(data.success === true)
        props.createNotif('success', data.message);
      setIsLoading(!isLoading);
    }
    
    function updateData(data){
      // If the user data API call fails, log the user out.
      if(data.hasOwnProperty('success')){
        if(data.success === false){
          props.logout();
        }
        else{
          setEmail(data.email);
          setLastName(data.lastName);
          setFirstName(data.firstName);
          setTrips(data.trips);
          //console.log(data.trips);
        }
      }
    }
    
    function deleteTrip(trip_id)
    {
      if(props.token !== "")
        deleteTripIdApi(props.token, trip_id).then(data => handleErrors(data));
    }
    

    
    //Rerender component when token ID and isAuth updates.
    useEffect(() => {
      //If user is logged in and the token ID is valid, update home page
      if(props.token !== "" && props.isAuth)
        userApi(props.token).then(data => updateData(data)).then(data => setViewable(true));
  
      //Upon user logout, clear all user data
      if(!props.isAuth){
        setEmail("");
        setLastName("");
        setFirstName("");
        setViewable(false);
      }
    }, [isLoading, props.token, props.isAuth]);
  // <button className="tripsButton">{trip.name} </button>
  
  if(isViewable){
    return (
      <div className="homePage">
      
      <NotificationContainer/>
        <h2>Hello, {firstName}!</h2>
        <h5>Email: {email}</h5>
        <h5>Last Name: {lastName}</h5>

        <div>
          <button className="hideButton" onClick={()=>{setHide(!hide)}} >Show / Hide Trips<br /></button>
        </div>
        {trips.map((trip, index) => {
        return (
        <div>
        {!hide ? (
        <div className="container">
        
            <div className="col">
              <a href={`/#/trip/${trip.trip_id}`}>
                <img className="images" src={randomImages()}/>
                <span className="align-middle">{trip.name} - {trip.startDate} to {trip.endDate}</span>
                <div>
                  
                </div>
              </a>
              <button type="submit" onClick={()=>deleteTrip(trip.trip_id)}>Delete</button>
              </div>
            </div>
       
          ):null}
        </div>
        
        );
      })}
      </div>
    );
  }
  else{
    return (<div>
      <LandingPage/>
    </div>
    );
  }
}

export default HomePage;

//<button onClick={onClickButton} type="button">Test API</button> 