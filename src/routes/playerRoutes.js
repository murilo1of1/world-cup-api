const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

router.get('/top-scorer', playerController.getTopScorer);
router.get('/team/:teamName', playerController.getPlayersByTeam);
router.get('/club/:clubName', playerController.getPlayersByClub);
router.get('/:playerName', playerController.getPlayerByName);
router.get('/', playerController.getAllPlayers);

module.exports = router;
