
import { Router } from "express";
import * as AC from "./author.controller.js"
import { auth } from "../../middleware/auth.js";


const router = Router() 

//ADD AUTHOR
router.post('/', AC.addAuthor)

//UPDATE AUTHOR
router.put('/', auth() ,AC.updateAuthor)

//DELETE AUTHOR
router.delete('/',auth() ,AC.deleteAuthor)

//GET ALL AUTHORS
router.get('/', AC.getAllAuthors)

//GET AUTHOR BY ID
router.get('/:id', AC.getAuthorByID)


export default router