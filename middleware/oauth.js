const jwt = require('jsonwebtoken');
const constants = require('../util/constants');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ errors: 'Not authenticated!' });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, constants.getSecretKey());
  } catch (err) {
    return res.status(401).json({ errors: err.message });
  }
  if (!decodedToken) {
    return res.status(401).json({ errors: 'Token invalid.' });
  }
  //req.userId = decodedToken.userId;
  next();
};