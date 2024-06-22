
import React, {useEffect} from 'react';
import './App.css';
import './CreateTrip.css';
import './JoinTrips.css';
import Login from'./Login.js';
import Logout from'./Logout.js';
import LandingPage  from './LandingPage';


import {Link} from "react-router-dom";

function Nav(props) {
    
    useEffect(() => {
    }, [props.isAuth, props.token]);
    
    return(
    <nav className='navbar navbar-expand-md navStyle'>
       <h1 className='topic'>STIPEND ... <h6 className="subheading"> Trips Made Easier</h6></h1>
        <button className="navbar-toggler" type="button" 
            data-toggle="collapse"
            data-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
         <i className="fas fa-align-justify fa-2x" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto" >
            <div>
                {props.isAuth?
                (
                <Link to='/home'><li><button className="home">ViewTrips</button></li></Link>
                )
                :null}
            </div>
            <div>
                {props.isAuth?
                (
                <Link to='/jointrip'><li><button className="joinTripbtn">JoinTrip</button></li></Link>
                )
                :null}
            </div>
            <div>
                {props.isAuth?
                (
                <Link to='/createtrip'><li><button className="createTrip">CreateTrip</button></li></Link>
                )
                :null}
            </div>
    
                { !props.isAuth && <Login login={props.login}/> }
                { props.isAuth && <Logout logout={props.logout} token={props.token} /> }
            </ul>
        </div>
    </nav>
    );
}

export default Nav;


//<button type="submit" onClick={()=>{<Router><Switch><Route path="/Activity" exact component={Test}/></Switch></Router>}}>Activity</button>