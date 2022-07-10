const express = require("express");
const {authenticate} = require("../../middleware/v1/authenticate");
const {deleteReview, updateReview, getReview, getReviews, createReview} = require("../../controllers/v1/reviews");

const router = express.Router({mergeParams: true});

router.route('/').post(authenticate, createReview).get(getReviews);
router.route('/:id').get(getReview).put(authenticate, updateReview).delete(authenticate, deleteReview);

module.exports = router;