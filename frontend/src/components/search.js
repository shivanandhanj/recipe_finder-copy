import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/search.css'
function RecipeSearch() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/recipes/search?q=${query}`);
            setRecipes(response.data);
            console.log('Search Results:', response.data);  // Log the fetched data for debugging
        } catch (error) {
            console.error('Error searching recipes:', error);
        }
    };

    return (
        <div className="search-recipes-container">
        <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search for recipes..."
            className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        
        <div className="recipe-container">
            {recipes.map(recipe => {
                const imageUrl = `http://localhost:5000${recipe.image}`;
                return (
                    <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="recipe-card">
                        {recipe.image && (
                            <div className="image-field">
                                <img src={imageUrl} alt={recipe.title} className="recipe-image" />
                            </div>
                        )}
                        <div className="recipe-info">
                            <h3 className="recipe-title">{recipe.title}</h3>
                            <div className="recipe-meta">
                                <p><strong>Duration:</strong> {recipe.duration} minutes</p>
                                <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    </div>
    
    );
}

export default RecipeSearch;
