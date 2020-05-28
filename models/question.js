const mongoose = require('mongoose');
const {Schema} = mongoose;

const QuestionSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Question', QuestionSchema);