import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import Header from '../../components/header/header'

import './home.scss';


function home() {


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
        <p> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nam tempor egestas mi vitae tempor. Nulla vitae massa iaculis, fringilla felis eu, convallis erat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor egestas mi vitae tempor. 
            Nulla vitae massa iaculis, fringilla felis eu, convallis erat. 
        </p>

        <input id="searchbar" placeholder="Søg i kategorier"/>
        <input id="submit" type="submit" value="søg" />
    </div>

</>
    

    )
}

export default home;


