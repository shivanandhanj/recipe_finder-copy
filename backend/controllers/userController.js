// backend/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');


const generateToken = (id) => {
    
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
        res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};
exports.fav=async(req,res)=>{
    try {
        const { recipeId } = req.body;
        console.log(recipeId) 
        console.log("shiva")// Recipe ID to add
        const profile = await Profile.findOne({ user: req.params.userId });
        console.log(profile)
        if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
        }
    
        // Check if recipe is already in favorites
        if (!profile.favorites.includes(recipeId)) {
          profile.favorites.push(recipeId); // Add to favorites
        } else {
          profile.favorites = profile.favorites.filter(id => id.toString() !== recipeId); // Remove if exists
        }
    
        await profile.save();
        res.json(profile);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.dispfav=async(req,res)=>{
    try {
        const profile = await Profile.findOne({ user: req.params.userId })
            .populate('favorites')  // Populate the favorites array with recipe details
            .exec();
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
    
        // Return the profile data with populated favorites
        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


