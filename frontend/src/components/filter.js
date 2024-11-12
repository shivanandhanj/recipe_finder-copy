import React, { useState } from 'react';
import axios from 'axios';
import { FaUtensils, FaClock, FaFilter, FaLeaf } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";

import '../styles/fil.css';

function RecipeFilter() {
    const [filters, setFilters] = useState({
        cuisine: [],
        dishType: [],
        mealType: [],
        difficulty: [],
        dietType: [],
        maxDuration: '',
    });

    const [recipes, setRecipes] = useState([]);

    const handleFilterChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "maxDuration") {
            setFilters({ ...filters, [name]: value });
        } else {
            const selectedValues = filters[name];
            if (checked) {
                setFilters({ ...filters, [name]: [...selectedValues, value] });
            } else {
                setFilters({ ...filters, [name]: selectedValues.filter(item => item !== value) });
            }
        }
    };

    const applyFilters = async () => {
        const params = { ...filters };
        Object.keys(params).forEach(key => {
            if (Array.isArray(params[key]) && params[key].length === 0) {
                delete params[key];
            } else if (!params[key]) {
                delete params[key];
            }
        });

        try {
            const response = await axios.post('http://localhost:5000/api/recipes/filter', params);
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error.response?.data || error.message);
        }
    };

    return (
        <div className="filter-wrapper">
            <h2 className="filter-title"><FaFilter /> Filter Recipes</h2>
            <div className='filter-section'>
                <div className="filter-container">
                    <div className="filter-group">
                        <label>Cuisine</label>
                        <div className="filter-options">
                            {["Italian", "Mexican", "Indian", "Chinese"].map((cuisine) => (
                                <label key={cuisine} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="cuisine"
                                        value={cuisine}
                                        onChange={handleFilterChange}
                                    />
                                    {cuisine}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Dish Type</label>
                        <div className="filter-options">
                            {["Appetizer", "Main Course", "Dessert"].map((dish) => (
                                <label key={dish} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="dishType"
                                        value={dish}
                                        onChange={handleFilterChange}
                                    />
                                    {dish}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Meal Type</label>
                        <div className="filter-options">
                            {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                                <label key={meal} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="mealType"
                                        value={meal}
                                        onChange={handleFilterChange}
                                    />
                                    {meal}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Difficulty</label>
                        <div className="filter-options">
                            {["Easy", "Medium", "Hard"].map((level) => (
                                <label key={level} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="difficulty"
                                        value={level}
                                        onChange={handleFilterChange}
                                    />
                                    {level}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Diet Type</label>
                        <div className="filter-options">
                            {["Vegetarian", "Vegan", "Gluten-Free"].map((diet) => (
                                <label key={diet} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="dietType"

                                        value={diet}
                                        onChange={handleFilterChange}
                                    />
                                    {diet}
                                </label>
                            ))}
                        </div>
                    </div>
                    
               

                
                    <div className="filter-group">
                        <label className="filter-titledur"><FaClock /> Max Duration</label>
                        <input
                            type="number"
                            name="maxDuration"
                            className="filter-input"
                            placeholder="Minutes"
                            value={filters.maxDuration}
                            onChange={handleFilterChange}
                        />
                    </div>
                    
                    </div>

                    <button className="filter-button" onClick={applyFilters}>Apply Filters</button>
                
            </div>

            <h1 className="tit">Favorites</h1>
            <div className="favorites-section">
              {recipes.map(recipe => {
                const imageUrl = `http://localhost:5000${recipe.image}`;

                return (
                  <div key={recipe._id} className="recipe-card">
                    <Link to={`/recipes/${recipe._id}`} className="recipe-link">
                      {recipe.image && (
                        <div className='image-field'>
                          <img src={imageUrl} alt={recipe.title} className="recipe-image" />
                        </div>
                      )}
                      <div className="recipe-info">
                        <h3>{recipe.title}</h3>
                        <div className="recipe-meta">
                          <p><strong>Duration:</strong> {recipe.duration} minutes</p>
                          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                        </div>
                      </div>
                    </Link>

                  </div>
                );
              })}
            </div>
        </div>
    );
}

export default RecipeFilter;
