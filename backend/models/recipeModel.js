const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true },  // e.g. "2 cups", "500g"
});

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cuisine: { type: String, required: true },  // e.g. "Indian", "Italian"
    course: { type: String, required: true },  // e.g. "Main Course", "Dessert"
    mealType: { type: String, required: true },  // e.g. "Breakfast", "Lunch", "Dinner"
    duration: { type: Number, required: true },  // in minutes
    difficulty: { type: String, required: true },  // e.g. "Easy", "Medium", "Hard"
    ingredients: [ingredientSchema],  // List of ingredients with quantity
    instructions: { type: String, required: true },  // Procedure for preparation
    image: { type: String },  // URL to the food image
    youtubeLink: { type: String },  // Link to a YouTube video tutorial
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
