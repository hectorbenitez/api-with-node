const CategoryModel = require('../models/category');

// GET /categories?page=1&limit=15
function getCategories(req, res) {
    
    const { page, limit } = req.pagination;
    const sortData = {};

    if (req.query.sort) {
        if (req.query.order === 'descending') {
            sortData[req.query.sort] = -1;
        } else {
            sortData[req.query.sort] = 1;
        }
    }

    CategoryModel.find({})
    .limit(Number(limit))
    .skip((page - 1) * Number(limit))
    .sort(sortData).then(async (categories) => {
        const count = await CategoryModel.countDocuments();

        res.send({
            totalResults: count,
            results: categories,
            nextPage: `http://localhost:3000/api/categories?page=${Number(page) + 1}&limit=3`,
            previousPage: `http://localhost:3000/api/categories?page=${Number(page) - 1}&limit=3`,
        });
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
