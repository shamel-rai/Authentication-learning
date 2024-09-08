const mongoose = require('mongoose');

// Define the schema for a recipe
const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes any leading or trailing whitespace
    },
    description: {
        type: String, // Array of strings for ingredients
        required: true
    },
    // Add more fields as needed
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the model from the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
