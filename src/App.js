import React from "react";
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

import Login from './pages/login/login';
import CategoryList from './pages/categoryList/CategoryList';
import ExerciseList from "./pages/exerciseList/exerciseList";
import Exercise from './pages/exercise/exercise';
import Saved from './pages/saved/saved';
import AuthService from './services/auth';



function App() {
  const [render, setRender] = React.useState(false)
  React.useEffect(()=>{
    AuthService.authHook(()=>{
      setRender(true);
    });
  }, [])
  return (
    render ?
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/categories" component={CategoryList} />
          <Route exact path="/categories/:id/exercises" component={ExerciseList} />
          <Route path="/categories/:id/exercises/:exercise_id" component={Exercise} />
          <Route path="/saved" component={Saved} />

        </Switch>
      </div>
    </Router> : null
  );
}

export default App;
