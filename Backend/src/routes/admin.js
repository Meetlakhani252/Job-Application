const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const {
  login,
  logout,
  me,
  addOpportunity,
  editOpportunity,
  removeOpportunity,
  getAllApplications,
} = require('../controllers/adminController');
const requireAdmin = require('../middleware/requireAdmin');
const validateObjectId = require('../middleware/validateObjectId');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', requireAdmin, me);

router.post('/opportunities', requireAdmin, addOpportunity);
router.put('/opportunities/:id', requireAdmin, validateObjectId, editOpportunity);
router.delete('/opportunities/:id', requireAdmin, validateObjectId, removeOpportunity);

router.get('/applications', requireAdmin, getAllApplications);

module.exports = router;
