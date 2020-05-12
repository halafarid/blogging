const mongoose = require('mongoose');
const _ = require('lodash');

const BlogSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform: doc => {
            return _.pick(doc, ['_id', 'title', 'body', 'tags', 'authorId', 'createdAt', 'updatedAt'])
        }
    }
});

BlogSchema.index({ title: 'text', tags: 'text' });

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;