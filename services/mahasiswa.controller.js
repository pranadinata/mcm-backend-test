const { users, mahasiswa } = require('../database/models');

async function index(req, res){
    const users = await mahasiswa.findAll({ order:[['nim', 'ASC']] });
    res.json(users);
}

function create(){

}

function update(){

}

function destroy(){

}


module.exports = { index }