const express = require('express');

const {getCategories, getCategory, createCategory} = require('../controllers/categories');
const questionsController = require('./../controllers/questions')

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

    // /categories/movies/questions
    router.route('/categories/:slug/questions')
        .get(questionsController.getQuestionsForCategory)
        .post(questionsController.createQuestion);

    router.route('/questions/:questionId')
        .get();

    return router;
};