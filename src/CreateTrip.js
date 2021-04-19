import Login from './Login.js';
import TripHome from './TripHome';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './App.css';
import InputEmails from './InputEmails';
import { useHistory, BrowserRouter as Router,Route, Link} from "react-router-dom";
//import 'react-datetime/css/react-datetime.css';
/* eslint-disable react/jsx-props-no-spreading */
function CreateTrip(props){
    const history = useHistory();
    //const user = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

 // const onSubmit = data => console.log(data);
  function onSubmit(data){
      console.log(data);
      // doesnt redirect till all fields are filled up
      history.push("/TripHome");
  }

    return(
        <div className="activity">
            {props.isAuth?(
            <div>
                <h3>Welcome to your Create Trip!</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                        <div><label for="Name" className="labels">Trip Name:</label>
                        <input required type="text" id="Name" className="createTripInputs" placeholder="Trip Name*" {...register("Trip Name", {required: true, maxLength: 17})} /></div>
                        <div className="lines">____________________________________________________________________________________</div>
                        
                        <div><label for="tripStart" className="labels">Trip's Start Date:</label>
                        <input required type="date" id="tripStart" className="createTripInputs" placeholder="Start Date" {...register("Start Date", {required: true})} /></div>
                        
                        <div className="lines">____________________________________________________________________________________</div>
                        
                        <div><label for="tripEnd" className="labels">Trip's End Date:</label>
                        <input required type="date" id="tripEnd" className="createTripInputs" placeholder="End Date" {...register("End Date", {required: true})}/></div>
                        
                        <div className="lines">____________________________________________________________________________________</div>
                        
                        <div><label className="labels">Enter Participant's Gmail Accounts: </label>
                        <InputEmails/></div>
                        
                        <div className="lines">____________________________________________________________________________________</div>
                        
                        <div><label for="JoinCode" className="labels">Create Join Code:</label></div>
                        <div><input required type="text" id="JoinCode" className="createTripInputs" placeholder="Join Code" maxLength="7" {...register("Join Code", {required: true, maxLength: 7})} /></div>
                        <div className="lines">____________________________________________________________________________________</div>

                        <div><button type="submit">Submit</button></div>
                </form>
            </div>)
            :null}

            <Router>
                <div>
                    <Route path="/TripHome" component={TripHome}/>
                </div>
            </Router>

                
        </div>
        );
}

export default CreateTrip;
