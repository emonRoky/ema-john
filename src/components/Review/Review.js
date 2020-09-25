import React from 'react';
import './Review.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import gify from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart,setCart] = useState([])
    const [orderdPlaced,setorderdPlaced] = useState(false)
    const history = useHistory()

    const handelProcced = () =>{
        history.push('/shipment');
    }

    const handelRemoveItem = (productkey) =>{
        const newCart = cart.filter(pd => pd.key !== productkey);
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }
   useEffect(()=>{
       const savedCart = getDatabaseCart();
       const productKey = Object.keys(savedCart);
       const productCart = productKey.map(key => {
           const product = fakeData.find(pd => pd.key === key);
           product.quantity = savedCart[key];
           return product;
       });
      setCart(productCart);
       //cart
   }, []);
    let image;
    if(orderdPlaced){
        image = <img src={gify} alt=""/>
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
            {
            cart.map(pd =><ReviewItems
                    key = {pd.key}
                    handelRemoveItem = {handelRemoveItem}
                    product={pd}>
                    </ReviewItems>)
            }
            {
                image
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handelProcced} className='main-btn'>Procced checkout</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;