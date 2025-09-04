const express = require("express");
const router = express.Router();
const { getBingoData } = require("../controllers/bingoController");

// Rota para obter dados do bingo
router.get("/data", getBingoData);

module.exports = router;
