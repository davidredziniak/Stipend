import Login from './Login.js';
import TripHome from './TripHome';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './App.css';
import moment from 'moment';
//import DatePicker from 'react-datetime';
import { BrowserRouter as Router,Route, Link} from "react-router-dom";
//import 'react-datetime/css/react-datetime.css';
/* eslint-disable react/jsx-props-no-spreading */
function CreateTrip(props){

    //const user = useState('');
    const [dataa,setDataa]=useState(false);
    //const numberOfUser = useState(0);
   // const [date,setDate] = useState([]);
    //const [email,setEmail]=useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
 // const onSubmit = data => console.log(data);
  function onSubmit(data){
      console.log(data);
      setDataa(true);
      console.log(dataa)
  }
//     // disable past dates
//   const yesterday = moment().subtract(1, 'day');
//   const disablePastDt = current => {
//     return current.isAfter(yesterday);
//   };
  console.log(errors);

    return(
        <div className="activity">
             {props.isAuth && <Login tokenHandler={props.token} authHandler={props.auth}/>?(
             <div>
                 <h3>Welcome to your Create Trip!</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                      <div><label className="StartDate">Enter the Trip Name: </label><input type="text"  placeholder="Trip Name" {...register("Trip Name", {required: true, maxLength: 17})} /></div>
                      <div><label className="StartDate">Enter Email to Invite: </label><input type="text"  placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} /></div>
                      <div><label className="StartDate">Start Date: </label><input type="date"  placeholder="Start Date" {...register("Start Date", {required: true})} /></div>
                      <div><label className="StartDate">End Date: </label>  
                         <input type="date" placeholder="End Date" {...register("End Date", {required: true})} /></div>
                       {dataa?(<div><Link to="/TripHome"><input type="submit" /></Link></div>):<div><input type="submit"/></div>}
                </form>
                   
             </div>)
             :null}
            
{dataa?(    <Router>
                
                <div>
                    <Route path="/TripHome" component={TripHome} />
                </div>
            </Router>):null}
             
        </div>
        );
}

export default CreateTrip;