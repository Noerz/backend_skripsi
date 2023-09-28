import express from "express";
import {
    getStruktur, 
    getStrukturById,
    createStruktur,
    updateStruktur,
    deleteStruktur
} from "../controller/StrukturController.js";
 
const router = express.Router();
 
router.get('/struktur', getStruktur);
router.get('/struktur/:id',getStrukturById);
router.post('/struktur',createStruktur);
router.patch('/struktur',updateStruktur);
router.delete('/struktur/:id',deleteStruktur);
 
export default router;