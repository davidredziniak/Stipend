
import React, {useEffect} from 'react';
import './App.css';
import Login from'./Login.js';
import Logout from'./Logout.js';


import {Link} from "react-router-dom";

// <div>
//     {props.isAuth && <Login tokenHandler={props.token} 
//     authHandler={props.auth}/>?
//     (
//     <Link className='navStyle'to='/Activity'><li><button>Activity</button></li></Link>
//     )
//     :null}
// </div>

function Nav(props) {
    
    useEffect(() => {
        console.log("");
    }, [props.isAuth, props.token]);
    
    return(
    <nav className='navStyle'>
       <h1 className='topic'>STIPEND ...</h1>

        <ul className="nav-links">
        <div>

            {this.props.isAuth && <Login tokenHandler={this.props.token} 
            authHandler={this.props.auth}/>?
            (
            <Link className='navStyle'to='/Home'><li><button className="home">Home</button></li></Link>
            )
            :null}
        </div>
        <div>
            {props.isAuth?
            (
            <Link className='navStyle'to='/JoinTrip'><li><button className="joinTripbtn">JoinTrip</button></li></Link>
            )
            :null}
        </div>
        <div>
            {props.isAuth?
            (
            <Link className='navStyle'to='/CreateTrip'><li><button className="createTrip">CreateTrip</button></li></Link>
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