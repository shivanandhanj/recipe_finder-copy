const mongoose = require('mongoose');

// Define the schema for ingredients with unit and quantity information
const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true} // e.g., "grams", "cups", "tsp", etc.
});

// Define the schema for nutritional information
const nutritionSchema = new mongoose.Schema({
    calories: { type: Number },
    protein: { type: Number },
    fat: { type: Number },
    carbs: { type: Number },
    sugar: { type: Number },
    fiber: { type: Number }
});

// Define the main recipe schema with all the fields
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cuisine: { type: String, required: true },
    dishType: { type: String, required: true },
    category: { type: String },
    mealType: [{ type: String, required: true }],  // e.g., "Lunch", "Dinner"
    cookingMethods: [{ type: String }],  // e.g., "Sautéed", "Simmered"
    duration: { type: Number, required: true },  // total cooking time in minutes
    prepTime: { type: Number },  // preparation time in minutes
    cookTime: { type: Number },  // cooking time in minutes
    servingSize: { type: Number },
    difficulty: { type: String, required: true },  // e.g., "Easy", "Medium", "Hard"
    tasteProfile: { type: String },  // e.g., "Spicy"
    dietType: { type: String },  // e.g., "Non-Vegetarian"
    allergies: { type: String },  // e.g., "Dairy-Free"
    userRatings: { type: Number },  // e.g., 4.5
    ingredients: [ingredientSchema],  // List of ingredients
    nutritionalInfo: nutritionSchema,  // Nutritional details
      // Procedure for preparation
    cookingSteps: [{ type: String }],  // Step-by-step cooking instructions
    image: { type: String },  // URL to the food image
    youtubeLink: { type: String }  // Link to a YouTube video tutorial
});

const Recipe = mongoose.model('Recipe2.0', recipeSchema);

module.exports = Recipe;
