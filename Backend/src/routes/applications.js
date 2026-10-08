const { Router } = require('express');
const { submitApplication, getApplication } = require('../controllers/applicationController');

const router = Router();

router.post('/', submitApplication);
router.get('/:applicationId', getApplication);

module.exports = router;
