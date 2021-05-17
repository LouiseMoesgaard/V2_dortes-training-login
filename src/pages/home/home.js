import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import Header from '../../components/header/header';
import Category from '../../components/category/Category';

import './home.scss';


function home(props) {

    const categoriesArray = props.categories.map((elm) =>{
        const obj = {
            id: elm.id,
            title: elm.title.rendered
        }
        return obj;
    })
   /*  function searching(studentArray) {

        let searchBar = document.querySelector('#searchbar');
    
        searchBar.addEventListener("input", (e)=> {
            const target = e.target.value;
            const searched = studentArray.filter(elm => {
                return elm.firstName.includes(target) || elm.lastName.includes(target);
            })
            displayList(searched);
        });
    } */

return(

<>
    <Navigation/>

    <div id="home">

        <Header title="Velkommen til din online træning, [brugernavn]"/>

        <div className="intro">
            <p> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nam tempor egestas mi vitae tempor. Nulla vitae massa iaculis, fringilla felis eu, convallis erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor egestas mi vitae tempor. 
                Nulla vitae massa iaculis, fringilla felis eu, convallis erat. 
            </p>

            <input id="searchbar" placeholder="Søg i kategorier"/>
            <input id="submit" type="submit" value="søg" />
        </div>

        <div className="categoryList">
            {categoriesArray.map((item, i) => {
                 return (<Category key={i} {...item} updateCategory = {props.updateCategory}/> );
                 
             })}
            </div>
    
    </div>

</>
    

    )
}

export default home;


