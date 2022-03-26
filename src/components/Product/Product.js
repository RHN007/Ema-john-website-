import React from 'react';
// import '@fortawesome/fontawesome-svg-core/styles.css'

import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props )=> {
    const {product, handleAddToCart} = props
    const {name, img, seller,price, ratings} = product

    
   
    return (
        <div className='product'>
                <img src={img} alt="" />
                <div className="product-info">
                    <p className='product-name'>{name}</p>
                <p>Price: {price}</p>
                <p>Ratings: {ratings} star</p>
                <p>Seller: {seller}</p>
                </div>

            <button className='btn-cart' onClick={() =>handleAddToCart(product)}>
                <p className='btn-text'>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart} ></FontAwesomeIcon>
            </button>


        </div>
    );
};

export default Product;