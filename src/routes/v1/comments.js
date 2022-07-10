const express = require("express");
const {authenticate} = require("../../middleware/v1/authenticate");
const {createComment, deleteComment, getComment, getComments, updateComment} = require("../../controllers/v1/comments");

const router = express.Router({mergeParams: true});

router.route('/').post(authenticate, createComment).get(getComments);
router.route('/:id').get(getComment).put(authenticate, updateComment).delete(authenticate, deleteComment);

module.exports = router;