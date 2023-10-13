const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireRole = (requiredRole) => async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id, selectedRole } = jwt.verify(token, process.env.SECRET);

        if (role !== requiredRole) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireRole;
