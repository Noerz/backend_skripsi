const express = require("express");
const { getDivisi, createDivisi, updateDivisi } = require("../controller/DivisiController");

const router = express.Router();

const divisiRoutes = (router) => {
    router.get('/divisi', getDivisi);
    router.post('/divisi', createDivisi);
    router.patch('/divisi/:id', updateDivisi);
}

module.exports = {divisiRoutes};