import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ShopContext } from '../../context/ShopContext';
import { loadStripe } from '@stripe/stripe-js';
import remove_icon from "../Assets/cart_cross_icon.png";
import '../CartItems/CartItems.css';



const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [stripe, setStripe] = useState(null);
    // console.log(CartItems);
    

    useEffect(() => {
        const initStripe = async () => {
            const stripeObj = await loadStripe('pk_test_51OL3XgSDLPzwG5nvSySgspliOtdqic57mThZ27a44rJHFj8gAhBlpI1mx2WHank1fokKk6kfph3H74zu2TflZtHl00uUNNvQSn');
            setStripe(stripeObj);
        };
        initStripe();
    }, []);

    const handleCheckout = async () => {
        if (stripe) {
           
            // const lineItems = all_product.map((product) => ({
            //     price_data: {
            //         currency: "inr",
            //         product_data: {
            //             name: product.name,
            //             images: [product.image]
            //         },
            //         unit_amount: product.price, 
            //     },
            //     quantity: product.quantity*100
            // }));

            const lineItems = [
                {
                  price_data: {
                    currency: "inr",
                    product_data: {
                      name: "T-shirt",
                      images: ["https://example.com/t-shirt-image.jpg"],
                    },
                    unit_amount: 8500, // Amount in the smallest currency unit (e.g., cents for USD)
                  },
                  quantity: 1,
                }];

    
            

            try {
                const response = await axios.post('http://localhost:3001/checkout', {
                    lineItems,
                });

                const session = response.data;
                console.log(session);

                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });

                if (result.error) {
                    console.error('Error:', result.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if(cartItems[e.id] > 0) {
                    return <div>
                        <div className="cartitems-format cartitems-main">
                            <img src={e.image} className="carticon-product" alt="" />
                            <p>{e.name}</p>
                            <p>{e.new_price}</p>
                            <button className='carttitems-quantity'>{cartItems[e.id]}</button>
                            <p>Rs.{e.new_price * cartItems[e.id]}</p>
                            <img  className="carticon-remove" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
                        </div>
                        <hr />
                    </div>
                } else {
                    return null;
                }
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitem-totalitems">
                            <p>
                                Subtotal
                            </p>
                            <p>Rs.{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitem-totalitems">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitem-totalitems">
                            <h3>Total</h3>
                            <h3>Rs.{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={() => {handleCheckout()}} >PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitem-promocode">
                    <p>If you have any promocode enterr it here</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder='promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default CartItems;