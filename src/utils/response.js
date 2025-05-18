const standardizeResponse = (data) => (data);

const handleError = (res, error, message = 'Internal server error') => {
  console.error(message, error);
  res.status(500).json(standardizeResponse(message));
};

module.exports = {
  standardizeResponse,
  handleError
}; 