import {useState } from 'react';
import './App.css';
import { createActivityApi } from './api/api.js';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {InputEmails , getInvitedEmails} from './InputEmails';


function CreateActivity(props){
  
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
        arrayOfEmails = [];
      var finalList = [];
      
      for(var i = 0; i<arrayOfEmails.length; i++){
        if (!finalList.includes(arrayOfEmails[i])){
          finalList.push(arrayOfEmails[i]);
        }
      }

      createActivityApi(props.token, props.trip, name, date, time, cost, finalList).then(data => handleErrors(data)).then(data => props.refresh());
    }

    return (
      <div className="Activity">

        <Popup trigger={<button> Add an Participant</button>} position="right center">
          <div><InputEmails/> <getInvitedEmails/></div>
          <button type="submit" onChange={e => setEmails(e.target.value)} onClick={onSubmit}>Submit</button>
        </Popup>

        <NotificationContainer/>
            <div className="box1">
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
                type="emails"
                name="emails"
                className="ml101"
                placeholder="Participant Email1, Email2"
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