import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RecipeList.css';
import { Link } from 'react-router-dom';
import { FaHeart,FaCalendarDay } from 'react-icons/fa'; // Import heart icon
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Chat from './bot';
const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [chatResponse, setChatResponse] = useState("");
    const [favorites, setFavorites] = useState([]);
    const userId=localStorage.getItem('id');
    const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDatePickerId, setOpenDatePickerId] = useState(null); // State to track which recipe has date picker open

    
    useEffect(() => {
        // Fetch all recipes
        axios.get('http://localhost:5000/api/recipes')
            .then(response => setRecipes(response.data))
            .catch(error => console.error('Error fetching recipes:', error));

        // Fetch user favorites
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/profiles/${userId}`);
                setFavorites(response.data.favorites || []);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, [userId]);

    const toggleFavorite = async (recipeId) => {
        try {
            await axios.put(`http://localhost:5000/api/profiles/${userId}/favorites`, {
                recipeId,
            });

            setFavorites(prevFavorites =>
                prevFavorites.includes(recipeId)
                    ? prevFavorites.filter(id => id !== recipeId)
                    : [...prevFavorites, recipeId]
            );
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

    const openDatePickerForRecipe = (recipeId) => {
        // Only open the date picker for the clicked recipe
        setOpenDatePickerId(recipeId === openDatePickerId ? null : recipeId); // Toggle the recipe
      };
    
      // Function to handle date submission for meal plan
      const handleDateSubmit = async (recipeId) => {
        try {
          await axios.post(`http://localhost:5000/api/profiles/${userId}/mealPlan`, {
            date: selectedDate,
            recipeId: recipeId,
          });
          setOpenDatePickerId(null); // Close the date picker
          alert('Recipe added to meal plan!');
        } catch (error) {
          console.error('Error adding to meal plan:', error);
        }
      };
    

    const handleChatSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:7000/query', { query: chatInput });
            setChatResponse(response.data.answer);
        } catch (error) {
            console.error('Error fetching chatbot response:', error);
        }
    };
    

   

    return (
       
        <div className="parent">
            <Chat/>
            <div><h1>Recipe List</h1></div>
            <div className="filter-button1p">
                <div>
                    <Link to="/search">
                        <button className="filter-button1">Search</button>
                    </Link>
                </div>
                <div>
                    <Link to="/filter">
                        <button className="filter-button1">Filter</button>
                    </Link>
                </div>
            </div>

            <div className="recipe-container">
                {recipes.map(recipe => {
                    const imageUrl = `http://localhost:5000${recipe.image}`;
                    const isFavorite = favorites.includes(recipe._id);

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
                            <button
                                className="favorite-button"
                                onClick={() => toggleFavorite(recipe._id)}
                            >
                                <FaHeart
                                    color={isFavorite ? "red" : "gray"}
                                    size={24}
                                    style={{ cursor: 'pointer' }}
                                />
                            </button>
  {/* Add to Meal Plan Button */}
  <button
        className="meal-plan-button"
        onClick={() => openDatePickerForRecipe(recipe._id)} // Open date picker for the specific recipe
      >
        <FaCalendarDay
                                     color={ "#0056b3" }
                                    size={24}
                                    style={{ cursor: 'pointer' }}
                                />
        Meal Plan
      </button>
     

      {openDatePickerId === recipe._id && ( // Only show date picker for the selected recipe
        <div className="date-picker-modal">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()} // Set minimum date to today
            placeholderText="Select a date for your meal plan"
          />
          <button onClick={() => handleDateSubmit(recipe._id)}>Confirm Meal Plan</button>
          <button onClick={() => setOpenDatePickerId(null)}>Cancel</button>
        </div>
      )}

      
                            
  
                  </div>
                    );
                })}
            </div>

            <div className="chatbot">
                <h2>Ask the Recipe Chatbot</h2>
                <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a question about recipes..."
                />
                <button onClick={handleChatSubmit}>Submit</button>
                {chatResponse && <p className="chat-response">Answer: {chatResponse}</p>}
            </div>
        </div>
    );
};

export default RecipeList;
