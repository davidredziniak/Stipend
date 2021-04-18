import Login from './Login.js';
import TripHome from './TripHome';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './App.css';
import InputEmails from './InputEmails';
import { BrowserRouter as Router,Route, Link} from "react-router-dom";
//import 'react-datetime/css/react-datetime.css';
/* eslint-disable react/jsx-props-no-spreading */
function CreateTrip(props){

    //const user = useState('');
    const [dataa,setDataa]=useState(false);
    //const numberOfUser = useState(0);
   // const [date,setDate] = useState([]);
    //const [email,setEmail]=useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    var result = '';
 // const onSubmit = data => console.log(data);
  function onSubmit(data){
      //console.log(data);
      setDataa(true);
      console.log(dataa);
  }
  
  function invitationCode(){
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 7; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    // result is the random Code that must be emailed to the participants
    return result;
  }

  
// console.log(errors);
// <div><input type="text"  placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} /></div>
// <div>{invitationCode()}</div>
    return(
        <div className="activity">
            {props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/>?(
            <div>
                <h3>Welcome to your Create Trip!</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                        <div><label for="Name" className="labels">Trip Name:</label>
                        <input type="text" id="Name" className="createTripInputs" placeholder="Trip Name*" {...register("Trip Name", {required: true, maxLength: 17})} /></div>
                        
                        <div className="lines">____________________________________________________________________________________</div>
                        
                        <div><label for="tripStart" className="labels">Trip's Start Date:</label>
                        <input type="date" id="tripStart" className="createTripInputs" placeholder="Start Date" {...register("Start Date", {required: true})} /></div>
                        
                        <div className="lines">____________________________________________________________________________________</div>
                        
                        <div><label for="tripEnd" className="labels">Trip's End Date:</label>
                        <input type="date" id="tripEnd" className="createTripInputs" placeholder="End Date" {...register("End Date", {required: true})} /></div>
                        
                        <div className="lines">____________________________________________________________________________________</div>
                        
                        <div><label className="labels">Enter Participant's Gmail Accounts:</label>
                        <InputEmails/></div>
                        <div className="lines">____________________________________________________________________________________</div>
                        {dataa?(<div><Link to="/TripHome"><input type="submit" /></Link></div>):<div><input type="submit"/></div>}
                        <div>{invitationCode()}</div>
                </form>
            </div>)
            :null}

            {dataa?(
                <Router>
                    <div>
                        <Route path="/TripHome" component={TripHome}/>
                    </div>
                </Router>):null}
        </div>
        );
}

export default CreateTrip;
