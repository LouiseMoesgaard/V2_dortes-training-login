import React from "react";
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.scss';

import Home from './pages/home/home';
import Login from './pages/login/login';
import CategoryList from './pages/categoryList/CategoryList';
import AuthService from "./services/auth";
import ExerciseList from "./pages/exerciseList/exerciseList";



function App() {
  // Initialize Firebase
  window.authService = window.authService ? window.authService : new AuthService();


  

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/home" component={Home}/>
        <Route exact path="/categories" component={CategoryList} />
        <Route path="/categories/:id"component={ExerciseList} />

      </Switch>
    </div>
  </Router>

  );
}

export default App;
