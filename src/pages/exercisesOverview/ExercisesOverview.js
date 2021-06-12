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
import Footer from '../../components/footer/footer.js';



function ExercisesOverview(){
    const [allExercises, setAllexercises] = React.useState(null);

    React.useEffect(()=>{

        Wordpress.getAllExercises().then((allExercises)=>{
            const list = allExercises.map(elm => {
                return {
                    id: elm.id,
                    title: elm.title.rendered,
                    categoryId: elm.trainingtype[0].ID
                };
            });
            setAllexercises(list);
           
        })
        
    }, [])


  
    return(
    allExercises?
    <>
      <div className="exercisesOverviewPage">
          <Navigation/>
            <div className="exercises-container">

                    {allExercises.map((item, i) => {
                return (
                    <Link className="exercise" to={`/kategorier/${item.categoryId}/traeninger/${item.id}`} key={i} >
                        <Button className="item" value={item.title}></Button>
                    </Link>
                         );
                    
                    })}
            </div>

      </div>
      <Footer/>
      </>: <Loader/>
    )
}

export default ExercisesOverview;