const { supabase } = require('../config/db');
const { DOMAINS } = require('../constants');
const AppError = require('../utils/AppError');

const listOpportunities = async ({ search, domain } = {}) => {
  let query = supabase
    .from('opportunities')
    .select('*')
    .order('created_at', { ascending: false });

  if (search) {
    // ilike is case-insensitive
    query = query.ilike('title', `%${search.trim()}%`);
  }

  if (domain) {
    if (!DOMAINS.includes(domain)) {
      throw new AppError(`Invalid domain. Allowed values: ${DOMAINS.join(', ')}`, 400);
    }
    query = query.eq('domain', domain);
  }

  const { data, error } = await query;
  if (error) throw new AppError(error.message, 500);

  // Map snake_case DB columns to camelCase for frontend compatibility
  // Provide both id and _id for seamless frontend compatibility
  return data.map(item => ({
    id: item.id,
    _id: item.id,
    title: item.title,
    companyName: item.company_name,
    type: item.type,
    domain: item.domain,
    location: item.location,
    experience: item.experience,
    description: item.description,
    applicationLink: item.application_link,
    createdAt: item.created_at
  }));
};

const getOpportunityById = async (id) => {
  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    throw new AppError('Opportunity not found', 404);
  }

  return {
    id: data.id,
    _id: data.id,
    title: data.title,
    companyName: data.company_name,
    type: data.type,
    domain: data.domain,
    location: data.location,
    experience: data.experience,
    description: data.description,
    applicationLink: data.application_link,
    createdAt: data.created_at
  };
};

const createOpportunity = async (data) => {
  const { data: inserted, error } = await supabase
    .from('opportunities')
    .insert([{
      title: data.title,
      company_name: data.companyName,
      type: data.type,
      domain: data.domain,
      location: data.location,
      experience: data.experience,
      description: data.description,
      application_link: data.applicationLink,
    }])
    .select()
    .single();

  if (error) throw new AppError(error.message, 500);

  return {
    id: inserted.id,
    title: inserted.title,
    companyName: inserted.company_name,
    type: inserted.type,
    domain: inserted.domain,
    location: inserted.location,
    experience: inserted.experience,
    description: inserted.description,
    applicationLink: inserted.application_link,
    createdAt: inserted.created_at
  };
};

const updateOpportunity = async (id, updates) => {
  const updateData = {};
  if (updates.title) updateData.title = updates.title;
  if (updates.companyName) updateData.company_name = updates.companyName;
  if (updates.type) updateData.type = updates.type;
  if (updates.domain) updateData.domain = updates.domain;
  if (updates.location) updateData.location = updates.location;
  if (updates.experience) updateData.experience = updates.experience;
  if (updates.description) updateData.description = updates.description;
  if (updates.applicationLink) updateData.application_link = updates.applicationLink;

  const { data, error } = await supabase
    .from('opportunities')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    throw new AppError('Opportunity not found', 404);
  }

  return {
    id: data.id,
    _id: data.id,
    title: data.title,
    companyName: data.company_name,
    type: data.type,
    domain: data.domain,
    location: data.location,
    experience: data.experience,
    description: data.description,
    applicationLink: data.application_link,
    createdAt: data.created_at
  };
};

const deleteOpportunity = async (id) => {
  const { error } = await supabase
    .from('opportunities')
    .delete()
    .eq('id', id);

  if (error) throw new AppError(error.message, 500);

  // Verify it actually deleted something (Supabase delete doesn't error if 0 rows affected)
  const { count } = await supabase
    .from('opportunities')
    .select('*', { count: 'exact', head: true })
    .eq('id', id);

  if (count > 0) throw new AppError('Error deleting opportunity', 500);
};

module.exports = {
  listOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
