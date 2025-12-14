// server/src/utils/handleAsync.js
// Helper to catch async errors without try/catch in every controller

const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = handleAsync;
