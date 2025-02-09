import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import Wordpress from '../../services/wordpress';
import Header from '../../components/header/header';
import Button from '../../components/button/button.js';
import {Link} from 'react-router-dom';
import Modal from '../../components/modal/modal.js';
import AuthService from '../../services/auth.js';

import './saved.scss';
import Loader from '../../components/loader/loader.js';
import Footer from '../../components/footer/footer.js';




function Saved({user}) {
    const [post, setPost] = React.useState(null);
    const [exercises, setExercises] = React.useState(null);
    const [remove, setRemove] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);


    React.useEffect(()=>{
        Wordpress.getpost(415).then((post)=>{
            setPost(post);
        });
        if(user.exercises){
            Wordpress.getExercises(user.exercises).then(exercises=>setExercises(exercises));
        } else {
            setExercises([]);
        }   
    
    }, [])

    const removeSaved = () => {
        let newExercises = user.exercises? user.exercises.slice(): [];
        newExercises = newExercises.filter(exercise=>exercise !== remove.id)
        AuthService.getDatabase().ref(`users/${user.id}/exercises`).set(newExercises).then(()=>{
            if(newExercises.length > 0){
                Wordpress.getExercises(newExercises).then(exercises=>setExercises(exercises));
            } else {
                setExercises(newExercises)
            }
            setOpenModal(false)
        });
    }


    return(

        post && exercises?
        <>
        <div className="savedPage">
            <Navigation/>
            <div className="content content-mobil">
                <div className="mobil-box">
                    <Header title="Dine Gemte øvelser"/>

                    <div className="intro">
                        <div className="d-grid">
                            <div className="bluebox" dangerouslySetInnerHTML={ { __html: post.tekst } }></div>
                            <img src={post.billede.guid} alt={post.billede.post_name}/>
                        </div>
                    </div>
                </div>
              
                {exercises.length === 0?
                    <p className="noExercise">Du har ingen gemte øvelser</p>: null
                }
                {exercises.map((item, i)=>{
                    return(
                        <div className="exerciseWrapper" key={i}>
                            
                        <Link 
                        className="exercise" 
                        to={`/categories/${item.trainingtype[0].id}/exercises/${item.id}`} 
                        >
                            <Button className="item" value={item.title.rendered}></Button>
                        </Link>
                        <Button value="Slet" className="cancel" key={i+'_child'} onClick={()=>{setRemove(item); setOpenModal(true)}}></Button>
                    </div>
                    )

                    

                })
                }
            </div>
            { remove?
            <Modal visible={openModal} title="er du helt sikker?" onClose={()=>setOpenModal(false)}>
            <p>Vil du virkelig slette {remove.title.rendered}?</p>
            <p>Denne proces kan ikke fortrydes</p>
            <div className="buttons">
            <Button className="cancel" value="Anullér" onClick={()=>setOpenModal(false)}></Button>
            <Button value="Slet" onClick={()=>removeSaved()}></Button>
            </div>
            </Modal>: null
            }
        </div>
        <Footer/>
        </> : <Loader/>

    )

    


}

export default Saved;