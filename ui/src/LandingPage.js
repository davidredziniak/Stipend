import React from 'react';
import './Logo.css';
import './App.css';

function LandingPage()
{
    return (
        
        <div>
            <div className="imageClass">
                <div className="LandingPage">
                    <h1 className="imageTextH">Welcome to STIPEND!</h1>
                      <h4 className="imageText">Plan trips with no worries about splitting your spendings!</h4>
                      <h1 className="imageText1"><br/>Why it Matters?</h1>
                      <h2 className="imageText">We help you Create Trips, Join Trips and Manage Trips with no effort!</h2>
                </div>
            </div>
            <hr/>
            <game/>
            <div className="landing">
                <h1>OUR TEAM </h1>
                <br/>
                <div class="row">
                  <div class="column">
                    <div class="card ">
                      <div class="container">
                      <img alt="Qries" src="https://cdn.dribbble.com/users/3293507/screenshots/14667603/media/d8cbe035a61f64afdf6deabca5182842.jpg" width="40" height="50"/>
                        <h2>David Redziniak</h2>
                        <p class="title">CEO & Founder</p>
                        <p><a href="mailto:dr475@njit.edu"><button class="button">Contact</button></a></p>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="card">
                      <div class="container">
                      <img alt="Qries" src="https://cdn.dribbble.com/users/3293507/screenshots/14667603/media/d8cbe035a61f64afdf6deabca5182842.jpg" width="50" height="50"/>
                        <h2>Shanil Rahul Pathak</h2>
                        <p class="title">CEO & Founder</p>
                        <p><a href="mailto:rp93@njit.edu"><button class="button">Contact</button></a></p>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="card">
                      <div class="container">
                      <img alt="Qries" src="https://cdn.dribbble.com/users/3293507/screenshots/14667603/media/d8cbe035a61f64afdf6deabca5182842.jpg" width="50" height="50"/>
                        <h2>Mervyn Mathew</h2>
                        <p class="title">CEO & Founder</p>
                        <p><a href="mailto:mm2373@njit.edu"><button class="button">Contact</button></a></p>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="card">
                      <div class="container">
                      <img alt="Qries" src="https://cdn.dribbble.com/users/3293507/screenshots/14667603/media/d8cbe035a61f64afdf6deabca5182842.jpg" width="50" height="50"/>
                        <h2>Neel Patel</h2>
                        <p class="title">CEO & Founder</p>
                        <p><a href="mailto:ngp23@njit.edu"><button class="button">Contact</button></a></p>
                      </div>
                    </div>
                  </div>
                
                </div>
            </div>

        </div>
        
        );
}

export default LandingPage;