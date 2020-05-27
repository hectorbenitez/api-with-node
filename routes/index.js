const express = require('express');

const {getCategories, getCategory, createCategory} = require('../controllers/categories');

/**
 * /categories
 * /categories/:categoryId
 * 
 * /categories/:categoryId/questions
 * /question/:questionId
 */

module.exports = () => {
    const router = express.Router();

    router.route('/categories')
        .get(getCategories)
        .post(createCategory);

    router.route('/categories/:slug')
        .get(getCategory);

    router.route('/categories/:slug/questions')
        .get()
        .post();

    router.route('/questions/:questionId')
        .get();

    return router;
};