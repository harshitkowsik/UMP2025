const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createSolution, getSolutionsByQuery } = require('../controllers/solutionController');

router.post('/', auth, createSolution);
router.get('/:queryId', getSolutionsByQuery);

module.exports = router;
