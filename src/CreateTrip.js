import Trip from './Trip';
import React, { useState } from 'react';


import { createTripApi, inviteToTripApi } from './api/api.js';

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
    

 // const onSubmit = data => console.log(data);
  function onSubmit(data){
      console.log(data);
      data.join_code=joinCode();
      // doesnt redirect till all fields are filled up
      if(props.token !== ""){
            createTripApi(props.token, data).then(data => history.push('/trip/' + data.tripId));
      }
      const emails = getInvitedEmails().map(email => email['value'])
      console.log(emails);
      
      if(emails !== []){
          inviteToTripApi(props.token, emails, data['join_code'])
      }
    }
// sample Trip1- code: uw1YGGD

    return(
        <div className="activity">
            {props.isAuth?(
            <div>
                <h3>Welcome to your Create Trip!</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                        <div><label for="Name" className="labels">Trip Name:</label>
                        <input required type="text" id="Name" className="createTripInputs" placeholder="Trip Name*" {...register("trip_name", {required: true, maxLength: 17})} /></div>

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

                        <div><button type="submit" className="tripSubmit">Submit</button></div>
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
