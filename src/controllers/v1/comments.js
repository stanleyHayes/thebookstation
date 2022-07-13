const Book = require("./../../models/v1/book");
const Comment = require("./../../models/v1/comment");

exports.createComment = async (req, res) => {
    try {
        const {book, text} = req.body;
        const existingBook = await Book.findById(book);
        if (!existingBook) return res.status(404).json({message: 'Book trailer does not exist'});
        const comment = await Comment.create({
            user: req.user._id,
            book,
            text
        });
        await comment.populate({path: 'user'});

        res.status(201).json({message: 'Comment created successfully', data: comment});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate({path: 'user'})
            .populate({path: 'book'});
        if (!comment)
            return res.status(404).json({message: 'Comment not found'});
        res.status(200).json({message: 'Comment retrieved successfully', data: comment});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getComments = async (req, res) => {
    try {
        const match = {};
        const sort = {createdAt: -1};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 50;
        const skip = (page - 1) * limit;
        if (req.query.book) {
            match['book'] = req.query.book
        }

        const comments = await Comment
            .find(match)
            .populate({path: 'user', select: 'fullName username'})
            .skip(skip)
            .limit(limit)
            .sort(sort);

        const commentCount = await Comment.find(match).countDocuments();
        res.status(200).json({message: 'Comments retrieved successfully', data: comments, count: commentCount});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({_id: req.params.id, user: req.user._id})
            .populate({path: 'user'})
            .populate({path: 'book'});
        if (!comment)
            return res.status(404).json({message: 'Comment not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['text'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of allowedUpdates) {
            comment[key] = req.body[key];
        }
        await comment.save();
        res.status(200).json({message: 'Comment updated successfully', data: comment});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({_id: req.params.id, user: req.user._id})
            .populate({path: 'user'})
            .populate({path: 'book'});
        if (!comment)
            return res.status(404).json({message: 'Comment not found'});
        await comment.remove();
        res.status(200).json({message: 'Comment removed successfully', data: comment});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
