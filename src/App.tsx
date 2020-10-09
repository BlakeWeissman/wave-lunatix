import React from 'react';
import './App.scss';
import {NavLink, BrowserRouter} from 'react-router-dom';
import {Hero} from './components/Hero/Hero';

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
    </BrowserRouter>
  );
}

export default App;
