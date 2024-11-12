import React, { useState, useEffect } from 'react';
//import foodImg from "../assets/1729236850430.png"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/RecipeDetails.css'; // Import the CSS file
import { FaPlus, FaMinus } from 'react-icons/fa';
const RecipeDetails = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
   
    const [servingSize, setServingSize] = useState(1);
    

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
               
                setRecipe(response.data);
                console.log(recipe)
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;
    const imageUrl = `http://localhost:5000${recipe.image}`;
    
    // <img src={imageUrl} alt={recipe.title} className="recipe-image" />
    
       const getAdjustedIngredients = () => {
        return recipe.ingredients.map(ingredient => ({
          ...ingredient,
          quantity: (ingredient.quantity * servingSize) / recipe.servingSize,
        }));
      };
    
      // Increment serving size
      const incrementServingSize = () => {
        setServingSize(prevSize => prevSize + 1);
      };
    
      // Decrement serving size, ensuring it doesn’t go below 1
      const decrementServingSize = () => {
        setServingSize(prevSize => (prevSize > 1 ? prevSize - 1 : 1));
      };
    
    
    return (
        <div className="recipe-details">
            <div className="recipe-card-details">
                <h1 className="recipe-title">{recipe.title}</h1>

                {imageUrl && (
                    <img src={imageUrl} alt={recipe.title} className="recipe-image" />
                )}

                <div className="recipe-info">
                    <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                    <p><strong>Dish Type:</strong> {recipe.dishType}</p>
                    <p><strong>Category:</strong> {recipe.category}</p>
                    <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
                    <p><strong>Cooking Methods:</strong> {recipe.cookingMethods.join(', ')}</p>
                    <p><strong>Total Time:</strong> {recipe.totalTime} minutes</p>
                    <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
                    <p><strong>Cook Time:</strong> {recipe.cookTime} minutes</p>
                    <p><strong>Serving Size:</strong> {recipe.servingSize}</p>
                    <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                    <p><strong>Taste Profile:</strong> {recipe.tasteProfile}</p>
                    <p><strong>Diet Type:</strong> {recipe.dietType}</p>
                    <p><strong>Allergies:</strong> {recipe.allergies}</p>
                    <p><strong>User Rating:</strong> {recipe.userRatings} ({recipe.ratingsCount} ratings)</p>
                </div>

                <div className="recipe-ingredients">

                <h2>Ingredients</h2>
                
                <div className="serving-size-controls">
                <p style={{ marginLeft: "auto" }}><strong>Serving Size:</strong>  </p>
                    <button onClick={decrementServingSize} className="serving-button">
                        <FaMinus />
                    </button>
                    <span className="serving-size">{servingSize}</span>
                    <button onClick={incrementServingSize} className="serving-button">
                        <FaPlus />
                    </button>
                </div>
              
                
    <div className="ingredients-grid">
        <ul>
            {getAdjustedIngredients().map((ingredient, index) => (
                <li key={index}>
                    {ingredient.quantity <= 0 
                        ? 'As required' 
                        : `${ingredient.quantity.toFixed(2)} ${ingredient.unit} `} 
                    of {ingredient.name}
                </li>
            ))}
        </ul>
    </div>
                </div>

                <div className="recipe-nutrition">
                    <h2>Nutritional Information</h2>
                    <p><strong>Calories:</strong> {recipe.nutritionalInfo.calories} kcal</p>
                    <p><strong>Protein:</strong> {recipe.nutritionalInfo.protein} g</p>
                    <p><strong>Fat:</strong> {recipe.nutritionalInfo.fat} g</p>
                    <p><strong>Carbohydrates:</strong> {recipe.nutritionalInfo.carbs} g</p>
                    <p><strong>Sugar:</strong> {recipe.nutritionalInfo.sugar} g</p>
                    <p><strong>Fiber:</strong> {recipe.nutritionalInfo.fiber} g</p>
                    <p><strong>Sodium:</strong> {recipe.nutritionalInfo.sodium} mg</p>
                    <p><strong>Cholesterol:</strong> {recipe.nutritionalInfo.cholesterol} mg</p>
                </div>

                <div className="recipe-instructions">
                    <h2>Cooking Instructions</h2>
                    {recipe.cookingSteps.map((step, index) => (
                        <div key={index} className="instruction-step">
                            <h3>Step {index + 1}</h3>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>

                {recipe.youtubeLink && (
        <div className="youtube-video">
            <iframe
                width="700"
                height="415"
                src={`https://www.youtube.com/embed/${new URL(recipe.youtubeLink).searchParams.get('v')}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
        </div>
    )}
    
    
                    
                    <div className="recipe-feedback">
                        <p>Do you like this recipe?</p>
                        <button className="feedback-btn">👍 YES</button>
                        <button className="feedback-btn">👎 NO</button>
                    </div>
                 </div>
             </div>
              );
};

export default RecipeDetails;
