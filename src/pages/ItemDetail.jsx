import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../components/ProductDisplay';
import RelatedProducts from '../components/RelatedProducts';

const ItemDetail = () => {
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
        {/* // Breadcrum */}
        <ProductDisplay product={product} />
        <RelatedProducts />

    </div>
  )
}

export default ItemDetail;