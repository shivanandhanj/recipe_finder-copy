import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Footer.css"; // Add a CSS file for styling the footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                   
                    <Link to="/contact" className="footer-link">Contact Us</Link>
                    <Link to="/about" className="footer-link">About Us</Link>
               
                </div>
                
                <p>&copy; {new Date().getFullYear()} Recipe Finder. All rights reserved.</p>

                <div className="footer-social">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
