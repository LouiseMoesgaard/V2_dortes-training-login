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
        categories && post?
        <div className="categoryPage">
            <Navigation/>
            <div className="content">
                <Header title="Velkommen til din online træning, [brugernavn]"/>

                <div className="intro" dangerouslySetInnerHTML={ { __html: post.content.rendered } }></div>

                <div className="category-container">
                    <h1>Kategorier</h1>
                    <div className="search-container">
                    <input id="searchbar" className="searchbar" placeholder="Søg i kategorier"/>
                    <Button type="submit" value="søg"/>
                </div>
                    {categories.map((item, i) => {
                return (
                        <Link className="category item-triangle" to={`/categories/${item.id}/exercises`} key={i} >
                            <Button className="item" value={item.title}></Button>
                            <div className="triangle"></div>
                        </Link>
                         );
                    
                    })}

                </div>
                   
           
            </div>
        </div> : null
    )
}


export default CategoryList;