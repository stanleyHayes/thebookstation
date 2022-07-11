const express = require("express");
const {authenticate} = require("../../middleware/v1/authenticate");
const {createBook, getBooks, getBook, updateBook, deleteBook} = require("../../controllers/v1/books");

const router = express.Router({mergeParams: true});

const commentsRouter = require("./comments");
const likesRouter = require("./likes");

router.get('/:book/comments', commentsRouter);
router.post('/:book/likes', likesRouter);

router.route('/').post(authenticate, createBook).get(getBooks);
router.route('/:id').get(getBook).put(authenticate, updateBook).delete(authenticate, deleteBook);

module.exports = router;