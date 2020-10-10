import React from 'react';
import './App.scss';
import {NavLink, BrowserRouter, Switch, Route} from 'react-router-dom';
import {Hero} from './components/Hero/Hero';
import {LargeInput} from './components/LargeInput/LargeInput';
import {NeoInput} from './components/NeoInput/NeoInput';

function App() {
  
  return (
    <BrowserRouter>
      <div id="navbar">
        <img src={require('./assets/logo.png')} />
        <div>
          <NavLink to="/nba">
            NBA
          </NavLink>
          <NavLink to="/test">
            Test
          </NavLink>
        </div>
        <div>
          O
        </div>
      </div>
      <Switch>

        <Route exact path="/">
          <Hero title="Magnanimus Tour" imgFilename="purple-short.jpg" />
          <div id="categories">
            {
              Array.from(Array(6), (e, i) => {
                return (
                  <div key={i}>
                    Category {i}
                  </div>
                );
              })
            }
          </div>
          <div className="hr-container">
            <hr/>
          </div>
          <div className="cta">
            <h3>
              Trending
            </h3>
            <button>
              View All
            </button>
          </div>
          <div id="events">
            {
              Array.from(Array(4), (e, i) => {
                return (
                  <div key={i}>
                    Event {i}
                  </div>
                );
              })
            }
          </div>
          <div id="video-container">
            <img src={require('./assets/video.png')} />        
            <button>
              Learn More
            </button>
          </div>
        </Route>

        <Route path="/nba">
          <Hero title="NBA" imgFilename="sports.jpg" />

        </Route>

        <Route path="/subscribe">
          <div id="subscribe">
            <div>
            <h1>
              Subscribe
            </h1>
              <div>
                <div>
                  <NeoInput placeholder="First Name" />
                  <NeoInput placeholder="Last Name" />
                </div>
                <NeoInput placeholder="Email" />
                <NeoInput placeholder="User Name" />
                <NeoInput placeholder="Password" type="password" />
                <NeoInput placeholder="Repeat Password" type="password" />
                <span>
                  <input 
                    type="checkbox" 
                    id="vehicle1" 
                    name="vehicle1" 
                    value="Bike" />
                  <label htmlFor="vehicle1"> 
                    I Agree to the Terms of Use and Privacy Policy
                  </label>
                </span>
                <button>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </Route>

        <Route path="/cart">
        </Route>

      </Switch>
      <footer>
        <div id="apps">
          <img src={require('./assets/apple.jpg')} />        
          <img src={require('./assets/google.jpg')} />        
        </div>
        <LargeInput />
        <p>
          About | Support | Terms And Conditions <br /> Copyright &#169; 2020 SI Tickets | All Rights Reserved
        </p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
