const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require('../config');

function AdminMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodedToken = jwt.verify(token, JWT_USER_PASSWORD);
    if (!decodedToken) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
    req.admin = decodedToken.id;
    next(); 
}

module.exports = AdminMiddleware;