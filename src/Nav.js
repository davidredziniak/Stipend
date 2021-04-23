
import React, {useEffect} from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';


import {Link} from "react-router-dom";

function Nav(props) {
    
    useEffect(() => {
    }, [props.isAuth, props.token]);
    
    return(
    <nav className='navStyle'>
       <h1 className='topic'>STIPEND ...</h1>

        <ul className="nav-links">
        <div>
            {props.isAuth?
            (
            <Link className='navStyle'to='/home'><li><button className="home">Home</button></li></Link>
            )
            :null}
        </div>
        <div>
            {props.isAuth?
            (
            <Link className='navStyle'to='/jointrip'><li><button className="joinTripbtn">JoinTrip</button></li></Link>
            )
            :null}
        </div>
        <div>
            {props.isAuth?
            (
            <Link className='navStyle'to='/createtrip'><li><button className="createTrip">CreateTrip</button></li></Link>
            )
            :null}
        </div>

            { !props.isAuth && <Login login={props.login}/> }
            { props.isAuth && <Logout logout={props.logout} token={props.token} /> }
        </ul>
    </nav>
    );
}

export default Nav;


//<button type="submit" onClick={()=>{<Router><Switch><Route path="/Activity" exact component={Test}/></Switch></Router>}}>Activity</button>