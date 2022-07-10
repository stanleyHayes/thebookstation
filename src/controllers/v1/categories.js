const Category = require("./../../models/v1/category");

exports.createCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const existingCategory = await Category.findOne({name});
        if(existingCategory)
            return res.status(409).json({message: 'Category already exists'});
        const category = await Category.create({name});
        res.status(201).json({message: 'Category created successfully', data: category});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category)
            return res.status(404).json({message: 'Category not found'});
        res.status(200).json({message: 'Category retrieved successfully', data: category});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({message: 'Categories retrieved successfully', data: categories});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}