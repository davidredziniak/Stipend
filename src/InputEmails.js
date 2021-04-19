import Login from './Login.js';
import TripHome from './TripHome';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './App.css';
import CreateTrip from './CreateTrip';

function InputEmails() {
  // email consists of the list of all emails
  const [email, setEmail] = useState([{ value: null }]);
 
  function handleChange(i, event) {
    const values = [...email];
    values[i].value = event.target.value;
    setEmail(values);
  }
  console.log(email)

  function handleAdd() {
    const values = [...email];
    values.push({ value: null });
    setEmail(values);
  }

  function handleRemove(i) {
    const values = [...email];
    values.splice(i, 1);
    setEmail(values);
  }


  return (
    <div className="inputEmail">

      {email.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <input
              className="createTripInputs"
              type="text"
              placeholder="Email"
              onChange={e => handleChange(idx, e)}
            />
            <button type="button" className="removeParticipants" onClick={() => handleRemove(idx)}>
              Remove
            </button>
          </div>
        );
      })}

      <button type="button" onClick={() => handleAdd()}>
        Add Participant
      </button>
      
    </div>
  );
}
export default InputEmails;
