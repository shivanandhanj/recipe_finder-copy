import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Profile.css";  // Add custom CSS if needed
import Select from 'react-select';
import { FaCamera } from 'react-icons/fa';
const Profile = () => {
  const cuisineOptions = [
    { value: 'Italian', label: 'Italian' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Mexican', label: 'Mexican' },
    // Add more cuisines as needed
  ];

  const dietaryOptions = [
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Gluten-Free', label: 'Gluten-Free' },
    { value: 'Keto', label: 'Keto' },
    // Add more dietary preferences as needed
  ];

  const allergyOptions = [
    { value: 'Peanuts', label: 'Peanuts' },
    { value: 'Dairy', label: 'Dairy' },
    { value: 'Shellfish', label: 'Shellfish' },
    { value: 'Soy', label: 'Soy' },
    // Add more allergens as needed
  ];
  const handleCuisineChange = (selectedOptions) => {
    setNewPreferredCuisine(selectedOptions.map((option) => option.value).join(', '));
  };

  const handleDietaryChange = (selectedOptions) => {
    setDietaryPreferences(selectedOptions.map((option) => option.value).join(', '));
  };

  const handleAllergyChange = (selectedOptions) => {
    setAllergies(selectedOptions.map((option) => option.value).join(', '));
  };

  const [profile, setProfile] = useState({
    bio: "",
    profilePicture: "",
    preferredCuisine: [],
    dietaryPreferences: [],
    allergies: [],
    skillLevel: "",


  });
  const [recipes, setFavorites] = useState([]);
  const [newBio, setNewBio] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(null);  // Changed to handle file
  const [newPreferredCuisine, setNewPreferredCuisine] = useState([]);
  const [newAllergies, setAllergies] = useState([]);
  const [newSkillLevel, setNewSkillLevel] = useState("");
  const [newDietaryPreferences, setDietaryPreferences] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');
  const imageUrl = `http://localhost:5000${Profile.profilePicture}`;
  const [mealPlan, setMealPlan] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  // Replace with actual user id logic (from session/localStorage)
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profiles/recommendations/${userId}`);
        setRecommendedRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [userId]);
  useEffect(() => {
    // Fetch user profile when the component loads
    axios
      .get(`http://localhost:5000/api/profiles/${userId}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [userId]);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profiles/${userId}/mealPlan`);
        setMealPlan(response.data);  // Set the fetched meal plan data
      } catch (error) {
        console.error('Error fetching meal plan:', error);
      }
    };

    fetchMealPlan();
  }, [userId]);


  useEffect(() => {
    if (userId) {
      // Fetch profile details including favorite recipes
      axios.get(`http://localhost:5000/api/profiles/profile/${userId}`)
        .then(response => {
          setProfile(response.data);
          setFavorites(response.data.favorites);  // Save the favorite recipes
        })
        .catch(error => console.error('Error fetching profile:', error));
    }
  }, [userId]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Use FormData to handle file uploads

    // Append the data to the formData object
    formData.append("bio", newBio || profile.bio);
    formData.append("profilePicture", newProfilePicture); // Append the file
    formData.append("skillLevel", newSkillLevel); // Append the file
    formData.append("preferredCuisine", newPreferredCuisine.length
      ? newPreferredCuisine
      : profile.preferredCuisine);

    formData.append("dietaryPreferences", newDietaryPreferences.length
      ? newDietaryPreferences
      : profile.dietaryPreferences);

    formData.append("allergies", newAllergies.length
      ? newAllergies
      : profile.allergies);

    try {
      // Send the FormData to backend
      const response = await axios.post(
        `http://localhost:5000/api/profiles/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProfile(response.data);
      console.log(response.data); // Update local state with new profile data
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken"); // Clear auth token if using JWT
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <div className="profile-info">
        <div className="profile-section">

          <div className="profile-field">
            <strong>Profile Picture:</strong>

            <img
              src={`http://localhost:5000${profile.profilePicture}` || "default_profile_pic.jpg"}
              alt="Profile"
              className="profile-picture"
            />
          </div>
          <div className="profile-field">
            <strong>Bio:</strong>
            <p>{profile.bio}</p>
          </div>
        </div>
        <div className="profile-info-section">

          <div className="profile-field">
            <strong>Preferred Cuisine:</strong>
            <ul>
              {profile.preferredCuisine.map((cuisine, index) => (
                <li key={index}>{cuisine}</li>
              ))}
            </ul>
          </div>
          <div className="profile-field">
            <strong>Dietary Preferences</strong>
            <ul>
              {profile.dietaryPreferences.map((cuisine, index) => (
                <li key={index}>{cuisine}</li>
              ))}
            </ul>
          </div>
          <div className="profile-field">
            <strong>Allergies:</strong>
            <ul>
              {profile.allergies.map((cuisine, index) => (
                <li key={index}>{cuisine}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <h3>Update Profile</h3>
      <form onSubmit={handleUpdateProfile}>
        <div className="input-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            placeholder="Update your bio"
          ></textarea>
        </div>

        <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="profilePicture" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <FaCamera size={20} color="#555" style={{ marginRight: '8px' }} />
            <span style={{ fontSize: '16px', color: '#555' }}>Upload Profile Picture</span>
          </label>
          <input
            type="file"
            id="profilePicture"
            style={{ display: 'none' }} // Hide the default file input
            onChange={(e) => setNewProfilePicture(e.target.files[0])} // Handle file input
          />
        </div>
        <div className="input-group">
          <label htmlFor="preferredCuisine">Preferred Cuisine</label>
          <Select
            id="preferredCuisine"
            isMulti
            options={cuisineOptions}
            onChange={handleCuisineChange}
            placeholder="Select preferred cuisines"
          />
        </div>

        <div className="input-group">
          <label htmlFor="skillLevel">Skill Level</label>
          <select
            id="skillLevel"
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
            style={{ height: '40px', padding: '0 10px', fontSize: '1rem' }}
          >
            <option value="">Select skill level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="dietaryPreferences">Dietary Preference</label>
          <Select
            id="dietaryPreferences"
            isMulti
            options={dietaryOptions}
            onChange={handleDietaryChange}
            placeholder="Select dietary preferences"
          />
        </div>

        <div className="input-group">
          <label htmlFor="allergies">Allergies</label>
          <Select
            id="allergies"
            isMulti
            options={allergyOptions}
            onChange={handleAllergyChange}
            placeholder="Select allergies"
          />
        </div>




        <div className="flex">
          <button className="updatebut" type="submit">Update Profile</button>
        </div>
      </form>

      <div className="profile-page">
        {profile && (
          <>
            {/* <h1>{profile.user.username}'s Profile</h1> */}
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
          </>
        )}
      </div>
      <div className="profile-page">
        {profile && (
          <>
            {/* <h1>{profile.user.username}'s Profile</h1> */}
            <h1 className="tit">Plan meal</h1>
            <div className="favorites-section">
              {mealPlan.map(meal => {
                const imageUrl = `http://localhost:5000${meal.recipe.image}`;

                return (
                  <div key={meal.recipe._id} className="recipe-card">
                    <Link to={`/recipes/${meal.recipe._id}`} className="recipe-link">
                      {meal.recipe.image && (
                        <div className='image-field'>
                          <img src={imageUrl} alt={meal.recipe.title} className="recipe-image" />
                        </div>
                      )}
                      <div className="recipe-info">
                        <h3>{meal.recipe.title}</h3>
                        <div className="recipe-meta">
                          <p><strong>Duration:</strong> {meal.recipe.duration} minutes</p>
                          <p><strong>Difficulty:</strong> {meal.recipe.difficulty}</p>
                          <p><strong>Date</strong> {meal.date}</p>
                        </div>
                      </div>
                    </Link>

                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div></div>
      <div className="profile-page">
        {profile && (
          <>
            {/* <h1>{profile.user.username}'s Profile</h1> */}
            <h1 classname="tit" style={{marginBottom:"1rem"}}>Recommended Meal</h1>
            <div className="favorites-section">
              {recommendedRecipes.map(meal => {
                const imageUrl = `http://localhost:5000${meal.image}`;
                return (
                  <div key={meal._id} className="recipe-card">
                    <Link to={`/recipes/${meal._id}`} className="recipe-link">
                      {meal.image && (
                        <div className='image-field'>
                          <img src={imageUrl} alt={meal.title} className="recipe-image" />
                        </div>
                      )}
                      <div className="recipe-info">

                        <div className="recipe-meta">
                          <p><strong>Duration:</strong> {meal.duration} minutes</p>
                          <p><strong>Difficulty:</strong> {meal.difficulty}</p>

                        </div>
                      </div>
                    </Link>

                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>




      <div className="flex">
        <button onClick={handleLogOut} className="logout-btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
