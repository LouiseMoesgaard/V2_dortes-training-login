import React from "react";
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.scss';

import Login from './pages/login/login';
import CategoryList from './pages/categoryList/CategoryList';
import AuthService from "./services/auth";
import ExerciseList from "./pages/exerciseList/exerciseList";
import Exercise from './pages/exercise/exercise';



function App() {
  // Initialize Firebase
  window.authService = window.authService ? window.authService : new AuthService();


  

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/categories" component={CategoryList} />
        <Route exact path="/categories/:id/exercises"component={ExerciseList} />
        <Route path="/categories/:id/exercises/:exercise_id"component={Exercise} />

      </Switch>
    </div>
  </Router>

  );
}

export default App;
