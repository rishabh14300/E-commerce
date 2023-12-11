import React, { useContext } from "react";
import { IoMdCart } from "react-icons/io";
// import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {

    const {getTotalCartItems} = useContext(ShopContext);
    return <>
        <header>
            {/* <img className="logo" src="../images/logo.png" alt="logo"></img> */}
            <Link to='/'><h2 className="lo-text"> EasyKart</h2></Link>

            <nav>
                <ul className="nav-links">
                    {/* <li className="searchBox"><input type="text" className="search-bar" /> <IoSearchSharp /></li> */}
                    <li><Link to='/mens'>Men</Link></li>
                    <li><Link to='/womens'>Women</Link></li>
                    <li><Link to='/kids'>Kids</Link></li>
                </ul>
            </nav>
           <Link to='/cart'><IoMdCart style={{ fontSize: '2rem' }} /></Link> 
           <span className="nav-cart-count">{getTotalCartItems()}</span>
            <Link to="/signup" className="cta"><button>Sign Up</button></Link>
        </header>
    </>
        ;
}

export default Navbar;
