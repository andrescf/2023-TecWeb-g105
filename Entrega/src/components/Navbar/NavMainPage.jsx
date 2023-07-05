import React from "react";
import { NavLink, Link } from "react-router-dom";
import './navmainpage.css'

function Navbar() {
    
    return(
        <header className="header">
            <div className="web-icon">
                <img src= 'src/assets/icon.jpg'/>
            </div>
            <nav>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className="navbar-link">
                            Home
                        </NavLink>
                    </li>
                    <li> 
                        <NavLink to="about-us" className="navbar-link">
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="rules" className="navbar-link">
                            Game Rules
                        </NavLink>    
                    </li>
                </ul>
            </nav>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">
                            <button className="navbar-button">Sign Out</button>
                        </Link>  
                    </li>
                    <li>
                        <div className="logo_usuario">
                            <img src= '../src/assets/user.jpg'/>
                        </div>
                    </li>
                    <li>
                        <p className="welcome"> Welcome UserXYZ! </p>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar