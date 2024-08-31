require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.APP_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: 'Unauthorized! Token is invalid or expired.'
                });
            }
            next();
        });

    } else {
        res.sendStatus(403);
    }
};