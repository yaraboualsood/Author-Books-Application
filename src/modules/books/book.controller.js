import authorModel from "../../../DB/models/author.model.js"
import bookModel from "../../../DB/models/book.model.js"
import { asyncHandler } from "../../../utils/globalErrorHandling.js"

//ADD BOOKS
export const createBook = asyncHandler(async (req, res, next) => {
    const { title, content, publishedDate } = req.body
    const authorExist = await authorModel.findById(req.author._id)

    if (!authorExist) {
        return next(new Error('invalid author ID', 404))
    }
    const book = await bookModel.create({
        title, content, publishedDate, author: authorExist.name, addedBy: req.author._id
    })

    authorExist.books.push(book)
    await authorExist.save()

    return res.status(200).json({ msg: "books added successfully", book })

})

//GET ALL BOOKS
export const getAllBooks = asyncHandler(async (req, res, next) => {
    const { page, limit, title, author } = req.query

    const query = {};
    if (title) {
        query.name = { $regex: title, $options: 'i' };
    }
    else if (author) {
        query.author = { $regex: author, $options: 'i' };
    }

    const books = await bookModel.find(query).skip((page - 1) * limit).limit(limit || 2)
    if (!books.length) {
        return next(new Error('no books found', 404))
    }
    res.status(200).json({ msg: "books retrieved successfully", books })
})

//GET BOOK BY ID
export const getBook = asyncHandler(async (req, res, next) => {
    const book = await bookModel.findById(req.params.bookId)
    if (!book) {
        return next(new Error('Book not found', 404))
    }
    res.status(200).json({ msg: "book retrieved successfully", book })
})


//UPDATE BOOK
export const updateBook = asyncHandler(async (req, res, next) => {
    const { title, content, publishedDate } = req.body
    const { bookId } = req.params


    const updatedBook = await bookModel.findOneAndUpdate({ _id: bookId, addedBy: req.author._id }, {
        title,
        content,
        publishedDate
    }, { new: true })

    if (!updatedBook) {
        return next(new Error('Book not found', 404))
    }
    res.status(200).json({ message: "book updated successfully", updatedBook })
})



//DELETE BOOK
export const deleteBook = asyncHandler(async (req, res, next) => {
    // const { authorId } = req.body
    const { bookId } = req.params

    const authorExist = await authorModel.findById(req.author._id)
    if (!authorExist) {
        return next(new Error('invalid author ID', 404))
    }

    const { deletedCount } = await bookModel.deleteOne({ _id: bookId, addedBy: req.author._id })
    if (!deletedCount) {
        return next(new Error('Book not found', 404))

    }
    authorExist.books.pull(bookId)
    await authorExist.save()

    return res.status(200).json({ msg: "books deleted successfully" })
})