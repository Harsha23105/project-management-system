require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');

const logger = console;
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const swaggerSpec = require('./docs/swagger');

const app = express();

/**
 * =========================
 * CONFIG LOADER (SAFE)
 * =========================
 */
let config;

try {
  config = require('./config');
} catch (err) {
  console.warn('⚠️ ./config not found, using fallback config');

  config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  };
}

/**
 * =========================
 * DATABASE CONNECTION
 * =========================
 * IMPORTANT: fail fast if DB is critical
 */
try {
  require('./config/database');
} catch (err) {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
}

/**
 * =========================
 * SECURITY MIDDLEWARE
 * =========================
 */
app.set('trust proxy', 1);

app.use(helmet());

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

/**
 * =========================
 * RATE LIMITING
 * =========================
 */
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

/**
 * =========================
 * BODY PARSING
 * =========================
 */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

/**
 * =========================
 * HEALTH CHECK
 * =========================
 */
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * =========================
 * SWAGGER DOCS
 * =========================
 */
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'PMS API Documentation',
  })
);

app.get('/api/docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

/**
 * =========================
 * ERROR HANDLING
 * =========================
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * =========================
 * START SERVER
 * =========================
 */
if (require.main === module) {
  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} in ${config.env} mode`);
    logger.info(`API Docs: http://localhost:${config.port}/api/docs`);
  });
}

module.exports = app;