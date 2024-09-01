import mongoose, { Schema, model } from "mongoose";


const bookSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        // ref: 'Author',
    },
    publishedDate: {
        type: Date,
        default: Date.now(),
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    },
}, {
    versionKey:false
})

const bookModel = model("Book", bookSchema)

export default bookModel;