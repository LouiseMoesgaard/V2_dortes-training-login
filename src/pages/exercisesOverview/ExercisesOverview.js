import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import AuthService from '../../services/auth';
import Wordpress from '../../services/wordpress';
import Header from '../../components/header/header';
import Button from '../../components/button/button.js';
import {Link} from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Loader from '../../components/loader/loader.js';
import './exerciseOverview.scss';
import ExerciseWrapper from '../../components/exercisewrapper/ExerciseWrapper.js';



function ExercisesOverview(){
    const [allExercises, setAllexercises] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState(null);
    const [bodyParts, setBodyParts] = React.useState(null);
    const [filteredList, setFilteredList] = React.useState(null);
    React.useEffect(()=>{

        Wordpress.getAllExercises().then((ListOfExercises)=>{
            const list = ListOfExercises.map(elm => {
                return {
                    id: elm.id,
                    title: elm.title.rendered,
                    categoryId: elm.trainingtype[0].ID,
                    categoryName: elm.trainingtype[0].post_title,
                    image: elm.guide_image.guid,
                    bodyPart: elm.bodypart
                };
            });
            setAllexercises(list); 
            setFilteredList(list);
            console.log("ListOfExercises is : ", ListOfExercises);
            console.log("list is : ", list);
           
        });

        Wordpress.getBodyParts().then((listOfBodyParts)=>{
            const list = listOfBodyParts.map(elm =>{
                return{
                    id: elm.id,
                    bodyPart: elm.name
                }
            })
            setBodyParts(list);
           
        })
        
    }, [])


function searchNewList(e){
    e.preventDefault();
    
console.log("searchValue is : ", searchValue);

if(searchValue == null){
    setFilteredList(allExercises);
   
} else {
    const bodyPartId = bodyParts.filter(elm=>elm.bodyPart.toLowerCase().includes(searchValue.toLowerCase())).map(elm=>{return{id: elm.id}});

    if(bodyPartId[0]!==undefined){
        setFilteredList(allExercises.filter(exercise=>exercise.bodyPart.includes( bodyPartId[0].id)));
    }

    else{
        setFilteredList(allExercises);  
    }

     // console.log("bodyPartId is: ", bodyPartId[0].id);
    console.log("filteredList is: ", filteredList);

}

}


  
    return(
        filteredList?
      <div className="exercisesOverviewPage">
          <Navigation/>
      
            <div className="page_content">
              
            <div className="search-container">
                <form onSubmit={searchNewList}>
                    <input id="searchbar" className="searchbar" placeholder="Søg efter kropsdele" onInput={e=>setSearchValue(e.target.value)}/>
                    <button className="search_btn">Søg</button>
                </form>
            </div>

            <div className="exercises_container">
            <h1>Øvelser</h1>
            {filteredList.map((item, i) => {
                return (
                    <Link className="exercise" to={`/kategorier/${item.categoryId}/traeninger/${item.id}`} key={i} >
                        {/* <Button className="item" value={item.title}></Button> */}
                        <ExerciseWrapper className="item_wrapper_white" item={item}/>
                    </Link>
                         );
                    
                    })}
            </div>
          


       
            </div>

      </div>: <Loader/>
    )
}

export default ExercisesOverview;