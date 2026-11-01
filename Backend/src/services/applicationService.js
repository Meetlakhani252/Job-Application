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

// Helper: fetch opportunity details by id
const fetchOpportunity = async (opportunityId) => {
  if (!opportunityId) return null;
  const { data } = await supabase
    .from('opportunities')
    .select('id, title, company_name')
    .eq('id', opportunityId)
    .single();
  return data || null;
};

const getApplicationByApplicationId = async (userId, applicationId) => {
  const clean = (applicationId || '').trim().toUpperCase();
  const searchCode = clean.startsWith('APP-') ? clean : `APP-${clean}`;

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .ilike('application_code', searchCode)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    throw new AppError('Application not found or you do not have permission to view it', 404);
  }

  const opp = await fetchOpportunity(data.opportunity_id);

  return {
    id: data.id,
    applicationId: data.application_code,
    name: data.name,
    phone: data.phone,
    email: data.email,
    resumeLink: data.resume_link,
    message: data.message,
    createdAt: data.created_at,
    opportunity: opp
      ? { _id: opp.id, title: opp.title, companyName: opp.company_name }
      : null,
  };
};

const listAllApplications = async () => {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new AppError(error.message, 500);

  // Batch-fetch all unique opportunity ids
  const oppIds = [...new Set(data.map(a => a.opportunity_id).filter(Boolean))];
  let oppMap = {};
  if (oppIds.length > 0) {
    const { data: opps } = await supabase
      .from('opportunities')
      .select('id, title, company_name')
      .in('id', oppIds);
    (opps || []).forEach(o => { oppMap[o.id] = o; });
  }

  return data.map(app => {
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
        ? { _id: opp.id, title: opp.title, companyName: opp.company_name }
        : null,
    };
  });
};

const getPublicApplicationByCode = async (applicationId) => {
  const clean = (applicationId || '').trim().toUpperCase();
  const searchCode = clean.startsWith('APP-') ? clean : `APP-${clean}`;

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .ilike('application_code', searchCode)
    .single();

  if (error || !data) {
    throw new AppError('Application not found', 404);
  }

  const opp = await fetchOpportunity(data.opportunity_id);

  return {
    applicationId: data.application_code,
    name: data.name,
    email: data.email,
    phone: data.phone,
    resumeLink: data.resume_link,
    message: data.message,
    status: data.status || 'Pending',
    createdAt: data.created_at,
    opportunity: opp
      ? { title: opp.title, companyName: opp.company_name }
      : null,
  };
};

module.exports = { createApplication, getApplicationByApplicationId, getPublicApplicationByCode, listAllApplications };
