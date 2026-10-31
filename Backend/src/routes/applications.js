const { Router } = require('express');
const { submitApplication, getApplication, listMyApplications } = require('../controllers/applicationController');
const requireUser = require('../middleware/requireUser');

const router = Router();

// Only authenticated users can submit applications or track them
router.post('/', requireUser, submitApplication);
router.get('/:applicationId', requireUser, getApplication);
router.get('/my', requireUser, listMyApplications);

module.exports = router;
