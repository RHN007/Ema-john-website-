import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {

    const [products, setProducts] = useState([])
    const [cart, setCart] =useState([])

    useEffect(()=> {

        console.log('Product load before fetch ')
        fetch('products.json')
        .then(res => res.json())
        .then(data => {setProducts(data);
        console.log('product loaded ')})
    },[])

    useEffect(()=> {
       
        const storedCart = getStoredCart()
        const savedCart = []
        for (const id in storedCart ){
          const addedProducts = products.find (product => product.id ===id ); 
          if (addedProducts){
              const quantity = storedCart[id];
              addedProducts.quantity = quantity
            savedCart.push (addedProducts)
          }
        }
        setCart(savedCart)
    },[products])

    const handleAddToCart = (SelectedProduct) => {
        console.log(SelectedProduct); 
        let newCart = []
        const exists = cart.find(product => product.id === SelectedProduct.id); 
        if(!exists){
            SelectedProduct.quantity = 1; 
            newCart = [...cart , SelectedProduct]; 
        }
        else {
            const rest = cart.filter (product=> product.it !== SelectedProduct.id)
            exists.quantity = exists.quantity +1;


            newCart = [...rest, exists ]
        }
       
        setCart(newCart); 
        addToDb(SelectedProduct.id)
    }

    return (
        <div className='shop-container'>
           <div className="products-container">
            {
                products.map(product => <Product key ={product.id}
                product = {product}
                handleAddToCart = {handleAddToCart}
                
                ></Product>)
            }
           </div>
           <div className="cart-container">
              
              <Cart cart={cart}> </Cart>
              
           </div>
        </div>
    );
};

export default Shop;