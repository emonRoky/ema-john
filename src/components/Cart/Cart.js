import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        const product = cart[i];
        total += product.price;
    }
    let shipping = 0;
    if(total > 15){
        shipping = 4.99;
    }
    else if (total > 50){
        shipping = 0;
    }
    else if (total > 0){
        shipping = 6.99;
    }
    const tax = Math.round(total/10);
    const GrandTotal = (total + shipping + tax).toFixed(2);
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Orderd:{cart.length}</p>
            <p>Product Price:{total}</p>
            <p>Tax:{tax}</p>
            <p>Shipping Cost:{shipping}</p>
            <p>Total Cost:{GrandTotal}</p>
        </div>
    );
};

export default Cart;