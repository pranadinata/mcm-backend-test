require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    users,
    personal_access_token
} = require('../database/models');

function postLogin(req, res) {
    const {
        username,
        password
    } = req.body;

    users.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if (!user) {
            res.status(400).json({
                data: {
                    status: 'error',
                    code: 400,
                    message: 'Username Tidak Ditemukan!!!',
                }
            });
        }
    
        bcrypt.compare(password, user.get('password'), (err, isMatch) => {
            if (err) {
                res.status(400).send('Password Error');
            };
            if (isMatch) {
                const token = jwt.sign({ userId: user.get('id')}, process.env.APP_SECRET, {
                    expiresIn: '1h'
                });

                UpdateOrCreate(token, user.get('id'), user.get('username')).then(()=>{
                    res.status(200).json({
                       data: {
                            status: 'success',
                            token: token,
                            code: 200,
                            message: 'Success login!',
                        }
                      });
                });
            } else {
                res.status(400).json({
                    data: {
                        status: 'error',
                        code: 400,
                        message: 'Salah Password!!!',
                    }
                });
            }

        });

    });
}

async function getLogout(req, res){
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const cek_personal_tokens = await personal_access_token.findOne({ where: { token: bearerToken },attributes: ['id'] });
    if(cek_personal_tokens){
        personal_access_token.update(
            {
                token: '',
                expires_at: null,
            },{
            where: {
                id: cek_personal_tokens.id
            }
        }).then(()=>{
                res.clearCookie('token'); // Clear the 'token' cookie
                res.status(200).json('berhasil logout!!');
        });
    }
}

function UpdateOrCreate(token, user_id, username){  
    return new Promise(async (resolve) =>{
        const cek_personal_tokens = await personal_access_token.findOne({
            where: { tokenable_id: user_id }
        });
        const date_now = new Date(Date.now());
        const token_expires_at = addHours(date_now, 1);
        if(cek_personal_tokens){
            personal_access_token.update(
                {
                    token: token,
                    expires_at: token_expires_at,
                },{
                where: {
                    id: cek_personal_tokens.id
                }
            });
        }else{
            personal_access_token.create({
                tokenable_type: 'Bearer',
                tokenable_id: user_id,
                name: username,
                token: token,
                expires_at: token_expires_at
            });
        }
        resolve();
    });
}

function addHours(date, hours) {
    const dateCopy = new Date(date.getTime());
    const hoursToAdd = hours * 60 * 60 * 1000;
    dateCopy.setTime(date.getTime() + hoursToAdd);
    return dateCopy;
}

module.exports = {
    postLogin,
    getLogout
}