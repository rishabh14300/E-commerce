import React from "react";
import Products from "./Products";
import Content from "./Content";
import productDetails from "../productDetails";
import productDetails2 from "../productDetails2";
import Newsletter from "./Newsletter";
import Popular from "./Popular";

function createProducts(product, i){
    return <Products
    id={product.id}
    imageURL={product.imageURL} 
    name={product.name} 
    Price={product.Price} 
    Old_Price = {product.Old_Price}
    />
}

function App() {
    return (
        <div>
            
            <Content />
            <Popular />
            <h1> Latest Pick Of The Today</h1>

            <div className="poul">
            {productDetails.map(createProducts)} 
            </div>
            <div className="poul1">
            {productDetails2.map(createProducts)} 
            </div>
            
            <Newsletter />
            
        </div>
    )
}

export default App;