import React, {useState} from 'react';
import Wordpress from '../../services/wordpress';
import Navigation from '../../components/navigation/navigation';
import {Link} from 'react-router-dom';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import AuthService from '../../services/auth'

import './exercise.scss'
import Chat from '../../components/chat/chat';


function Exercise({match:{params:{exercise_id}}}) {
    const [exercise, setExercise] = React.useState(null);
    const [user, setUser] = React.useState(null);

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

        AuthService.getDatabase().ref('users').orderByChild("uid").equalTo(window.authService.auth.currentUser.uid)
        .once("value", (snapshot)=>{
            snapshot.forEach(function(snap) {
                const user = {
                    id: snap.key,
                    ...snap.val()
                };
                setUser(user)
            });
        })
    }, [])

    const saveExercise = ()=> {
        let newExercises = user.exercises.slice();
        newExercises.push(parseInt(exercise_id));
        AuthService.getDatabase().ref(`users/${user.id}/exercises`).set(newExercises);
    }

    

    return (
        exercise?
        <div className="ExercisePage">
            <Navigation/>

            <div className="content">
            <div className="d-grid">
                <Header title={exercise.title}/>
                <Button value="Gem til favoritter" onClick={()=>saveExercise()}></Button>
            </div>

            <div className="bluebox d-grid">
                <img className="excerciseGuideImg" src={exercise.guide_img}/>
                <div>
                <Header title={exercise.title}/>
                <div className="excerciseGuideText" dangerouslySetInnerHTML={ { __html: exercise.guide } }></div>
                </div>
            </div>
            <iframe src={exercise.video}></iframe>

            <div className="bluebox">
                <Header title="Velkommen, har du nogle kommentarer?"/>
                <Chat/>


            </div>

            



        


            </div>
        </div> : null
    );
}

export default Exercise;