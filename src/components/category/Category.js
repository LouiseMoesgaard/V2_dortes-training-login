import React from 'react';
import './category.scss';


export default function Category(props){

    function setId(){
       props.updateCategory(props.id);
    }

    return(
        <div className="category" onClick={setId}>

            <h1 className="title">{props.title} </h1>
        </div>
    )

}