import React from 'react';
import './Detail.css';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Detail = () => {
    const {productKey} = useParams()
    const prd = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <Product showAddToCart={false} product={prd}></Product>
        </div>
    );
};

export default Detail;