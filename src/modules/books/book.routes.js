import { Router } from "express";
import * as BC from "./book.controller.js"
import { auth } from "../../middleware/auth.js";

const router = Router() 

//ADD BOOKS
router.post('/', auth() ,BC.createBook)

//GET ALL BOOKS
router.get('/', BC.getAllBooks)

//GET SINGLE BOOK
router.get('/:bookId', BC.getBook)

//UPDATE BOOK
router.put('/:bookId', auth(), BC.updateBook)

//DELETE BOOK
router.delete('/:bookId', auth() ,BC.deleteBook)


export default router