import express from 'express'
import connectionDB from './DB/connectionDB.js'
import bookRouter from './src/modules/books/book.routes.js'
import authorRouter from './src/modules/authors/author.routes.js'
import { AppError } from './utils/classError.js'
import { globalErrorHandler } from './utils/globalErrorHandling.js'

const app = express()
const port = 3000

connectionDB()

app.use(express.json())

app.use("/author", authorRouter)

app.use("/book", bookRouter)

app.use('*', (req, res, next) => {
    return next(new AppError(`Invalid url: ${req.originalUrl}`, 404))
})

//global error handling middleware
app.use(globalErrorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))