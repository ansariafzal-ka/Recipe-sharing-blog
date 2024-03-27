const mongoose = require("mongoose");

const recipesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    procedure: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Recipes", recipesSchema);
