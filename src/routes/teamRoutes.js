const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.get('/', teamController.getAllTeams);
router.get('/champion', teamController.getChampionTeam);
router.get('/second-place', teamController.getSecondPlaceTeam);
router.get('/third-place', teamController.getThirdPlaceTeam);
router.get('/most-goals', teamController.getTeamsWithMostGoals);
router.get('/most-fouls-suffered', teamController.getTeamsWithMostFoulsSuffered);
router.get('/:teamName', teamController.getTeamByName);

module.exports = router;
