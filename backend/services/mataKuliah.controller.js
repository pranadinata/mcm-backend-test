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
            const order = sort ? [sort.split(',')] : [['updatedAt', 'DESC']]; // Pengurutan default
    
            // Ambil data dari database dengan paginasi dan pengurutan
            const {count, rows} = await mata_kuliah.findAndCountAll({
                limit,
                offset,
                order,
                distinct: true,
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
            const { nama_matkul } = req.body;
            mata_kuliah.create({ 
                nama_matkul: nama_matkul,
             }).then((matkul)=>{
                if(matkul){
                    res.status(200).json({
                        data: {
                            status: 'success',
                            data: matkul,
                            code: 200,
                            message: 'Berhasil membuat mata kuliah!',
                        }
                    });
                }

             });
        }
   } catch (error) {
        res.status(500).send({message: 'Terjadi kesalahan pada server', error: error.message});
   }
}

async function update(req, res){
    try {
        const admin = await cek_admin(req.headers['authorization']);
        if(admin != true){
            res.sendStatus(403);
        }else{
            const { matkul_id, nama_matkul } = req.body;
            mata_kuliah.update({
                nama_matkul: nama_matkul
            }, { where: { 
                id: matkul_id,
            }}).then((result)=>{
                if(result){
                    res.status(200).json({
                        data: {
                            status: 'success',
                            code: 200,
                            message: 'Berhasil mengubah data mata kuliah!',
                        }
                    });
                }else{
                    res.status(400).json({
                        data: {
                            status: 'error',
                            code: 400,
                            message: 'Id tidak ada!',
                        }
                    });
                }
            });
            
        }
    } catch (error) {
        res.status(500).send({message: 'Terjadi kesalahan pada server', error: error.message});
        
    }
}

async function destroy(req, res){
    try {
        const admin = await cek_admin(req.headers['authorization']);
        if(admin != true){
            res.sendStatus(403);
        }else{
            const { matkul_id } = req.body
            mata_kuliah.destroy({ where: { id: matkul_id } }).then((result)=>{
                if(result){
                    res.status(200).json({
                        data: {
                                status: 'success',
                                code: 200,
                                message: 'Berhasil menghapus data mata kuliah!',
                            }
                    });
                }
            });
        }
    } catch (error) {
        res.status(500).send({message: 'Terjadi kesalahan pada server', error: error.message});  
    }
}

function detail(req, res){
    try {
        const matkul_id = req.params.id;
        mata_kuliah.findOne({ where: { id: matkul_id },include: [{
            model: rencana_studi,
            as: 'RencanaStudi',
            include: [{
                model: mahasiswa,
                as: 'Mahasiswa',
            }]
        }]}).then((result)=>{
            if(result){
                res.status(200).json({
                    data: {
                            status: 'success',
                            data: result,
                            code: 200,
                            message: 'Berhasil mengambil data rencana studi!',
                        }
                });
            }else{
                res.status(400).json({
                    data: {
                        status: 'error',
                        code: 400,
                        message: 'Id tidak terdaftar!',
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).send({message: 'Terjadi kesalahan pada server', error: error.message});  
    }
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