import React from 'react';
import {Link} from 'react-router-dom';
import './category.scss';


export default function Category({id, title}){



    return(
        <Link className="category" to={`/categories/${id}`}>
            <h1 className="title">{title} </h1>
        </Link>
    )

}