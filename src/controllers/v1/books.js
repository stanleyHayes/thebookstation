const Book = require("./../../models/v1/book");
const Comment = require("./../../models/v1/comment");
const Like = require("./../../models/v1/like");
const Review = require("./../../models/v1/review");

const {uploadFile, removeFile} = require("../../utils/upload");

exports.createBook = async (req, res) => {
    try {
        const {link, category, image, caption, trailer, description, name} = req.body;
        const trailerLink = await uploadFile(trailer, {resource_type: 'video'});
        const imageLink = await uploadFile(image, {resource_type: 'image'});
        const book = await Book.create({
            trailer: {url: trailerLink.secure_url, public_id: trailerLink.public_id},
            image: {url: imageLink.secure_url, public_id: trailerLink.public_id},
            link,
            category,
            caption,
            user: req.user._id,
            description,
            name
        });
        await book.populate({path: 'user', select: 'firstName lastName fullName username'});
        await book.populate({path: 'comments', populate: {path: 'user', select: 'firstName lastName fullName username'}});
        await book.populate({path: 'likes'});
        await book.populate({path: 'count'});

        res.status(201).json({message: 'Book created successfully', data: book});
    } catch (e) {
        console.log(e.message);
        res.status(500).json({message: e.message});
    }
}


exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate({path: 'user', select: 'firstName lastName fullName username'})
            .populate({path: 'comments', populate: {path: 'user', select: 'firstName lastName fullName username'}})
            .populate({path: 'likes'})
            .populate({path: 'count'})
            .populate({path: 'reviews'});

        if (!book) return res.status(404).json({message: 'Book trailer not found'});
        res.status(200).json({message: 'Book retrieved successfully', data: book});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getBooks = async (req, res) => {
    try {
        const match = {};
        const sort = {};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 30;
        const skip = (page - 1) * limit;

        if (req.query.categories) {
            match['category'] = {$in: [...req.query.categories.split(',')]}
        }

        const books = await Book
            .find(match)
            .populate({path: 'user', select: 'firstName lastName fullName username'})
            .populate({path: 'comments', populate: {path: 'user', select: 'firstName lastName fullName username'}})
            .populate({path: 'likes'})
            .populate({path: 'count'})
            .skip(skip)
            .limit(limit)
            .sort(sort);

        const bookCount = await Book.find(match).countDocuments();
        res.status(200).json({message: 'Books retrieved successfully', data: books, count: bookCount});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findOne({user: req.user._id, _id: req.params.id})
            .populate({path: 'user', select: 'firstName lastName fullName username'})
            .populate({path: 'comments', populate: {path: 'user', select: 'firstName lastName fullName username'}})
            .populate({path: 'likes'})
            .populate({path: 'count'})
            .populate({path: 'reviews'});
        if (!book) return res.status(404).json({message: 'Book trailer not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'caption', 'trailer', 'image', 'link', 'category'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of allowedUpdates) {
            if (key === 'trailer') {
                await removeFile(book.trailer.public_id);
                const trailer = await uploadFile(req.body[key], {resource_type: 'video'});
                book.trailer = {url: trailer.secure_url, public_id: trailer.public_id};
            } else if (key === 'image') {
                await removeFile(book.image.public_id);
                const image = await uploadFile(req.body[key], {resource_type: 'image'});
                book.image = {url: image.secure_url, public_id: image.public_id};
            } else {
                book[key] = req.body[key];
            }
        }
        await book.save();
        res.status(200).json({message: 'Book updated successfully', data: book});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findOne({user: req.user._id, _id: req.params.id});
        if (!book) return res.status(404).json({message: 'Book trailer not found'});
        await book.remove();
        await Comment.remove({book: book._id});
        await Like.remove({book: book._id});
        await Review.remove({book: book._id});
        res.status(200).json({message: 'Book trailer removed successfully', data: book});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}