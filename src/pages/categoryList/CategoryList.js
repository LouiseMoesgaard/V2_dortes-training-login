import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import './categoryList.scss';
import Category from '../../components/category/Category';


function CategoryList(props){


    const categoriesArray = props.categories.map((elm) =>{
        const obj = {
            id: elm.id,
            title: elm.title.rendered
        }
        return obj;
    })


    return(

        <div className="categoryPage">

            <Navigation/>

            <div className="categoryList">
            {categoriesArray.map((item, i) => {
            return (
                <Category 
                key={i} 
                {...item}
                updateCategory = {props.updateCategory}
                />
                 );
                 
                 })}
            </div>
    
      </div>
    )
}


export default CategoryList;