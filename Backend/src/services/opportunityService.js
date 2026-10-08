const Opportunity = require('../models/Opportunity');
const escapeRegex = require('../utils/escapeRegex');
const { DOMAINS } = require('../constants');
const AppError = require('../utils/AppError');

const listOpportunities = async ({ search, domain } = {}) => {
  const query = {};

  if (search) {
    query.title = { $regex: escapeRegex(search.trim()), $options: 'i' };
  }

  if (domain) {
    if (!DOMAINS.includes(domain)) {
      throw new AppError(`Invalid domain. Allowed values: ${DOMAINS.join(', ')}`, 400);
    }
    query.domain = domain;
  }

  return Opportunity.find(query).sort({ createdAt: -1 }).lean();
};

const getOpportunityById = async (id) => {
  const opportunity = await Opportunity.findById(id).lean();
  if (!opportunity) {
    throw new AppError('Opportunity not found', 404);
  }
  return opportunity;
};

const createOpportunity = async (data) => {
  const opportunity = await Opportunity.create(data);
  return opportunity.toObject();
};

const updateOpportunity = async (id, updates) => {
  const opportunity = await Opportunity.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  ).lean();

  if (!opportunity) {
    throw new AppError('Opportunity not found', 404);
  }

  return opportunity;
};

const deleteOpportunity = async (id) => {
  const opportunity = await Opportunity.findByIdAndDelete(id);
  if (!opportunity) {
    throw new AppError('Opportunity not found', 404);
  }
};

module.exports = {
  listOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
