const Blog = require('../models/blog');
const Author = require('../models/author');

const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middlewares/authentication');

router.get('/:id', async (req, res, next) => {
    const pageNo = parseInt(req.query.pageNo);
    const size = parseInt(req.query.size);
    const { id } = req.params;

    const blog = await Blog.find({ authorId: id}).skip(size * (pageNo - 1)).limit(size);
    res.send(blog);
}); 

router.get('/', 
    async (req, res, next) => {
        if (req.query.q) 
            return authenticationMiddleware;
        next();
    }, 
    
    async (req, res, next) => {
        const q = req.query;
        const pageNo = parseInt(q.pageNo);
        const size = parseInt(q.size);

        const query = Object.keys(q)[0];

        if (query === 'name') {
            const author = await Author.find({ $text: { $search: q.name } });
            const blogs = await Blog.find({ authorId: author }).populate({
                path: 'authorId',
                select: '_id fullName email age address'
            });
            res.send(blogs);

        } else if (query === 'title' || query === 'tag') {
            const blogs = await Blog.find({ $text: { $search: q[query] } }).populate({
                path: 'authorId',
                select: '_id fullName email age address'
            });
            res.send(blogs);
            
        } else {
            const blogs = await Blog.find({}).sort({ updatedAt: -1 }).skip(size * (pageNo - 1)).limit(size).populate({
                path: 'authorId',
                select: '_id fullName email age address'
            })
            res.json(blogs);
        }
});

router.post('/', authenticationMiddleware, async (req, res, next) => {
    req.body.authorId= req.author._id;
    const blog = new Blog(req.body);
    await blog.save();
    res.send(blog);
});

router.patch('/:id', authenticationMiddleware, async (req, res, next) => {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(id, req.body,
        { new: true, omitUndefined: true, runValidators: true }
    );
    
    res.send(blog);
});

router.delete('/:id', authenticationMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    res.send(blog);
});

module.exports = router;