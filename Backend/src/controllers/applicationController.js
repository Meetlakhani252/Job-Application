const { supabase } = require('../config/db');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/response');

exports.submitApplication = async (req, res) => {
  const userId = req.user.id;
  const { opportunityId, message } = req.body;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('full_name, phone, email')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    throw new AppError('User profile not found. Please complete your profile first.', 404);
  }

  const { createApplication } = require('../services/applicationService');
  try {
    const { applicationId } = await createApplication({
      userId,
      name: profile.full_name,
      phone: profile.phone,
      email: profile.email,
      opportunityId,
      resumeLink: null, // Will be handled by storage upload later
      message,
    });

    sendSuccess(res, { applicationId }, 'Application submitted successfully');
  } catch (error) {
    throw error;
  }
};

exports.getApplication = async (req, res) => {
  const userId = req.user.id;
  const { applicationId } = req.params;

  const { getApplicationByApplicationId } = require('../services/applicationService');
  const application = await getApplicationByApplicationId(userId, applicationId);
  sendSuccess(res, application);
};

exports.listMyApplications = async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      opportunity (id, title, company_name)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new AppError(error.message, 500);
  }

  const formattedApps = data.map(app => ({
    id: app.id,
    applicationId: app.application_code,
    name: app.name,
    phone: app.phone,
    email: app.email,
    resumeLink: app.resume_link,
    message: app.message,
    status: app.status || 'Pending',
    createdAt: app.created_at,
    opportunity: {
      _id: app.opportunity.id,
      title: app.opportunity.title,
      companyName: app.opportunity.company_name,
    }
  }));

  sendSuccess(res, formattedApps);
};

