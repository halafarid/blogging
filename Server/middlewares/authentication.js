const CustomError = require('../helpers/customError');
const Author = require('../models/author');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) throw CustomError(401, 'You must login first!');

    const currentAuthor = await Author.getCurrentAuthor(token);
    req.author = currentAuthor;
    next();
}