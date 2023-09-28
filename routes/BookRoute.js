import express from "express";
import {
    getBook, 
} from "../controller/BookController.js";
 
const router = express.Router();
 
router.get('/book', getBook);
 
export default router;