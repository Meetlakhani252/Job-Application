const { supabase } = require('../config/db');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/response');
const {
  createApplication,
  getApplicationByApplicationId,
  getPublicApplicationByCode,
} = require('../services/applicationService');
const validateApplicationBody = require('../validators/applicationValidator');

exports.submitApplication = async (req, res) => {
  const userId = req.user.id;
  const { opportunityId, message, resumeLink } = req.body;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('full_name, phone, email')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    throw new AppError('User profile not found. Please complete your profile first.', 404);
  }

  // Validate the application payload with profile data
  validateApplicationBody({
    name: profile.full_name,
    phone: profile.phone,
    email: profile.email,
    opportunityId,
  });

  const { applicationId } = await createApplication({
    userId,
    name: profile.full_name,
    phone: profile.phone,
    email: profile.email,
    opportunityId,
    resumeLink: resumeLink || null,
    message,
  });

  sendSuccess(res, { applicationId }, 'Application submitted successfully');
};

exports.getApplication = async (req, res) => {
  const userId = req.user.id;
  const { applicationId } = req.params;

  const application = await getApplicationByApplicationId(userId, applicationId);
  sendSuccess(res, application);
};

exports.getPublicApplication = async (req, res) => {
  const { applicationId } = req.params;
  if (!applicationId || applicationId.trim() === '') {
    throw new AppError('Application ID is required', 400);
  }
  const application = await getPublicApplicationByCode(applicationId.trim());
  sendSuccess(res, application);
};

exports.listMyApplications = async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new AppError(error.message, 500);
  }

  const oppIds = [...new Set((data || []).map(a => a.opportunity_id).filter(Boolean))];
  let oppMap = {};
  if (oppIds.length > 0) {
    const { data: opps } = await supabase
      .from('opportunities')
      .select('id, title, company_name')
      .in('id', oppIds);
    (opps || []).forEach(o => { oppMap[o.id] = o; });
  }

  const formattedApps = (data || []).map(app => {
    const opp = oppMap[app.opportunity_id];
    return {
      id: app.id,
      applicationId: app.application_code,
      name: app.name,
      phone: app.phone,
      email: app.email,
      resumeLink: app.resume_link,
      message: app.message,
      status: app.status || 'Pending',
      createdAt: app.created_at,
      opportunity: opp
        ? {
            _id: opp.id,
            title: opp.title,
            companyName: opp.company_name,
          }
        : null,
    };
  });

  sendSuccess(res, formattedApps);
};

