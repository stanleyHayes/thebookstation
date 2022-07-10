const Book = require("./../../models/v1/book");
const Review = require("./../../models/v1/comment");

exports.createReview = async (req, res) => {
    try {
        const {book, text, rating} = req.body;
        const existingBook = await Book.findById(book);
        if (!existingBook) return res.status(404).json({message: 'Book trailer does not exist'});
        const comment = await Review.create({
            user: req.user._id,
            book,
            text,
            rating
        });

        let ratingCategory = 'one';
        switch (parseInt(rating)) {
            case 5:
                ratingCategory = 'five';
                break;
            case 4:
                ratingCategory = 'four';
                break;
            case 3:
                ratingCategory = 'three';
                break;
            case 2:
                ratingCategory = 'two';
                break;
            case 1:
                ratingCategory = 'one';
                break;
        }

        existingBook.rating = {
            count: existingBook.rating.count + 1,
            total: existingBook.rating.total + rating,
            average: (existingBook.rating.total + rating) / (existingBook.rating.count + 1),
            details: {...existingBook.rating.details, [ratingCategory]: existingBook.rating.details[ratingCategory] + 1}
        }
        await existingBook.save();

        await comment.populate({path: 'user'});

        res.status(201).json({message: 'Review created successfully', data: comment});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate({path: 'user'})
            .populate({path: 'book'});
        if (!review)
            return res.status(404).json({message: 'Review not found'});
        res.status(200).json({message: 'Review retrieved successfully', data: review});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getReviews = async (req, res) => {
    try {
        const match = {};
        const sort = {createdAt: -1};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 30;
        const skip = (page - 1) * limit;

        if (req.params.book) {
            match['book'] = req.params.book
        }

        const reviews = await Review
            .find(match)
            .populate({path: 'user'})
            .skip(skip)
            .limit(limit)
            .sort(sort);

        const reviewCount = await Review.find(match).countDocuments();
        res.status(200).json({message: 'Reviews retrieved successfully', data: reviews, count: reviewCount});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findOne({_id: req.params.id, user: req.user._id})
            .populate({path: 'user'});

        const existingBook = await Book.findById(review.book);
        if (!existingBook) return res.status(404).json({message: 'Book trailer does not exist'});

        if (!review)
            return res.status(404).json({message: 'Review not found'});

        const updates = Object.keys(req.body);
        const allowedUpdates = ['text', 'rating'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of allowedUpdates) {
            if(key === 'rating'){
                let ratingCategory = 'one';
                switch (parseInt(review.rating)) {
                    case 5:
                        ratingCategory = 'five';
                        break;
                    case 4:
                        ratingCategory = 'four';
                        break;
                    case 3:
                        ratingCategory = 'three';
                        break;
                    case 2:
                        ratingCategory = 'two';
                        break;
                    case 1:
                        ratingCategory = 'one';
                        break;
                }
                existingBook.rating = {
                    count: existingBook.rating.count + 1,
                    total: existingBook.rating.total + req.body.rating,
                    average: (existingBook.rating.total + req.body.rating) / (existingBook.rating.count + 1),
                    details: {...existingBook.rating.details, [ratingCategory]: existingBook.rating.details[ratingCategory] + 1}
                }

                existingBook.rating = {
                    count: existingBook.rating.count - 1,
                    total: existingBook.rating.total - review.rating,
                    average: (existingBook.rating.total - review.rating) / (existingBook.rating.count - 1),
                    details: {...existingBook.rating.details, [ratingCategory]: existingBook.rating.details[ratingCategory] - 1}
                }

            }else{
                review[key] = req.body[key];
            }
        }
        await review.save();
        res.status(200).json({message: 'Review updated successfully', data: review});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findOne({_id: req.params.id, user: req.user._id})
            .populate({path: 'user'})
            .populate({path: 'book'});
        if (!review)
            return res.status(404).json({message: 'Review not found'});
        await review.remove();
        const existingBook = await Book.findById(review.book);
        if (!existingBook) return res.status(404).json({message: 'Book trailer does not exist'});

        let ratingCategory = 'one';
        switch (parseInt(review.rating)) {
            case 5:
                ratingCategory = 'five';
                break;
            case 4:
                ratingCategory = 'four';
                break;
            case 3:
                ratingCategory = 'three';
                break;
            case 2:
                ratingCategory = 'two';
                break;
            case 1:
                ratingCategory = 'one';
                break;
        }

        existingBook.rating = {
            count: existingBook.rating.count - 1,
            total: existingBook.rating.total - review.rating,
            average: (existingBook.rating.total - review.rating) / (existingBook.rating.count - 1),
            details: {...existingBook.rating.details, [ratingCategory]: existingBook.rating.details[ratingCategory] - 1}
        }
        await existingBook.save();

        res.status(200).json({message: 'Review removed successfully', data: review});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}