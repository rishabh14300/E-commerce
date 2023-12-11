import React, { useContext } from 'react';
import star_icon from "../components/Assets/star_icon.png";
import { ShopContext } from '../context/ShopContext';
import "../pages/CSS/ProductDisplay.css";

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    return (
        <div className='ProductDisplay'>
            <div className="productleft">
                <div className="displayimg-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
            </div>
            <div className="displayimg">
                <img src={product.image} alt="" />
            </div>
            <div className="displayright">
                <h1>{product.name}</h1>
                <div className="displaystar">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="displayright-price">
                    <div className="oldprice-display">Rs.{product.old_price}</div>
                    <div className="newprice-display">Rs.{product.new_price}</div>
                </div>
                <div className="display-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure nemo corrupti quibusdam, voluptates earum consequuntur eius dolorem blanditiis amet qui.
                    Ad recusandae laudantium iste error, alias inventore numquam voluptates quae.
                </div>
                <div className="display-right-size">
                    <h1>Select Size</h1>
                    <div className="display-right-size">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button id="pid" onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className='display-right-category'><span>Category:</span>Men, Top</p>
            </div>
        </div>
    )
}

export default ProductDisplay;