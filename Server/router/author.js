const Author = require('../models/author');
const express = require('express');
const router = express.Router();
const CustomError = require('../helpers/customError');

const authenticationMiddleware = require('../middlewares/authentication');
const authorizationMiddleware = require('../middlewares/authorization');
const validationMiddleware = require('../middlewares/validation');
const { check } = require('express-validator');

let validations = [
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters!'),
    check('email').isEmail().withMessage('Ivalid email!')
];

router.get('/', async (req, res, next) => {
    const authors = await Author.find().populate('blogs');
    res.json(authors);
});

router.patch('/:id', authenticationMiddleware, authorizationMiddleware, async (req, res, next) => {
    const { id } = req.params;

    const { fullName, email, password, age, address } = req.body;
    const author = await Author.findByIdAndUpdate(id,
        { fullName, email, password, age, address },
        { new: true, omitUndefined: true, runValidators: true }
    );
    res.json(author);
});

router.delete('/:id', authenticationMiddleware, authorizationMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const author = await Author.findOneAndDelete(id);
    res.json(author);
});

router.post('/registeration', validationMiddleware(validations[0], validations[1]), async (req, res, next) => {
    const author = new Author(req.body);

    await author.compareEmail(email);
    await author.save();
    res.json(author);
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const author = await Author.findOne({ email });

    if (!author) throw CustomError(404, 'Sorry, Email or Password is incorrect!');

    const match = await author.comparePassword(password);
    if (!match) throw CustomError(404, 'Sorry, Email or Password is incorrect!');

    const token = await author.generateToken();
    res.json({ author, token });
});

router.get('/profile/:id', authenticationMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const author = await Author.findById(id).populate('blogs');
    res.send(author);
});

router.get('/profile', authenticationMiddleware, async (req, res, next) => {
    const currentWithBlogs = await Author.findById(req.author._id).populate('blogs');
    res.send(currentWithBlogs);
});

router.post('/:id/follows', authenticationMiddleware, async (req, res, next) => {
    const { id } = req.params;

    if (req.author._id.toString() !== id && !req.author.following.some(authID => authID.toString() === id))
        await Author.updateOne( {_id: req.author._id},  { $push: { following: id } });
    else
        await Author.updateOne( {_id: req.author._id},  { $pull: { following: id } });

    res.send(req.author);
});

router.get('/following', authenticationMiddleware, async (req, res, next) => {
    const myFollowing = await Author.findById(req.author._id).populate('following');
    res.send(myFollowing);
});

router.get('/followers', authenticationMiddleware, async (req, res, next) => {
    const myFollowers = await Author.find({following: req.author._id});
    res.send(myFollowers);
});
module.exports = router;