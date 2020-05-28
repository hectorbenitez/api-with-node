const express = require('express');

const {getCategories, getCategory, createCategory} = require('../controllers/categories');
const questionsController = require('./../controllers/questions')

function paginationMiddleware(req, res, next) {
    let { page = 1, limit = 15 } = req.query;

    if (page < 1) {
        return res.status(400).send('La pagina debe ser mayor o igual a 1');
    }

    req.pagination = {page, limit};

    next();
}

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
        .get(paginationMiddleware, getCategories)
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