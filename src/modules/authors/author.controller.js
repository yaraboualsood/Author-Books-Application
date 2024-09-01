import authorModel from "../../../DB/models/author.model.js"
import { asyncHandler } from "../../../utils/globalErrorHandling.js";
import jwt from "jsonwebtoken";


//ADD AUTHOR
export const addAuthor = asyncHandler(async (req, res, next) =>{

    const {name, bio, birthDate} = req.body

    const author = await authorModel.create({name, bio, birthDate})
    const token = jwt.sign({ authorId: author._id }, "yara");
    res.status(201).json({ message: "author added successfully", author, token});

})

//UPDATE AUTHOR
export const updateAuthor = asyncHandler(async (req, res, next) =>{

    const {name, bio, birthDate} = req.body
    const updatedAuthor = await authorModel.findByIdAndUpdate(req.author._id, {name, bio, birthDate}, { new: true })
    // const updatedAuthor = await authorModel.findByIdAndUpdate(req.params.id, {name, bio, birthDate}, { new: true })
    res.status(200).json({ message: "successfully updated", updatedAuthor })

})

//DELETE AUTHOR
export const deleteAuthor = asyncHandler(async (req, res, next) =>{

    const deletedAuthor = await authorModel.findByIdAndDelete(req.author._id, { new: true })
    // const deletedAuthor = await authorModel.findByIdAndDelete(req.params.id, { new: true })
    res.status(200).json({ message: "successfully deleted", deletedAuthor })

})

//GET ALL AUTHORS WITH PAGINATION AND SEARCH
export const getAllAuthors = asyncHandler(async (req, res, next) =>{

    const {page, limit, name , bio} = req.query
    // page  skip  limit =2
    // 1       0
    // 2       2
    // 3       4

    const query = {};
    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }
    else if (bio) {
        query.bio = { $regex: bio, $options: 'i' };
    }

    const authors = await authorModel.find(query).populate("books").skip((page-1) * limit ).limit(limit || 2)
    if (!authors.length){
        return next(new Error('no authors found', 404))
    }
    res.status(200).json({ authors })
   
   
})

//GET AUTHOR BY ID
export const getAuthorByID = asyncHandler(async (req, res, next) =>{   

    const author = await authorModel.findById(req.params.id)
    if(!author) {
        return next(new Error('no author found', 404))
    }
    res.status(200).json({ author })
})