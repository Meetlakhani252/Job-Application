const { DOMAINS, OPPORTUNITY_TYPES } = require('./enums');

const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
});

const APP_ID_PREFIX = 'APP-';
const APP_ID_REGEX = /^APP-[A-Z0-9]{6}$/i;
const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;
const OPPORTUNITY_ALLOWED_FIELDS = [
  'title',
  'companyName',
  'type',
  'domain',
  'location',
  'experience',
  'description',
  'applicationLink',
];

module.exports = {
  DOMAINS,
  OPPORTUNITY_TYPES,
  HTTP_STATUS,
  APP_ID_PREFIX,
  APP_ID_REGEX,
  OBJECT_ID_REGEX,
  OPPORTUNITY_ALLOWED_FIELDS,
};
