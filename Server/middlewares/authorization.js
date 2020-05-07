const CustomError = require('../helpers/customError');
const Author = require('../models/author');

module.exports = async (req, res, next) => {
    const { id: authorId } = req.params;
    const token = req.headers.authorization;
    const { id: currentId } =  await Author.getCurrentAuthor(token);

    if (currentId != authorId ) throw CustomError(401, "You have no permission");
    next();
}