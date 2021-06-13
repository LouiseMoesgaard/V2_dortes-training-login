import React from "react";
import "./exerciseWrapper.scss";


function ExerciseWrapper(props){

    const item = props.item;

    //console.log("item is: ", item);

    return(
        <div className={props.className}>
            <div className="image_box">
                 <img src={item.image}/>
            </div>
            <div className="text_light">
                <h3>{item.title}</h3>
                <div className="category_box">
                    <span>Under kategori:</span>
                    <h4> {item.categoryName}</h4>
                </div>
                
            </div>
        </div>
    )
}

export default ExerciseWrapper;