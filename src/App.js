import React from "react";
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.scss';

import Home from './pages/home/home';
import Login from './pages/login/login';
import AuthService from "./services/auth";


function App() {
  // Initialize Firebase
  window.authService = window.authService ? window.authService : new AuthService();


  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path="/" render={()=>(

              <Login/>
              )}/>
        <Route path="/home" render={()=>(
          <Home/>
          )} />
      </Switch>
    </div>
  </Router>

  );
}

export default App;
