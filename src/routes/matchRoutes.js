const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

router.get('/', matchController.getAllMatches);
router.get('/group/:groupName', matchController.getMatchesByGroup);
router.get('/:id', matchController.getMatchById);

module.exports = router;
