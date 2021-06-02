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
import NewUser from "./pages/newUser/new-user";



function App() {
  const [render, setRender] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [uid, setUid] = React.useState(null);
  const[newUsermail, setNewUserMail] = React.useState(null);
  const [newuser, setNewUser] = React.useState(false);

  React.useEffect(()=>{
    AuthService.authHook((user)=>{
      if(user) {
        setUid(user.uid);
        setNewUserMail(user.email);
      AuthService.getDatabase().ref('users').orderByChild("uid").equalTo(AuthService.currentUser().uid)
        .on("value", (snapshot)=>{
            let usr;
            snapshot.forEach(function(snap) {
                usr = {
                    id: snap.key,
                    ...snap.val()
                };
                setUser(usr)
            });
            if(!usr && window.location.pathname !== "/new-user") {
              window.location.href = "/new-user";
            } else if (usr && window.location.pathname === '/') {
              window.location.href = "/categories"
            }
           
        })
      }
      setRender(true);
    });
    
  }, [])
  return (
    render ?
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/new-user" render={()=>(<NewUser user={user} uid={uid} email={newUsermail}/>)} />
          <Route exact path="/categories" render={(props)=>(user?<CategoryList {...props} user={user}/>: null)} />
          <Route exact path="/categories/:id/exercises" component={ExerciseList} />
          <Route path="/categories/:id/exercises/:exercise_id" render={(props)=>(user?<Exercise {...props} user={user}/>: null)} />
          <Route path="/saved" render={(props)=>(user?<Saved {...props} user={user}/>: null)} />

        </Switch>
      </div>
    </Router> : null
  );
}

export default App;
