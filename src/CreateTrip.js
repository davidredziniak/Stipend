import Login from './Login.js';
import TripHome from './TripHome';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './App.css';
import InputEmails from './InputEmails';
import { BrowserRouter as Router,Route, Link} from "react-router-dom";
/* eslint-disable react/jsx-props-no-spreading */
function CreateTrip(props){

    //const user = useState('');
    const [dataa,setDataa]=useState(false);
    //const numberOfUser = useState(0);
   // const [date,setDate] = useState([]);
    //const [email,setEmail]=useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {check,setCheck}=useState(false);
 // const onSubmit = data => console.log(data);
  function onSubmit(data){
      //console.log(data);
      setDataa(true);
      console.log(dataa);
  }
  
  
  console.log(errors);
// <div><input type="text"  placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} /></div>
    return(
        <div className="activity">
            {props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/>?(
            <div>
                <h3>Welcome to your Create Trip!</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div><input type="text" className="createTripInputs" placeholder="Trip Name*" {...register("Trip Name", {required: true, maxLength: 17})} /></div>
                        <div className="lines">____________________________________________________________________________________</div>
                        <div><input type="date" className="createTripInputs" placeholder="Start Date" {...register("Start Date", {required: true})} /></div>
                        <div className="lines">____________________________________________________________________________________</div>
                        <div><input type="date" className="createTripInputs" placeholder="End Date" {...register("End Date", {required: true})} /></div>
                        <div className="lines">____________________________________________________________________________________</div>
                        <InputEmails/>
                        <div className="lines">____________________________________________________________________________________</div>
                        <div><Link to="/TripHome"><input className="tripSubmit" type="submit" /></Link></div>
                </form>
            </div>)
            :null}

            {dataa?(
                <Router>
                    <div>
                        <Route path="/TripHome" component={TripHome}/>
                    </div>
                </Router>):null}

        </div>
        );
}

export default CreateTrip;
