import React from "react";
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import { useState, useEffect } from "react";
import './App.scss';

import Home from './pages/home/home';
import Login from './pages/login/login';
import CategoryList from './pages/categoryList/CategoryList';
import AuthService from "./services/auth";
import {getData} from './services/rest';


function App() {
  // Initialize Firebase
  window.authService = window.authService ? window.authService : new AuthService();

  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getData( "categories", setcategories);
 
  }, []);


  function updateCategory(id){
    getExerciseList(id);
  }

  function getExerciseList(categoryId){
    const chosenCategory = categories.filter(elm => elm.id == categoryId);
    console.log("choosenCategory is: ", chosenCategory[0].title.rendered);

    const exerciseList = chosenCategory[0].exercise.map(elm =>{
      const obj = {
        title : elm.post_title
      }
      return obj;
    })

  console.log("exerciseList is: ", exerciseList);
  }

  

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=>( <Login/> )}/>

        <Route path="/home" render={()=>( <Home
          categories = {categories}
          updateCategory = {updateCategory}
          /> )} />

        <Route path="/categoryList" render={()=>( <CategoryList
        categories = {categories}
        updateCategory = {updateCategory}
        /> )} /> 

      </Switch>
    </div>
  </Router>

  );
}

export default App;
