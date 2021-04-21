import { useState } from 'react';
import './App.css';

// import Login from './Login.js';
// import Trip from './Trip';
//import { useForm } from "react-hook-form";

var invitedEmails = [];

const getInvitedEmails = () => {
  return invitedEmails;
};

function InputEmails() {
  // email consists of the list of all emails
  const [email, setEmail] = useState([{ value: null }]);
 
  function handleChange(i, event) {
    const values = [...email];
    values[i].value = event.target.value;
    setEmail(values);
    invitedEmails = values;
  }
  console.log(email);

  function handleAdd() {
    const values = [...email];
    values.push({ value: null });
    setEmail(values);
    invitedEmails = values;
  }

  function handleRemove(i) {
    const values = [...email];
    values.splice(i, 1);
    setEmail(values);
    invitedEmails = values;
  }


  return (
    <div className="inputEmail">

      {email.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <input required
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
export {
  getInvitedEmails,
  InputEmails
};
