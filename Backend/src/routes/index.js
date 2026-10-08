const { Router } = require('express');
const opportunityRouter = require('./opportunities');
const applicationRouter = require('./applications');
const adminRouter = require('./admin');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/opportunities', opportunityRouter);
router.use('/applications', applicationRouter);
router.use('/admin', adminRouter);

module.exports = router;
