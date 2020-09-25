import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
   const showProduct = fakeData.slice(0,10);
   const [products,setProducts] = useState(showProduct);
   const [cart,setCart] = useState([]);

   useEffect(()=>{
       const savedCart = getDatabaseCart();
       const productKey = Object.keys(savedCart);
       const previousCart = productKey.map(exsitingkey => {
           const product = fakeData.find(pd => pd.key === exsitingkey);
           product.quantity = savedCart[exsitingkey];
           return product;
       })
       setCart(previousCart)
   },[])

   const handelAddproduct = (product) =>{
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
   }
    return (
        <div className ='shop-container'>
           <div className="product-container">
             {
                 products.map(product =><Product 
                    key = {product.key}
                    showAddToCart={true}
                    handelAddProduct = {handelAddproduct}
                    product={product}>
                    </Product>)
             }
           </div>
           <div className="cart-container">
                <Cart cart={cart}>
                <Link to='/Review'>
                <button className='main-btn'>Review Order</button>
                </Link>
                </Cart>
           </div>
        </div>
    );
};

export default Shop;