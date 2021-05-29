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
  const [render, setRender] = React.useState(false);
  const [user, setUser] = React.useState(null);
  React.useEffect(()=>{
    AuthService.authHook((user)=>{
      setRender(true);
      if(user) {
      AuthService.getDatabase().ref('users').orderByChild("uid").equalTo(AuthService.currentUser().uid)
        .on("value", (snapshot)=>{
            let user;
            snapshot.forEach(function(snap) {
                user = {
                    id: snap.key,
                    ...snap.val()
                };
                setUser(user)
            });
           
        })
      }
    });
    
  }, [])
  return (
    render ?
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/categories" render={(props)=>(<CategoryList {...props} user={user}/>)} />
          <Route exact path="/categories/:id/exercises" component={ExerciseList} />
          <Route path="/categories/:id/exercises/:exercise_id" render={(props)=>(<Exercise {...props} user={user}/>)} />
          <Route path="/saved" render={(props)=>(<Saved {...props} user={user}/>)} />

        </Switch>
      </div>
    </Router> : null
  );
}

export default App;
