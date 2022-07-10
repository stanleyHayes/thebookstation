const express = require("express");
const {createCategory, getCategory, getCategories} = require("../../controllers/v1/categories");

const router = express.Router({mergeParams: true});

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getCategory);

module.exports = router;