import React from 'react';

const ReviewItems = (props) => {
    const {quantity,name,key,price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }
    return (
        <div style={reviewItemStyle}>
            <h3 className='product-name'>{name}</h3>
            <p><small>${price}</small></p>
            <p className='product-qnty'>qntity:{quantity}</p>

            <br />
            <button onClick={() => props.handelRemoveItem(key)} className='main-btn'>Remove</button>
        </div>
    );
};

export default ReviewItems;