const { Router } = require('express');
const { getOpportunities, getOpportunity } = require('../controllers/opportunityController');

const router = Router();

router.get('/', getOpportunities);
router.get('/:id', getOpportunity);

module.exports = router;
