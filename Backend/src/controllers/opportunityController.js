const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/response');
const { listOpportunities, getOpportunityById } = require('../services/opportunityService');

exports.getOpportunities = asyncHandler(async (req, res) => {
  const { search, domain } = req.query;

  const allowed = new Set(['search', 'domain']);
  const unknown = Object.keys(req.query).filter((k) => !allowed.has(k));
  if (unknown.length > 0) {
    throw new AppError(`Unknown query parameter(s): ${unknown.join(', ')}`, 400);
  }

  const opportunities = await listOpportunities({ search, domain });
  sendSuccess(res, opportunities);
});

exports.getOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await getOpportunityById(req.params.id);
  sendSuccess(res, opportunity);
});
