import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import './categoryList.scss';
import Category from '../../components/category/Category';
import Wordpress from '../../services/wordpress';


function CategoryList(){
    const [categories, setCategories] = React.useState(null);

    Wordpress.getCategories().then((categories)=>{
        setCategories(categories.map(elm => {
                return {
                    id: elm.id,
                    title: elm.title.rendered
                };
            })
        )
    })



    return(
        categories?
        <div className="categoryPage">
            <Navigation/>
            <div className="categoryList">
            {categories.map((item, i) => {
            return (
                <Category 
                key={i} 
                {...item}
                />
                 );
                 
                 })}
            </div>
        </div> : null
    )
}


export default CategoryList;