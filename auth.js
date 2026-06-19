const { verifyToken, hashToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const tokenRepository = require('../repositories/tokenRepository');
const { asyncHandler } = require('../utils/helpers');

const authenticate = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Authentication required', 401);
  }

  const token = authHeader.split(' ')[1];

  const isBlacklisted = await tokenRepository.isBlacklisted(hashToken(token));
  if (isBlacklisted) {
    throw new AppError('Token has been revoked', 401);
  }

  const decoded = verifyToken(token);
  req.user = { id: decoded.id, email: decoded.email, fullName: decoded.fullName };
  next();
});

module.exports = authenticate;
