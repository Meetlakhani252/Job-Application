const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const AppError = require('../utils/AppError');
const generateApplicationId = require('../utils/generateApplicationId');

const createApplication = async ({ name, phone, email, opportunityId, resumeLink, message }) => {
  const opportunityExists = await Opportunity.exists({ _id: opportunityId });
  if (!opportunityExists) {
    throw new AppError('Opportunity not found', 404);
  }

  let applicationId = generateApplicationId();
  const collision = await Application.exists({ applicationId });
  if (collision) {
    applicationId = generateApplicationId();
  }

  try {
    const application = await Application.create({
      applicationId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      resumeLink: resumeLink?.trim() || undefined,
      message: message?.trim() || undefined,
      opportunity: opportunityId,
    });

    return { applicationId: application.applicationId };
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email && error.keyPattern?.opportunity) {
      throw new AppError('You have already applied to this opportunity', 409);
    }
    throw error;
  }
};

const getApplicationByApplicationId = async (applicationId) => {
  const application = await Application.findOne({ applicationId })
    .populate('opportunity')
    .lean();

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  return application;
};

const listAllApplications = async () => {
  return Application.find()
    .sort({ createdAt: -1 })
    .populate('opportunity', 'title companyName')
    .lean();
};

module.exports = { createApplication, getApplicationByApplicationId, listAllApplications };
