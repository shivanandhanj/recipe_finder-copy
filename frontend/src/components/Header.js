import React from 'react';
import { Link } from 'react-scroll'; // To smooth scroll to the Add Recipe section
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <h1 className="logo">Recipe Finder</h1>
                <ul className="nav-links">
                    <li>
                        <Link to="recipe-list" smooth={true} duration={500}>
                            View Recipes
                        </Link>
                    </li>
                    <li>
                        <Link to="add-recipe" smooth={true} duration={500}>
                            Add Recipe
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
