import React, {useState} from 'react';
import Wordpress from '../../services/wordpress';
import Navigation from '../../components/navigation/navigation';
import {Link} from 'react-router-dom';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import AuthService from '../../services/auth'

import './exercise.scss'
import Chat from '../../components/chat/chat';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Notifier from '../../components/notifier/notifier';
import Loader from '../../components/loader/loader';


function Exercise({match: { params: { exercise_id } }, user}) {
    const [exercise, setExercise] = React.useState(null);
    const [exercises, setExercises] = React.useState(null);
    const [trigger, setTrigger] = React.useState(null);
    const [routes, setRoutes] = React.useState(null);

    React.useEffect(()=>{
        Wordpress.getExercise(exercise_id).then((exercise)=>{
            setExercise({
                title: exercise.title.rendered,
                guide: exercise.guide,
                guide_img: exercise.guide_image.guid,
                video: exercise.exercise_video_link.replace('watch?v=', 'embed/')
                
            });
            setRoutes([
                {href:"/categories", name:"Kategorioversigt"},
                {href:`/categories/${exercise.trainingtype[0].id}/exercises`, name:`${exercise.trainingtype[0].post_title}`},
                {href:`/categories/${exercise.trainingtype[0].id}/exercises/${exercise.id}`, name:`${exercise.title.rendered}`}
            ])
        })

        if(user.exercises){
            Wordpress.getExercises(user.exercises).then(exercises=>setExercises(exercises));
        }
    }, [])

    const saveExercise = ()=> {
        let newExercises = user.exercises? user.exercises.slice(): [];
        newExercises.push(parseInt(exercise_id));
        AuthService.getDatabase().ref(`users/${user.id}/exercises`).set(newExercises);
        setTrigger(true);
    }

    const haveExercise = ()=> user.exercise && user.exercises.includes(parseInt(exercise_id))

    const removeSaved = () => {
        setTrigger(false);
        let newExercises = user.exercises? user.exercises.slice(): [];
        newExercises = newExercises.filter(exercise=>exercise !== parseInt(exercise_id))
        AuthService.getDatabase().ref(`users/${user.id}/exercises`).set(newExercises).then(()=>{
            if(newExercises.length > 0){
                Wordpress.getExercises(newExercises).then(exercises=>setExercises(exercises));
            } else {
                setExercises(newExercises)
            }
        });
    }

    const btnAction = ()=>{
        console.log("got here")
        if(haveExercise()){
            removeSaved();
        }else{
            saveExercise();
        } 
    }
    

    

    return (
        exercise && routes?
        <div className="ExercisePage">
            <Navigation/>
            <div className="content">
            <Breadcrumbs routes={routes}/>
            <div className="d-grid">
                <Header title={exercise.title}/>
                {trigger?<Notifier notice="favorit er nu gemt" duration={4500}></Notifier>: null}
                {trigger === false?<Notifier notice="favorit er nu slettet" duration={4500}></Notifier>: null}
                <Button value={haveExercise() ? 'Slet' : 'Gem'} onClick={()=>btnAction()}></Button>
            </div>

            <div className="bluebox d-grid">
                <img className="excerciseGuideImg" src={exercise.guide_img}/>
                <div>
                <Header title={exercise.title}/>
                <div className="excerciseGuideText" dangerouslySetInnerHTML={ { __html: exercise.guide } }></div>
                </div>
            </div>
            <iframe src={exercise.video}></iframe>

            <div className="bluebox chat">
                <Header title="Velkommen, har du nogle kommentarer?"/>
                <Chat exercixeId={parseInt(exercise_id)} user={user}/>
            </div>
            </div>
        </div> : <Loader/>
    );
}

export default Exercise;
