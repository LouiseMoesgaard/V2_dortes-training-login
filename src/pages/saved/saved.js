import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import Wordpress from '../../services/wordpress';
import Header from '../../components/header/header';
import Button from '../../components/button/button.js';
import {Link} from 'react-router-dom';
import Modal from '../../components/modal/modal.js';
import AuthService from '../../services/auth.js';




function Saved() {
    const [user, setUser] = React.useState(null);
    const [post, setPost] = React.useState(null);
    const [exercises, setExercises] = React.useState([]);
    const [remove, setRemove] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);


    React.useEffect(()=>{
        Wordpress.getpost(272).then((post)=>{
            setPost(post);
        });


        AuthService.getDatabase().ref('users').orderByChild("uid").equalTo(AuthService.currentUser().uid)
        .once("value", (snapshot)=>{
            let user;
            snapshot.forEach(function(snap) {
                user = {
                    id: snap.key,
                    ...snap.val()
                };
                setUser(user)
            });
            if(user.exercises){
                Wordpress.getExercises(user.exercises).then(exercises=>setExercises(exercises));
            }    
        })
    }, [])

    const removeSaved = () => {
        let newExercises = user.exercises? user.exercises.slice(): [];
        newExercises = newExercises.filter(exercise=>exercise !== remove.id)
        AuthService.getDatabase().ref(`users/${user.id}/exercises`).set(newExercises).then(()=>{
            setUser({
                ...user,
                exercises: newExercises
            })
            if(newExercises.length > 0){
                Wordpress.getExercises(newExercises).then(exercises=>setExercises(exercises));
            } else {
                setExercises(newExercises)
            }
            setOpenModal(false)
        });
    }


    return(

        post && user && exercises?
        <div className="savedPage">
            <Navigation/>
            <div className="content">
                <Header title="Dine Gemte øvelser"/>

                <div className="intro" dangerouslySetInnerHTML={ { __html: post.content.rendered } }></div>

                {exercises.map((item, i)=>{
                    return(
                        <>
                        <Link 
                        className="exercise" 
                        to={`/categories/${item.trainingtype[0].id}/exercises/${item.id}`}
                        key={i} 
                        >
                            <Button value={item.title.rendered}></Button>
                        </Link>
                        <Button value="Slet" key={i+'_child'} onClick={()=>{setRemove(item); setOpenModal(true)}}></Button>
                    </>
                    )

                    

                })
                }
            </div>
            { remove?
            <Modal visible={openModal} title="er du helt sikker?" onClose={()=>setOpenModal(false)}>
            <p>Vil du virkelig slette {remove.title.rendered}?</p>
            <p>Denne proces kan ikke fortrydes</p>

            <Button value="Anullér" onClick={()=>setOpenModal(false)}></Button>
            <Button value="Slet" onClick={()=>removeSaved()}></Button>
            </Modal>: null
            }
        </div> : null

    )

    


}

export default Saved;