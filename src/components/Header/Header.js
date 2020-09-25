import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setloggedInUser]= useContext(userContext);
    return (
        <div className ="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/Shop">Shop</Link>
                <Link to="/Review">Review</Link>
                <Link to="/Manage">Manage Inventory</Link>
                <button onClick={()=> setloggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;