const express = require("express");
const { getStruktur } = require("../controller/DivisiController");

const router = express.Router();

router.get('/struktur', getStruktur);

module.exports = router;