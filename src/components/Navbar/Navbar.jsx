import React from "react";
import { NavLink, Link } from "react-router-dom";

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
                        <Link to="create-user">
                            <button className="navbar-button">Create User</button>
                        </Link>  
                    </li>  
                    <li>
                        <Link to="sign-in">
                            <button className="navbar-button">Sign In</button>
                        </Link>  
                    </li>
                </ul>
            </nav>
            {/* Como aun no implementamos los usuarios, no se muestra el logo del usuario, pero si se muestra el espacio para el mismo */}
            {/* <div className="logo_usuario"> 
                <img src= '../../assets/imagen_sin_usuario.png'/>
            </div> */}
        </header>
    )
}

export default Navbar