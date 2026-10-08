const { Router } = require('express');
const { getOpportunities, getOpportunity } = require('../controllers/opportunityController');
const validateObjectId = require('../middleware/validateObjectId');

const router = Router();

router.get('/', getOpportunities);
router.get('/:id', validateObjectId, getOpportunity);

module.exports = router;
