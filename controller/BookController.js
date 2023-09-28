import book from "../models/BookModel.js";

export const getBook = async(req, res) =>{
    try {
        const response = await book.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 