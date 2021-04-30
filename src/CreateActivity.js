import Login from './Login.js';
import {useState} from 'react';
import './App.css';
import { createActivityApi } from './api/api.js';

//import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function CreateActivity(props){
  
   // const [inputList, setInputList] = useState([{ activityName: "", amount: "", participants: ""  }]);
    //const [showbtn, setShowBtn] = useState(true);
    const [cost, setCost] = useState('');
    const [name, setName] = useState('');
    const [emails, setEmails] = useState('');
    
    function onSubmit(){
      let arrayOfEmails = emails.split(',');
      if(arrayOfEmails[0] == "")
        arrayOfEmails = []
      createActivityApi(props.token, props.trip, name, cost, arrayOfEmails).then(data => console.log(data)).then(data => props.refresh());
    }
    
    return (
      <div className="Activity">
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
