const Blog = require('../models/blog');
const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middlewares/authentication');

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.find({ authorId: id});
    res.send(blog);
}); 

router.get('/', async (req, res, next) => {
    const blogs = await Blog.find({}).populate({
        path: 'authorId',
        select: '_id fullName email age address'
    });
    res.json(blogs);
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