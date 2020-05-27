const mongoose = require('mongoose');
const {Schema} = mongoose;

const QuestionSchema = new Schema({
    categorySlug: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Question', QuestionSchema);