const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
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
}, {
    timestamps: {createdAt: true, updatedAt: true},
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;