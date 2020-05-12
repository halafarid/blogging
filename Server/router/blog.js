const Blog = require('../models/blog');
const Author = require('../models/author');

const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middlewares/authentication');

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.find({ authorId: id});
    res.send(blog);
}); 

router.get('/', authenticationMiddleware, async (req, res, next) => {
    const q = req.query;

    if (Object.keys(q).length > 0) {
        const query = Object.keys(req.query)[0];

        if (query === 'name') {
            const author = await Author.find({ $text: { $search: req.query.name } });
            const blogs = await Blog.find({ authorId: author }).populate({
                path: 'authorId',
                select: '_id fullName email age address'
            });
            res.send(blogs);

        } else if (query === 'title') {
            const blogs = await Blog.find({ $text: { $search: req.query.title } }).populate({
                path: 'authorId',
                select: '_id fullName email age address'
            });
            res.send(blogs);
            
        } else if (query === 'tag') {
            const blogs = await Blog.find({ $text: { $search: req.query.tag } }).populate({
                path: 'authorId',
                select: '_id fullName email age address'
            });
            res.send(blogs);
        }
        return;
    }




    // if (q) {
    //     if (q === 'author') {
	// 		let author = await Author.find({ $text: { $search: req.query.name } });
    //         const blogs = await Blog.find({ authorId: author }).populate({
    //             path: 'authorId',
    //             select: '_id fullName email age address'
    //         });
    //         res.send(blogs);

    //     } else if (q === 'blog') {
    //         if (req.query.title) {
    //             const searchTitle = req.query.title.replace(new RegExp('-', 'g'), ' ');
    //             const blogs = await Blog.find( {title: searchTitle } ).populate({
    //                 path: 'authorId',
    //                 select: '_id fullName email age address'
    //             });
    //             res.send(blogs);

    //         } else {
    //             const searchTag = req.query.tag.replace(new RegExp('-', 'g'), ' ');
    //             const blogs = await Blog.find({ tags: searchTag })
    //             res.send(blogs);
    //         }
    //     }
    //     return;
    // }

    const blogs = await Blog.find({}).sort({ updatedAt: -1 }).populate({
        path: 'authorId',
        select: '_id fullName email age address'
    });
    res.json(blogs);
});

// router.get('/?', async (req, res, next) => {

//     const x = Blog.find({ title: { $regex: /3$/ } });
//     console.log(x);

//     // const q = req.query.q;
//     // if (q === 'author') {
//     //     const blog = await Blog.find({}).populate({
//     //         path: 'authorId',
//     //         select: '_id fullName',
//     //     });
//     //     res.json(blog);
//     //     // console.log(blog);
//     // }
//     // console.log(req.query)
//     // const x = req.query.q === 'title';
//     // console.log(x);
// });

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