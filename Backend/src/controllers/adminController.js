const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendSuccess, sendError } = require('../utils/response');
const { verifyAdminCredentials, getAdminById } = require('../services/authService');
const {
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require('../services/opportunityService');
const { listAllApplications } = require('../services/applicationService');
const { OPPORTUNITY_ALLOWED_FIELDS } = require('../constants');

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const adminId = await verifyAdminCredentials(email, password);
  req.session.adminId = adminId;
  sendSuccess(res, null, 'Logged in successfully');
});

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return sendError(res, 'Logout failed', 500);
    }
    res.clearCookie('connect.sid');
    sendSuccess(res, null, 'Logged out successfully');
  });
};

exports.me = asyncHandler(async (req, res) => {
  const admin = await getAdminById(req.session.adminId);
  sendSuccess(res, admin);
});

exports.addOpportunity = asyncHandler(async (req, res) => {
  const { title, companyName, type, domain, location, experience, description, applicationLink } = req.body;

  if (!title || !companyName || !type || !domain || !location || !experience || !description || !applicationLink) {
    throw new AppError('All opportunity fields are required', 400);
  }

  const opportunity = await createOpportunity({
    title, companyName, type, domain, location, experience, description, applicationLink,
  });

  sendSuccess(res, opportunity, 'Success', 201);
});

exports.editOpportunity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = {};

  for (const field of OPPORTUNITY_ALLOWED_FIELDS) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError('No valid fields to update', 400);
  }

  const opportunity = await updateOpportunity(id, updates);
  sendSuccess(res, opportunity);
});

exports.removeOpportunity = asyncHandler(async (req, res) => {
  await deleteOpportunity(req.params.id);
  sendSuccess(res, null, 'Opportunity deleted successfully');
});

exports.getAllApplications = asyncHandler(async (req, res) => {
  const applications = await listAllApplications();
  sendSuccess(res, applications);
});
