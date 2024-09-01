import jwt from "jsonwebtoken"
import authorModel from "../../DB/models/author.model.js"


export const auth = () => {
    return async (req, res, next) => {

        try {
            const { token } = req.headers
            if (!token) {
                return res.status(400).json({ msg: "token not found" })
            }

            if (!token.startsWith("yara")) {
                return res.status(401).json({ msg: "invalid token" })
            }

            const newToken = token.split("yara")[1]
            if (!newToken) {
                return res.status(400).json({ msg: "invalid token format" })
            }

            const decoded = jwt.verify(newToken, "yara")

            if (!decoded?.authorId) {
                return res.status(401).json({ msg: "invalid payload" })
            }
            const author = await authorModel.findById(decoded.authorId)
   
            if (!author) { 
                return res.status(400).json({ msg: "author not found" })
            }
 
            req.author = author
            next()
        
        } catch (error) {
            
            return res.status(404).json({ message: "catch error", error })
        }


    }
}