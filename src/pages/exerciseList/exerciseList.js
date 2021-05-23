import React from 'react';
import Navigation from '../../components/navigation/navigation';
import Wordpress from '../../services/wordpress';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header'
import Button from '../../components/button/button';

import './exerciseList.scss';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';

function ExerciseList({ match: { params: { id } } }) {
    const [category, setCategory] = React.useState(null);
    const [post, setPost] = React.useState(null);
    const [routes, setRoutes] = React.useState(null);

    React.useEffect(() => {
        Wordpress.getpost(257).then((post) => {
            setPost(post);
        });

        Wordpress.getCategory(id).then((category) => {
            setCategory({
                id: category.id,
                title: category.title.rendered,
                content: category.content,
                exercise: category.exercise
            });
            setRoutes([
                {href:"/categories", name:"Kategorier"},
                {href:`/categories/${category.id}/exercises`, name:`${category.title.rendered}`}
            ])
        })
    }, [])


    return (
        category && routes ?
            <div className="ExercisePage">
                <Navigation />
                <div className="content">
                    <Breadcrumbs routes={routes}></Breadcrumbs>
                    <Header title={category.title}></Header>
                    {category.exercise.map((item, i) => {
                        return (
                            <Link className="exercise item-triangle" to={`/categories/${category.id}/exercises/${item.id}`} key={i} >
                                <Button className="item" value={item.post_title}></Button>
                                <div className="triangle"></div>
                            </Link>
                        );

                    })}
                </div>
            </div> : null
    );
}

export default ExerciseList;