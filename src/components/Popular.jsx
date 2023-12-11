import React from 'react'
import data_product from '../components/Assets/data';
import Item from './Item';
import "../pages/CSS/Popular.css";


const Popular = () => {
    return (
        <div className='popular'>
            <h1> Popular in Women</h1>
            <hr />
            <div className='popular-item'>
                {data_product.map((item, i) => {
                    return <Item key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular;