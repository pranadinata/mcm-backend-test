require('dotenv').config();
const {
    users,
    personal_access_token,
    mahasiswa,
} = require('../database/models');

async function getUserFromToken(headers_token){
    const bearer = headers_token.split(' ');
    const bearerToken = bearer[1];
    const client_token = await personal_access_token.findOne({ where: { token: bearerToken },attributes: ['id', 'tokenable_id']});
    
    let user_login = [];
    const user = await users.findOne({ where: { id: client_token.tokenable_id }});
    const mahasiswa_user = await mahasiswa.findOne({ where: { id: client_token.tokenable_id }});

    if(user.role_id == 1){
        user_login['users'] = user;
        user_login['detailed_users'] = null;
    }else{
        user_login['users'] = user;
        user_login['detailed_users'] = mahasiswa_user;
    }
    return user_login;
}



module.exports = { getUserFromToken }