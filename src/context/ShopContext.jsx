import React, { createContext, useEffect, useState } from 'react';
import all_product from "../components/Assets/all_product";


export const ShopContext = createContext(null);

// Function for  the cart item initially

const getDefaultCart = () => {
    let cart = {};
    // var cart = getLocalCartData();
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    // Retrieve cart items from local storage on component mount
    const getLocalCartData = () => {
        const localCartData = localStorage.getItem("RishabhCart");
        return localCartData ? JSON.parse(localCartData) : getDefaultCart();
    }

    const [cartItems, setCartItems] = useState(getLocalCartData);

    //    console.log(cartItems);
    const addToCart = (itemId) => {
        console.log('Item ID:', itemId);

        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
            return updatedCart;
        });
        console.log('Previous cart items:', cartItems);
        // setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        // console.log(cartItems);
    }

    // Remove from cart logic
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    // to add the data in localStorage

    useEffect(() => {
        localStorage.setItem("RishabhCart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Function for total price in subtotal section
     const getTotalCartAmount = ()  =>{
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item] >0){
                let itemInfo = all_product.find((product) => product.id===Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
     }

     // Function for cart icon to be updated

     const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems) {
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
     }

    const ContextValue = { getTotalCartItems, getTotalCartAmount,all_product, cartItems, addToCart, removeFromCart };

    return (<ShopContext.Provider value={ContextValue}>
        {props.children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider;