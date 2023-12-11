import React from "react";
import "../pages/CSS/Products.css";

function Products(props) {
    
    return (
        <div className="p-cards">
        
        <div className="container">
        <img src={props.imageURL} alt="p1"></img>
            <p> {props.name}</p>
            <div className="item-price">
            <p className="item-price-new "> Rs.{props.Price}</p>
            <p className="item-price-old ">Rs. {props.Old_Price} </p>
            </div>
        </div>
    </div>  
    );
}

export default Products;