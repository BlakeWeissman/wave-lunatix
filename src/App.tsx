import React from 'react';
import './App.scss';
import {NavLink, BrowserRouter} from 'react-router-dom';

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
    </BrowserRouter>
  );
}

export default App;
