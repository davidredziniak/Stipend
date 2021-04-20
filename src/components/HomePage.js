import { useState, useEffect } from 'react';
// import Login from'../Login.js';
// import Logout from'../Logout.js';
//import {loginApi, userApi} from '../api/api.js';
import { userApi} from '../api/api.js';
function HomePage(props){
    
    const [isViewable, setViewable] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [trips, setTrips] = useState([]);
    
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
          console.log(data.trips);
        }
      }
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
    }, [props.token, props.isAuth]);
  
  if(isViewable){
    return (
      <div>
        <h2>Hello, {firstName}</h2>
        <h5>Email: {email}</h5>
        <h5>Last Name: {lastName}</h5>
        {trips.map((trip, index) => {
        return (
        <div>
          <a href={`/trip/${trip.trip_id}`}><p key={`${trip}-${index}`}>Id: {trip.trip_id} - Name: {trip.name}</p></a>
          <button>{trip.name}</button>
        </div>
        );
      })}
      </div>
    );
  }
  else{
    return (<div>
      <h2>Please log in!</h2>
    </div>
    );
  }
}

export default HomePage;

//<button onClick={onClickButton} type="button">Test API</button> 