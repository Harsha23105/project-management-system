const AppError = require('../utils/AppError');
const projectRepository = require('../repositories/projectRepository');

const authorizeProject = async (req, _res, next) => {
  try {
    const projectId = parseInt(req.params.id || req.body.projectId, 10);
    if (!projectId) return next();

    const project = await projectRepository.findByIdAndUser(projectId, req.user.id);
    if (!project) {
      throw new AppError('Forbidden: You do not have access to this resource', 403);
    }
    req.project = project;
    next();
  } catch (err) {
    next(err);
  }
};

const authorizeTask = async (req, _res, next) => {
  try {
    const taskRepository = require('../repositories/taskRepository');
    const taskId = parseInt(req.params.id, 10);
    if (!taskId) return next();

    const task = await taskRepository.findByIdAndUser(taskId, req.user.id);
    if (!task) {
      throw new AppError('Forbidden: You do not have access to this resource', 403);
    }
    req.task = task;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authorizeProject, authorizeTask };
