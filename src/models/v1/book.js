const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    link: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    trailer: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    caption: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['action', 'adventure', 'classic', 'comic', 'fantasy', 'horror', 'romance', 'sci-fi', 'thrillers', 'crime', 'drama', 'fairytale', 'other'],
        required: true
    },
    description: {type: String, required: true},
    rating: {
        count: {
            type: Number,
            min: 0,
            default: 0
        },
        total: {
            type: Number,
            min: 0,
            default: 0
        },
        average: {
            type: Number,
            min: 0,
            default: 0
        },
        details: {
            five: {
                type: Number,
                min: 0,
                default: 0
            },
            four: {
                type: Number,
                min: 0,
                default: 0
            },
            three: {
                type: Number,
                min: 0,
                default: 0
            },
            two: {
                type: Number,
                min: 0,
                default: 0
            },
            one: {
                type: Number,
                min: 0,
                default: 0
            },
        }
    }
}, {
    timestamps: {createdAt: true, updatedAt: true},
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

bookSchema.virtual('comments', {
    localField: '_id',
    foreignField: 'book',
    justOne: false,
    ref: 'Comment'
});

bookSchema.virtual('likes', {
    localField: '_id',
    foreignField: 'book',
    justOne: false,
    ref: 'Like'
});

bookSchema.virtual('reviews', {
    localField: '_id',
    foreignField: 'book',
    justOne: false,
    ref: 'Review'
});

bookSchema.virtual('count', {
    localField: '_id',
    foreignField: 'book',
    count: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;