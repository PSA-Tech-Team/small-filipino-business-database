import './Header.css';
import Filter_Bar from "./Filter_Bar.jsx";
import React from 'react';
import Login from "./Login.jsx";
import { Link } from "react-router-dom";


function Header() {
    return (
        
        //what ever is written in here displays as the header of the website
        <header>
            <div className='head'>
            {/* replace with link to actual home page */}
            <Link to="/">
                <img className='header_image' src="https://www.psauiuc.org/wp-content/uploads/2024/09/Logo-no-words-no-circle-300x300.png" alt="Philippine Student Association Logo"/>
            </Link>
                <h1 className="site_name">
                    Small Filipino Business Database
                </h1>
            <Link to="/login">
                <button className="logInButton"> </button>
            </Link>
                
            </div>
        </header>
    );
}

export default Header;