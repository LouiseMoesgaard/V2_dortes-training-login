import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import './categoryList.scss';
import Wordpress from '../../services/wordpress';
import Header from '../../components/header/header';
import Button from '../../components/button/button.js';
import {Link} from 'react-router-dom';


function CategoryList(){
    const [categories, setCategories] = React.useState(null);
    const [post, setPost] = React.useState(null);

    React.useEffect(()=>{
        Wordpress.getpost(257).then((post)=>{
            setPost(post);
        });
        
        Wordpress.getCategories().then((categories)=>{
            setCategories(categories.map(elm => {
                    return {
                        id: elm.id,
                        title: elm.title.rendered
                    };
                })
            )
        })
    }, [])

    return(
        categories?
        <div className="categoryPage">
            <Navigation/>
            <div className="content">
                <Header title="Velkommen til din online træning, [brugernavn]"/>

                <div className="intro" dangerouslySetInnerHTML={ { __html: post.content.rendered } }></div>

                    <input id="searchbar" placeholder="Søg i kategorier"/>
                    <input id="submit" type="submit" value="søg" />
                {categories.map((item, i) => {
                return (
                    <Link 
                    className="category" 
                    to={`/categories/${item.id}/exercises`}
                    key={i} 
                    >
                        <Button className="item" value={item.title}></Button>
                    </Link>
                    );
                    
                    })}
            </div>
        </div> : null
    )
}


export default CategoryList;