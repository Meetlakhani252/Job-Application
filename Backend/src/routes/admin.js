const { Router } = require('express');
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
const { sendError } = require('../utils/response');

const router = Router();

// Login does not require admin session
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/me', requireAdmin, me);
router.post('/opportunities', requireAdmin, addOpportunity);
router.put('/opportunities/:id', requireAdmin, editOpportunity);
router.delete('/opportunities/:id', requireAdmin, removeOpportunity);
router.get('/applications', requireAdmin, getAllApplications);

module.exports = router;
