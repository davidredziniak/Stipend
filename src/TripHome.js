  
import React from 'react';

function TripHome(props)
{console.log(props.name)
    return (
        <div className="activity">
             {props.isAuth?
             (
             <div>
             <div><h3>Welcome to your TripHome!</h3></div>
             <div><button>Click</button></div>
             </div>
             ):<h3>Please Login!!!</h3>}
        </div>
        );
}
export default TripHome;