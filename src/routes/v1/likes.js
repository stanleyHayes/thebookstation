const express = require("express");
const {authenticate} = require("../../middleware/v1/authenticate");
const {getLike, getLikes, toggleLike} = require("../../controllers/v1/likes");

const router = express.Router({mergeParams: true});

router.route('/').post(authenticate, toggleLike).get(getLikes);
router.route('/:id').get(getLike);

module.exports = router;