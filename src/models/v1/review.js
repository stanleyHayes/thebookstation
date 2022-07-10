const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    }
}, {
    timestamps: {createdAt: true, updatedAt: true},
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;