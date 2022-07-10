const Like = require("./../../models/v1/like");

exports.toggleLike = async (req, res) => {
    try {
        let like = await Like.findOne({user: req.user._id, book: req.params.book});
        if (!like) {
            like = await Like.create({user: req.user._id, book: req.params.book});
        } else {
            await like.remove();
        }
        res.status(201).json({message: 'Like added successfully', data: like});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getLike = async (req, res) => {
    try {
        const like = await Like.findById(req.params.id)
            .populate({path: 'user'}).populate({path: 'book'});
        if (!like)
            return res.status(404).json({message: 'Like not found'});
        res.status(200).json({message: 'Like retrieved successfully', data: like});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getLikes = async (req, res) => {
    try {
        const likes = await Like.find({book: req.params.book})
            .populate({path: 'user'}).populate({path: 'book'});
        res.status(200).json({message: 'Likes retrieved successfully', data: likes});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


