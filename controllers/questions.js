const Category = require('./../models/category')
const Question = require('./../models/question')

async function getQuestionsForCategory (req, res) {
  const category = await Category.findOne({
    slug: req.params.slug
  })

  if (!category) {
    return res.sendStatus(404)
  }

  await category.populate('questions').execPopulate()
  res.send(category.questions)
}

async function createQuestion (req, res) {
  const category = await Category.findOne({
    slug: req.params.slug
  })

  if (!category) {
    return res.status(400).send({
      message: 'Category not found'
    })
  }

  const questionData = req.body
  questionData.category = category._id

  const question = await Question.create(questionData)
  category.questions.push(question._id)
  await category.save()
  res.send(question)
}

module.exports = {
  createQuestion,
  getQuestionsForCategory
}