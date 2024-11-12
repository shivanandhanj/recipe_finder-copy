const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
    bio: {
        type: String,
        default: '',
    },
    profilePicture: {
        type: String,
        default: '',
    },
    preferredCuisine: {
        type: [String], // Array of cuisines
        default: [],
    },
    dietaryPreferences: {
        type: [String],  // Example values: ['Vegetarian', 'Vegan', 'Gluten-Free']
        default: [],
      },
      allergies: {
        type: [String],  // Example values: ['Peanuts', 'Dairy', 'Shellfish']
        default: [],
      },
      skillLevel: {
        type: String,  // Example values: 'Beginner', 'Intermediate', 'Advanced'
        default: 'Beginner',
      },
      mealPlan: [{
        date: Date,
        recipe: { type: Schema.Types.ObjectId, ref: 'Recipe2.0' }
      }],

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User schema
        required: true,
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe2.0'  // Reference to recipes schema
    }]
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
