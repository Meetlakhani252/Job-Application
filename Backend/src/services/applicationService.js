const { supabase } = require('../config/db');
const AppError = require('../utils/AppError');
const generateApplicationId = require('../utils/generateApplicationId');

const createApplication = async ({ userId, name, phone, email, opportunityId, resumeLink, message }) => {

  // Check if opportunity exists
  const { data: opp, error: oppError } = await supabase
    .from('opportunities')
    .select('id')
    .eq('id', opportunityId)
    .single();

  if (oppError || !opp) {
    throw new AppError('Opportunity not found', 404);
  }

  let applicationCode = generateApplicationId();
  // Collision check
  const { data: collision } = await supabase
    .from('applications')
    .select('id')
    .eq('application_code', applicationCode)
    .single();

  if (collision) {
    applicationCode = generateApplicationId();
  }

  try {
    const { data, error } = await supabase
      .from('applications')
      .insert([{
        application_code: applicationCode,
        opportunity_id: opportunityId,
        user_id: userId,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        resume_link: resumeLink?.trim() || null,
        message: message?.trim() || null,
      }])
      .select()
      .single();

    if (error) {
      // Postgres Unique Violation error code is 23505
      if (error.code === '23505') {
        throw new AppError('You have already applied to this opportunity', 409);
      }
      throw new AppError(error.message, 500);
    }

    return { applicationId: data.application_code };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(error.message, 500);
  }
};

const getApplicationByApplicationId = async (userId, applicationId) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      opportunity (id, title, company_name)
    `)
    .eq('application_code', applicationId)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    throw new AppError('Application not found or you do not have permission to view it', 404);
  }

  // Maintain same response shape as Mongoose .populate()
  return {
    id: data.id,
    applicationId: data.application_code,
    name: data.name,
    phone: data.phone,
    email: data.email,
    resumeLink: data.resume_link,
    message: data.message,
    createdAt: data.created_at,
    opportunity: {
      _id: data.opportunity.id,
      title: data.opportunity.title,
      companyName: data.opportunity.company_name,
    }
  };
};

const listAllApplications = async () => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      opportunity (id, title, company_name)
    `)
    .order('created_at', { ascending: false });

  if (error) throw new AppError(error.message, 500);

  return data.map(app => ({
    id: app.id,
    applicationId: app.application_code,
    name: app.name,
    phone: app.phone,
    email: app.email,
    resumeLink: app.resume_link,
    message: app.message,
    createdAt: app.created_at,
    opportunity: {
      _id: app.opportunity.id,
      title: app.opportunity.title,
      companyName: app.opportunity.company_name,
    }
  }));
};

module.exports = { createApplication, getApplicationByApplicationId, listAllApplications };
