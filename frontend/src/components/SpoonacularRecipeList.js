import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SpoonacularRecipeList.css';

const SpoonacularRecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('chicken');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = '4ce8dbfa53264661a4c9eb02cefc9b7c';  // Replace with your API key

    // Function to fetch recipes from Spoonacular
    const fetchRecipes = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
            );
            setRecipes(response.data.results);
        } catch (err) {
            setError('Error fetching recipes');
        }
        setLoading(false);
    };

    // Fetch recipes when the component loads or the query changes
    useEffect(() => {
        fetchRecipes();
    }, [query]);

    return (
        <div className="spoonacular-container">
        <h1 className="spoonacular-title">Spoonacular Recipe Finder</h1>
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for recipes..."
            className="spoonacular-search-input"
        />
        <button onClick={fetchRecipes} className="spoonacular-search-button">Search</button>
    
        {loading && <p className="loading-text">Loading recipes...</p>}
        {error && <p className="error-text">{error}</p>}
    
        <div className="spoonacular-recipe-grid">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="spoonacular-recipe-card">
                    <img src={recipe.image} alt={recipe.title} className="spoonacular-recipe-image" />
                    <h3 className="spoonacular-recipe-title">{recipe.title}</h3>
                    <a href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} target="_blank" rel="noopener noreferrer" className="view-recipe-link">
                        View Recipe
                    </a>
                </div>
            ))}
        </div>
    </div>
    
    );
};

export default SpoonacularRecipeList;
