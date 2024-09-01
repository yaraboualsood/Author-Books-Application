import mongoose, { Schema, model } from "mongoose";


const authorSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    books: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book',
        },
    ],
},
    {
        versionKey: false
    })

const authorModel = model("Author", authorSchema)

export default authorModel;