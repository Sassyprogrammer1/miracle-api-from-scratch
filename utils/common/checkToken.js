let jwt = require('jsonwebtoken');
const config = require('../../config');


let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  


  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      console.log(err,decoded);
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Please Login to continue!'
    });
  }
};

module.exports = {
  checkToken: checkToken
}