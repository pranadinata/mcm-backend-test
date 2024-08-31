const {  mahasiswa, rencana_studi, mata_kuliah } = require('../database/models');

const globalFunc = require('../middleware/globalFunction');

async function index(req, res){
    try {
        const admin = await cek_admin(req.headers['authorization']);
        if(admin != true){
            res.sendStatus(403);
        }else{
            const {page, size, sort} = req.query;
            const limit = size ? +size : 10; // Jumlah data per halaman
            const offset = page ? (page - 1) * limit : 0; // Menghitung offset, asumsi halaman dimulai dari 1
            const order = sort ? [sort.split(',')] : [['createdAt', 'DESC']]; // Pengurutan default
    
            // Ambil data dari database dengan paginasi dan pengurutan
            const {count, rows} = await mata_kuliah.findAndCountAll({
                limit,
                offset,
                order,
                include: [{
                    model: rencana_studi,
                    as: 'RencanaStudi',
                    include: [{
                        model: mahasiswa,
                        as: 'Mahasiswa',
                    }]
                }]
            });
    
            // Menghitung jumlah halaman
            const totalPages = Math.ceil(count / limit);
    
            // Mengirim respon JSON
            res.status(200).json({
                currentPage: parseInt(page) || 1, // Asumsi halaman default adalah 1 jika tidak diberikan
                totalPages,
                totalCount: count,
                data: rows,
            });
        }
    } catch (error) {
        res.status(500).send({message: 'Terjadi kesalahan pada server', error: error.message});
    }
}

async function create(req, res){
   try {
        const admin = await cek_admin(req.headers['authorization']);
        if(admin != true){
            res.sendStatus(403);
        }else{
            
        }
   } catch (error) {
        res.status(500).send({message: 'Terjadi kesalahan pada server', error: error.message});
   }
}

async function update(){

}

function destroy(){

}

function detail(){

}

async function cek_admin(bearerHeader){
    const user = await globalFunc.getUserFromToken(bearerHeader);
    if(user['users'].role_id === 1){
        return true;
    }else{
        return false;
    }
}


module.exports = { index, create, update, destroy, detail }