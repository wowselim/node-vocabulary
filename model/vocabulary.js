const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabularySchema = new Schema({
    native: {
        type: String,
        required: true
    },
    foreign: {
        type: String,
        required: true
    },
    tags: [{
        type: Date,
        required: false
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Vocabulary', VocabularySchema);
