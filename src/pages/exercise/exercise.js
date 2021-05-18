import React, {useState} from 'react';
import Wordpress from '../../services/wordpress';
import Navigation from '../../components/navigation/navigation';
import {Link} from 'react-router-dom';
import Button from '../../components/button/button';
import Header from '../../components/header/header';

import './exercise.scss'


function Exercise({match:{params:{exercise_id}}}) {
    const [exercise, setExercise] = React.useState(null);

    React.useEffect(()=>{
        console.log();

        Wordpress.getExercise(exercise_id).then((exercise)=>{
            console.log(exercise);
            setExercise({
                title: exercise.title.rendered,
                guide: exercise.guide,
                guide_img: exercise.guide_image.guid,
                video: exercise.exercise_video_link.replace('watch?v=', 'embed/')
                
            });
        })
    }, [])

    return (
        exercise?
        <div className="ExercisePage">
            <Navigation/>

            <div className="content">
            <Header title={exercise.title}/>

            <Button value="Gem til favoritter"></Button>

            <div className="bluebox">
                <img className="excerciseGuideImg" src={exercise.guide_img}/>
                <div className="excerciseGuideText" dangerouslySetInnerHTML={ { __html: exercise.guide } }></div>
            </div>
            <iframe width="640" height="360" src={exercise.video}></iframe>

            <div className="bluebox">
                <Header title="Velkommen, har du nogle kommentarer?"/>
                


            </div>

            



        


            </div>
        </div> : null
    );
}

export default Exercise;
