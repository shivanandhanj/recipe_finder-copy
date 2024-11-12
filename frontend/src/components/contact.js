import React, { useState } from 'react';

import { motion } from 'framer-motion';
import '../styles/contact.css';
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        queries: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "88eb9b54-ddeb-4f9f-958e-85ccc911feaa"); 
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            setSubmitted(true); // Show modal on success
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const closeModal = () => {
        setSubmitted(false);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    const buttonVariants = {
        hover: { scale: 1.1 },
        tap: { scale: 0.9 },
    };

    return (
        
        <div className="contact-form-total-container">
            <motion.div 
                className="contact-form-container" 
                initial="hidden" 
                animate="visible" 
                variants={containerVariants}
                transition={{ duration: 0.5 }}
            >
                <form className="contact-form" onSubmit={onSubmit}>
                    <div className="contact-form-group">
                        <label htmlFor="name" className="contact-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="contact-input"
                            placeholder="Enter your name"
                           
                        />
                    </div>

                    <div className="contact-form-group">
                        <label htmlFor="email" className="contact-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="contact-input"
                            placeholder="Enter your email"
                            style={{ width: '900px' }}
                        />
                    </div>

                    <div className="contact-form-group">
                        <label htmlFor="queries" className="contact-label">Queries</label>
                        <textarea
                            id="queries"
                            name="queries"
                            value={formData.queries}
                            onChange={handleChange}
                            required
                            className="contact-textarea"
                            placeholder="Enter your queries about the recipe finder"
                        />
                    </div>

                    <motion.button 
                        type="submit" 
                        className="contact-submit-btn"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Submit
                    </motion.button>
                </form>
            {submitted && (
                <div className="popup-overlay" onClick={closeModal}>
                    <div className="popup-container">
                        <p className="contact-success-message">
                            <center><strong>Thank you! We have received your query and will get back to you soon.</strong></center>
                        </p>
                    </div>
                </div>
            )}
            </motion.div>

        </div>
    );
};

export default Contact;