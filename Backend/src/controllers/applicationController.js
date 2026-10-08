const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/response');
const validateApplicationBody = require('../validators/applicationValidator');
const { createApplication, getApplicationByApplicationId } = require('../services/applicationService');
const { APP_ID_REGEX } = require('../constants');

exports.submitApplication = asyncHandler(async (req, res) => {
  validateApplicationBody(req.body);

  const { name, phone, email, opportunityId, resumeLink, message } = req.body;

  const result = await createApplication({ name, phone, email, opportunityId, resumeLink, message });

  sendSuccess(res, { applicationId: result.applicationId }, 'Application submitted', 201);
});

exports.getApplication = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;

  if (!APP_ID_REGEX.test(applicationId)) {
    return sendError(res, 'Invalid application ID format', 400);
  }

  const application = await getApplicationByApplicationId(applicationId.toUpperCase());
  sendSuccess(res, application);
});
