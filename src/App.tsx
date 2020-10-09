import React from 'react';
import './App.scss';
import {NavLink, BrowserRouter} from 'react-router-dom';
import {Hero} from './components/Hero/Hero';
import {LargeInput} from './components/LargeInput/LargeInput';

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
      <Hero title="TEST" imgFilename="logo.png" />
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
