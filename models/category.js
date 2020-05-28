const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('category', CategorySchema);