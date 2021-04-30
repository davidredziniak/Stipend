import Trip from './Trip';
import React, { useState } from 'react';
import { createTripApi, inviteToTripApi } from './api/api.js';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useForm } from "react-hook-form";
import './App.css';
import { getInvitedEmails, InputEmails } from './InputEmails';
import { useHistory, BrowserRouter as Router,Route, Link} from "react-router-dom";

/* eslint-disable react/jsx-props-no-spreading */
function CreateTrip(props){
    const history = useHistory();
    //const user = useState('');
    const { register, handleSubmit } = useForm();
    
    var code = "";
    function joinCode() {
      
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 7; i++)
        code += possible.charAt(Math.floor(Math.random() * possible.length));
      return code;
    }
    

    function handleErrors(data){
      if(data.success === false)
        props.createNotif('error', data.message);
      else
          history.push('/trip/' + data.tripId);
    }
    
 // const onSubmit = data => console.log(data);
    function onSubmit(data){
        data.join_code=joinCode();
        if(props.token !== ""){
            createTripApi(props.token, data).then(data => handleErrors(data));
        }
        const emails = getInvitedEmails().map(email => email['value'])
        if(emails !== [])
            inviteToTripApi(props.token, emails, data['join_code']);
    }
    
// sample Trip1- code: uw1YGGD
    return(
        <div className="activity">
            {props.isAuth?(
            <div>
                <h3 className="headingClass">Create a new trip!</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                        <div><label for="Name" className="labels"> Enter Trip name :</label>
                        <input required type="text" id="Name" className="createTripInputs1" placeholder="eg., Vegas" {...register("trip_name", {required: true, maxLength: 17})} /></div>
                        
                        <div><label for="tripStart" className="labels">Trip's Start Date:</label>
                        <input required type="date" id="tripStart" className="createTripInputs" placeholder="Start Date" {...register("start_date", {required: true})} /></div>
                      
                        <div><label for="tripEnd" className="labels"> Trip's End Date :</label>
                        <input required type="date" id="tripEnd" className="createTripInputs" placeholder="End Date" {...register("end_date", {required: true})}/></div>
                       
                        <div><label className="labels">Invite Participants: </label>
                        <InputEmails/></div>
                        <hr/>
                        <div><button type="submit" className="tripSubmit">Create Trip</button></div>
                </form>
            </div>)
            :null}

            <Router>
                <div>
                    <Route path="/trip" component={Trip}/>
                </div>
            </Router>

                
        </div>
        );
}

export default CreateTrip;