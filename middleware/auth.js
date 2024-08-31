require('dotenv').config();
const jwt = require('jsonwebtoken');
const { personal_access_token } = require('../database/models');

module.exports.verifyToken = (req, res, next) => {

    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, process.env.APP_SECRET, async (err, decoded) => {
            const client_token = await personal_access_token.findOne({ where: { token: bearerToken }});

            if(!client_token){
                return res.status(401).send({
                    message: 'Unauthorized! Token is expired.'
                });
            }

            if(err){
                return res.status(401).send({
                    message: 'Unauthorized! Token is invalid.'
                });
            }
            next();
        });
    } else {
        res.sendStatus(403);
    }
};