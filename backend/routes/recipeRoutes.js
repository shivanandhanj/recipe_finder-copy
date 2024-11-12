const express = require('express');
const { addRecipe, getAllRecipes, searchRecipes, getRecipeById,filterRecipes} = require('../controllers/recipeController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Upload destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid conflicts
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes
router.post('/add', upload.single('image'), addRecipe); // Add recipe with image upload
router.get('/', getAllRecipes);
router.get('/search', searchRecipes);
router.get('/:id', getRecipeById);
router.post('/filter',filterRecipes);

 
module.exports = router;
