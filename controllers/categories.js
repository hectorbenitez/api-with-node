const CategoryModel = require('../models/category');

// GET /categories
function getCategories(req, res) {
    CategoryModel.find({}).then((categories) => {
        res.send(categories);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}

// POST /categories
function createCategory(req, res) {
    const {body} = req;

    CategoryModel.create(body).then((category) => {
        res.status(201).send(category);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}

// GET /categories/:categoryId
function getCategory(req, res) {
    const {slug} = req.params;
    // const categoryId = req.params.categoryId;

    CategoryModel.findOne({
        slug,
    }).then((category) => {
        if (category) {
            return res.send(category);
        }

        res.sendStatus(404);
        // res.status(404).send('Category not found');
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}

module.exports = {
    getCategory,
    getCategories,
    createCategory,
}
