import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const{name,img,seller,price,stock} = props.product;
    return (
       <div className="product">
           <div className="product-img">
               <img src={img} alt=""/>
           </div>
           <div  className="product-desc">
            <h4 className='product-name'>{name}</h4>
            <br/>
            <p><small>by: {seller}</small></p>
            <p>${price}</p>
            <p><small>only {stock} left in stock</small></p>
            <button className='main-btn' onClick={()=>props.handelAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>Add to cart</button>
            </div>
       </div>
    );
};

export default Product;