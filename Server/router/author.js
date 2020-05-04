const Author = require('../models/author');
const express = require('express');
const router = express.Router();
const CustomError = require('../helpers/customError');

const authenticationMiddleware = require('../middlewares/authentication');
const validationMiddleware = require('../middlewares/validation');
const { check } = require('express-validator');

let validations = [
    check('password').isLength({ min: 6}).withMessage('Password must be at least 6 characters!'),
    check('email').isEmail().withMessage('Ivalid email!')
];

router.get('/', async (req, res, next) => {
    const authors = await Author.find();
    res.json(authors);
});

router.patch('/:id', authenticationMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const { fullName, email, password, age } = req.body;
    const author = await Author.findByIdAndUpdate(id,
        { fullName, email, password, age },
        { new: true, omitUndefined: true, runValidators: true }
    );
    res.json(author);
});

router.delete('/:id', authenticationMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const author = await Author.findOneAndDelete(id);
    res.json(author);
});

router.post('/registeration', validationMiddleware(validations[0], validations[1]), async (req, res, next) => {
    const { fullName, email, password, age } = req.body;
    const author = new Author({ fullName, email, password, age });

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
    const author = await Author.findById(id);
    res.send(author);
});

router.get('/profile', authenticationMiddleware, async (req, res, next) => {
    res.send('<h1>This is my profile</h1>');
});

module.exports = router;