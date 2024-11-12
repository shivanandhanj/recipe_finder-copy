const Recipe = require('../models/recipeModel'); // Assuming you have a Recipe model
const Recipe2= require('../models/recipeModel2');
// Controller to add a recipe
const addRecipe = async (req, res) => {
    try {
        const recipeData = req.body;

        // Check if there's an uploaded image and save its path
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const newRecipe = new Recipe({
            title: recipeData.title,
            cuisine: recipeData.cuisine,
            course: recipeData.course,
            mealType: recipeData.mealType,
            duration: recipeData.duration,
            difficulty: recipeData.difficulty,
            ingredients: JSON.parse(recipeData.ingredients), // Parse ingredients if they're in JSON format
            instructions: recipeData.instructions,
            image: imageUrl, // Store the image URL
            youtubeLink: recipeData.youtubeLink,
        });

        await newRecipe.save();
        res.status(201).json({ message: 'Recipe added successfully!', recipe: newRecipe });
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ error: 'Error adding recipe' });
    }
};

// Controller to get all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe2.find();
       
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Error fetching recipes' });
    }
};

// Controller to search recipes by title or cuisine (as an example)
const searchRecipes = async (req, res) => {
    const query = req.query.q;
    try {
        const recipes = await Recipe2.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive search by title
                { cuisine: { $regex: query, $options: 'i' } },
                {dishType :{ $regex: query, $options: 'i'}} ,
                {tasteProfile :{ $regex: query, $options: 'i'}},
                {dietType :{ $regex: query, $options: 'i'}} ,
                {mealType :{ $regex: query, $options: 'i'}} ,
                {difficulty :{ $regex: query, $options: 'i'}} ,// Case-insensitive search by cuisine
            ]  
        });
        
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error searching recipes:', error);
        res.status(500).json({ error: 'Error searching recipes' });
    }
};


const filterRecipes = async (req, res) => {
    const { cuisine, dishType, mealType, difficulty, dietType, maxDuration } = req.body;

    // Initialize filter object
    let filter = {};

    // Modify each field to handle arrays where applicable
    if (cuisine && cuisine.length > 0) filter.cuisine = { $in: cuisine.map(c => new RegExp(c, 'i')) };  // Case-insensitive regex for each item
    if (dishType && dishType.length > 0) filter.dishType = { $in: dishType.map(d => new RegExp(d, 'i')) };
    if (mealType && mealType.length > 0) filter.mealType = { $in: mealType };
    if (difficulty) filter.difficulty = difficulty;
    if (dietType && dietType.length > 0) filter.dietType = { $in: dietType };
    if (maxDuration) filter.duration = { $lte: parseInt(maxDuration) };

   
    try {
        const recipes = await Recipe2.find(filter);
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error in filterRecipes:', error.stack);  // Log full error stack
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




const getRecipeById = async (req, res) => {
    try {
       
        const recipe = await Recipe2.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addRecipe,
    getAllRecipes,
    searchRecipes,
    getRecipeById,
    filterRecipes
};
