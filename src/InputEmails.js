import Login from './Login.js';
import TripHome from './TripHome';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './App.css';

function InputEmails() {
  const [fields, setFields] = useState([{ value: null }]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  return (
    <div className="inputEmail">
      <button type="button" onClick={() => handleAdd()}>
        Add Participant
      </button>

      {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <input
              className="createTripInputs"
              type="text"
              placeholder="Participant's Gmail*"
              onChange={e => handleChange(idx, e)}
            />
            <button type="button" className="removeParticipants" onClick={() => handleRemove(idx)}>
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default InputEmails;
