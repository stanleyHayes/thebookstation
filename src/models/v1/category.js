const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name required'],
        trim: true,
        unique: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;