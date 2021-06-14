import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import Wordpress from '../../services/wordpress';
import Button from '../../components/button/button.js';
import {Link} from 'react-router-dom';
import Loader from '../../components/loader/loader.js';
import './exerciseOverview.scss';
import ExerciseWrapper from '../../components/exercisewrapper/ExerciseWrapper.js';
import Footer from '../../components/footer/footer.js';



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
    const bodyPartName = bodyParts.filter(elm=>elm.bodyPart.toLowerCase().includes(searchValue.toLowerCase()));
    const bodyPartId = bodyPartName.map(elm=>{return{id: elm.id}});

if(bodyPartName.length>0){
    const filterName = bodyPartName[0].bodyPart;
    if(searchValue.toLowerCase() === filterName.toLowerCase() && bodyPartId[0]!==undefined){
        setFilteredList(allExercises.filter(exercise=>exercise.bodyPart.includes( bodyPartId[0].id))); 
    }
    else{
        setFilteredList([]);
    }
}

if(searchValue == null || searchValue == ""){
    setFilteredList(allExercises);
} 

else if(bodyPartName.length === 0){
    setFilteredList([]);
}


}

function NotFoundMessage(){
return(
filteredList.length === 0?
        <h3 className="not_found_message">Der er ingen øvelse relateret med - <strong>{searchValue}</strong></h3>
         : null )
}



  
    return(
        filteredList?
      <div className="exercisesOverviewPage">
          <Navigation/>
      
            <div className="page_content">
           
            <h1>Øvelser</h1>
              
            <div className="search-container">
                <form onSubmit={searchNewList}>
                    <label className="search_label">Søg efter kropsdele</label>
                    <input id="searchbar" className="search_input" placeholder="Eks. nakke" onInput={e=>setSearchValue(e.target.value)}/>
                    <button className="search_btn">Søg</button>
                </form>
            </div>

            <div className="exercises_container">
          
            {filteredList.map((item, i) => {
            return (
                <Link className="exercise" to={`/kategorier/${item.categoryId}/traeninger/${item.id}`} key={i} >
                    {/* <Button className="item" value={item.title}></Button> */}
                    <ExerciseWrapper className="item_wrapper_white" item={item}/>
                </Link>
                     );
                
                })}
                <NotFoundMessage/>
            </div>
            </div>

            <Footer/>
      </div>
      : <Loader/>
    )
}

export default ExercisesOverview;