import React from 'react';
import Navigation from '../../components/navigation/navigation';
import Wordpress from '../../services/wordpress';

import './exerciseList.scss';

function ExerciseList({match:{params:{id}}}){
    const [category, setCategory] = React.useState(null);
    Wordpress.getCategory(id).then((category)=>{
        setCategory({
            ...category.id,
            ...category.content
        });
        console.log(category)
        console.log({
            ...category.id,
            ...category.content
        })
    })
    return (
        <div className="ExerciseList">
            <Navigation/>
        </div>
    );
}

export default ExerciseList;