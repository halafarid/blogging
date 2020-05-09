const CustomError = require('../helpers/customError');

module.exports = async (req, res, next) => {
    const { id: authorId } = req.params;
    if (req.author._id != authorId ) throw CustomError(401, "You have no permission");
    next();
}