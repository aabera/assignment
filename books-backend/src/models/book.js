const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        length: 13,
        required: true,
        //if book is not unique then it will give error mesage
        unique:[true,'book must be unique']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image:{
        type: Buffer
    }
},{
    timestamps: true
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book