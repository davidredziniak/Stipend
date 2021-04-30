import Login from './Login.js';
import React, {useState, useEffect } from 'react';
import './App.css';
<<<<<<< HEAD
import { createActivityApi,updateParticipants } from './api/api.js';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

=======
import { createActivityApi, tripIdApi } from './api/api.js';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {InputEmails , getInvitedEmails} from './InputEmails'
import {useParams, useHistory} from "react-router-dom";
>>>>>>> 66f248cc25fbfccf03c9db208c09387f2b3922aa


//import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function CreateActivity(props){
  
   // const [inputList, setInputList] = useState([{ activityName: "", amount: "", participants: ""  }]);
    //const [showbtn, setShowBtn] = useState(true);
    const [cost, setCost] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [emails, setEmails] = useState([]);
    const [selectEmails,setSelectEmails] = useState([])
    
    let { tripId } = useParams();
    
    function handleErrors(data){
      if(data.success === false)
        props.createNotif('error', data.message);
      else if(data.success === true)
        props.createNotif('success', data.message);
    }
    
    function dynamicEmails(data){
      setSelectEmails(data.participants)
      console.log('printing the method ',data)
    }

    
    function onSubmit(){
      // let arrayOfEmails = emails.split(',');
      // if(arrayOfEmails[0] == "")
      //   arrayOfEmails = []
      console.log('emails list ',emails)
      createActivityApi(props.token, props.trip, name, date, time, cost, emails).then(data => handleErrors(data)).then(data => props.refresh());
    }

    useEffect(() => {
      //If user is logged in and the token ID is valid, update home page
      if(props.token !== ""){
        tripIdApi(props.token, tripId).then(data => dynamicEmails(data));
      }
    },[]);

    return (
      <div className="Activity">

        <Popup trigger={<button> Add an Participant</button>} position="right center">
          <div><InputEmails/> <getInvitedEmails/></div>
          <button type="submit" onChange={e => setEmails(e.target.value)} onClick={onSubmit}>Submit</button>
        </Popup>

        <NotificationContainer/>
            <div className="box">
              <h5> Create an activity </h5>
              <input
                required
                type="text"
                
                name="activityName"
                className="ml10"
                placeholder="Enter Activity Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                required
                type="text"
                name="amount"
                className="ml10"
                placeholder="Enter Cost"
                value={cost}
                onChange={e => setCost(e.target.value)}
              />
              <input
                required
                type="date"
                name="date"
                className="ml10"
                placeholder="Enter Date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
              <input
                required
                type="time"
                name="time"
                className="ml10"
                placeholder="Enter Time"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
              
              <div className="selectEmails"><label for="email">Choose participants:</label></div>
                <form className="ml101">
                  <select name="email" id="email" multiple={true} onChange={e => setEmails((previous)=>[...previous,e.target.value])}>
                    {selectEmails.map(user=>(<option value="email">{user.email}</option>))}
                  </select>
                </form>
      
              
              <div className="btn-box">
                <button onClick={onSubmit}>Add</button>
              </div>
              
             {console.log('chekc it out ',selectEmails)}
            </div>
      </div>
    );
}

export default CreateActivity;