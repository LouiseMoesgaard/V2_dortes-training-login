import React from 'react';
import Navigation from '../../components/navigation/navigation';
import Wordpress from '../../services/wordpress';
import {Link} from 'react-router-dom';
import Button from '../../components/button/button';

import './exerciseList.scss';

function ExerciseList({match:{params:{id}}}){
    const [category, setCategory] = React.useState(null);
    const [post, setPost] = React.useState(null);
    
    React.useEffect(()=> {
        Wordpress.getpost(257).then((post)=>{
            setPost(post);
        });

        Wordpress.getCategory(id).then((category)=>{
            setCategory({
                id: category.id,
                title: category.title.rendered,
                content: category.content,
                exercise: category.exercise
            });
        })
    }, [])


    return (
        category?
        <div className="ExercisePage">
            <Navigation/>
            <div className="content">
            {category.exercise.map((item, i) => {
                return (
                    <Link 
                    className="exercise" 
                    to={`/categories/${category.id}/exercises/${item.id}`}
                    key={i} 
                    >
                        <Button className="item" value={item.post_title}></Button>
                    </Link>
                    );
                    
                    })}
            </div>
        </div> : null
    );
}

export default ExerciseList;