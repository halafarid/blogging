const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const util = require('util');
const CustomError = require('../helpers/customError');

const jwtSecret = process.env.JWT_KEY_SECRET;
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

const authorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,
        required: false
    }, 
    address: {
        type: String,
        required: true,
        maxlength: 256
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }]
}, {
    timestamps: true,
    toJSON: {
        transform: doc => {
            return _.pick(doc, ['_id', 'fullName', 'email', 'age', 'address', 'following', 'blogs']);
        }
    },
});

authorSchema.virtual('blogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'authorId'
});

sign({authorId: ''}, jwtSecret)
    .then( token => console.log(token) )
    .catch( err => next() );

verify('token', jwtSecret)
    .then( req => req.author = author)
    .catch( err => next() );


// To Encrypt the password
authorSchema.pre('save', async function() {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 7)
});

// To Check the password is correct!
authorSchema.methods.comparePassword = function(pass) {
    return bcrypt.compare(pass, this.password);
};

authorSchema.methods.compareEmail = async function(em) {
    return await Author.find( { email: em });
}

authorSchema.methods.generateToken = function() {
    return sign({authorId: this.id}, jwtSecret)
};

authorSchema.statics.getCurrentAuthor = async function(token) {
    const payload = jwt.verify(token, jwtSecret);
    const currentAuthor = await Author.findById(payload.authorId);

    if (!currentAuthor) throw CustomError(404, 'User Not Found!');
    return currentAuthor;
}

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;