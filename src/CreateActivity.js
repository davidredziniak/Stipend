import Login from './Login.js';
import {useState} from 'react';
import './App.css';
import { createActivityApi,updateParticipants } from './api/api.js';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



//import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function CreateActivity(props){
  
   // const [inputList, setInputList] = useState([{ activityName: "", amount: "", participants: ""  }]);
    //const [showbtn, setShowBtn] = useState(true);
    const [cost, setCost] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [emails, setEmails] = useState('');
    
    function handleErrors(data){
      if(data.success === false)
        props.createNotif('error', data.message);
      else if(data.success === true)
        props.createNotif('success', data.message);
    }
    
    function onSubmit(){
      let arrayOfEmails = emails.split(',');
      if(arrayOfEmails[0] == "")
        arrayOfEmails = []
      createActivityApi(props.token, props.trip, name, date, time, cost, arrayOfEmails).then(data => handleErrors(data)).then(data => props.refresh());
    }

    
    
    return (
      <div className="Activity">

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

              <input
                required
                type="text"
                className="ml101"
                name="participants"
                placeholder="Participant Email#1, Email#2,.."
                value={emails}
                onChange={e => setEmails(e.target.value)}
              />
              <div className="btn-box">
                <button onClick={onSubmit}>Add</button>
              </div>
             
            </div>
      </div>
    );
}

export default CreateActivity;
