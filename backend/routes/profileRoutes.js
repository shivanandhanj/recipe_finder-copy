// backend/routes/profileRoutes.js
const express = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const Recipe = require('../models/recipeModel2');
const router = express.Router();
const { registerUser, loginUser,fav,dispfav } = require('../controllers/userController');
// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid file name conflicts
  },
});

const upload = multer({ storage });

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.post('/:userId', upload.single('profilePicture'), async (req, res) => {
    try {
      const { bio, preferredCuisine, dietaryPreferences,allergies,skillLevel} = req.body;
      
      const updatedData = {
        bio,
        preferredCuisine: preferredCuisine ? preferredCuisine.split(",") : [],
        dietaryPreferences: dietaryPreferences ? dietaryPreferences.split(",") : [],
        allergies: allergies ? allergies.split(",") : [],
        skillLevel,
      };
  
      // If a new profile picture was uploaded, save the file path
      if (req.file) {
        updatedData.profilePicture = `/uploads/${req.file.filename}`;
      }
  
      // Find the profile by user ID
      let profile = await Profile.findOne({ user: req.params.userId });
  
      if (profile) {
        // If profile exists, update it
        profile = await Profile.findOneAndUpdate(
          { user: req.params.userId },
          updatedData,
          { new: true }
        );
      } else {
        // If profile does not exist, create a new one
        profile = new Profile({
          user: req.params.userId,
          ...updatedData,
        });
        await profile.save();
      }
  
      res.json(profile);  // Return the updated or created profile data
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/:userId/mealPlan', async (req, res) => {
    const { date, recipeId } = req.body;
  
    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.params.userId },
        { $push: { mealPlan: { date, recipe: recipeId } } },
        { new: true }
      ).populate('mealPlan.recipe'); // populate recipe details
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.json(profile.mealPlan);  // Return the updated meal plan
    } catch (error) {
      console.error('Error updating meal plan:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/:userId/mealPlan', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Fetch the profile by userId and populate the mealPlan field (assuming it's an array of meal plans)
      const profile = await Profile.findOne({ user: userId })
        .populate('mealPlan.recipe')  // Populate the recipe details in the mealPlan array (if using mealPlan schema)
        .exec();
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      // Return the user's profile along with the populated meal plan
      res.status(200).json(profile.mealPlan);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // routes/recommendations.js

router.get('/recommendations/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const recommendations = await Recipe.find({
      cuisine: { $in: profile.preferredCuisine },
      dietType: { $in: profile.dietaryPreferences },
      allergies: { $nin: profile.allergies },
      difficulty: profile.skillLevel,
    });

    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

  
router.put('/:userId/favorites',fav)
router.get('/profile/:userId',dispfav)
module.exports = router;
