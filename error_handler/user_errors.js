
const Prisma = require('../db/prisma');

function errorHandler(err, req, res, next) {
  console.error('Error caught:', err);

  // Prisma unique constraint violation
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const fields = err.meta?.target?.join(', ') || 'field';
      return res.status(409).json({
        error: `A user with that ${fields} already exists.`
      });
    }
  }

  // Validation error (custom)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message
    });
  }

  // Custom app error
  if (err.name === 'AppError') {
    return res.status(err.statusCode || 500).json({
      error: err.message
    });
  }

  // Fallback
  res.status(500).json({
    error: 'Something went wrong. Please try again later.'
  });
}

module.exports = errorHandler;
