const AppError = require('./AppError');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const sendSuccess = (res, statusCode, data, message) => {
  const response = { success: true };
  if (message) response.message = message;
  if (data !== undefined) response.data = data;
  res.status(statusCode).json(response);
};

const sendPaginated = (res, data, pagination) => {
  res.status(200).json({
    success: true,
    data,
    pagination,
  });
};

const parsePagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
  const offset = (page - 1) * limit;
  const sortBy = query.sortBy || 'created_at';
  const sortOrder = query.sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  return { page, limit, offset, sortBy, sortOrder };
};

const allowedSortFields = {
  projects: ['name', 'status', 'start_date', 'end_date', 'created_at'],
  tasks: ['name', 'priority', 'status', 'due_date', 'created_at'],
};

const validateSortField = (entity, field) => {
  const allowed = allowedSortFields[entity] || ['created_at'];
  return allowed.includes(field) ? field : 'created_at';
};

module.exports = {
  asyncHandler,
  sendSuccess,
  sendPaginated,
  parsePagination,
  validateSortField,
};
