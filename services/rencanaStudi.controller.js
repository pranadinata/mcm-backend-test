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
            const {count, rows} = await rencana_studi.findAndCountAll({
                limit,
                offset,
                order,
                distinct: true,
                include: [{
                    model: mahasiswa,
                    as: 'Mahasiswa',
                },{
                    model: mata_kuliah,
                    as: 'MataKuliah',
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

        const { mahasiswa_id, matkul_id } = req.body;
        
        const cek_sudah_ada_matkul = await cek_duplicate_matkul(mahasiswa_id, matkul_id);

        if(cek_sudah_ada_matkul === true){
            res.status(400).json({
                data: {
                    status: 'error',
                    code: 400,
                    message: 'Matkul yang di pilih sudah terdaftar!',
                }
            });
            return
        }

        const cek_ketersediaan_mahasiswa = await cek_jumlah_rencana_studi_per_mahasiswa(mahasiswa_id);

        const cek_ketersediaan_matkul = await cek_jumlah_rencana_studi_per_matkul(matkul_id);

        if(cek_ketersediaan_mahasiswa < 3 && cek_ketersediaan_matkul < 4){
            rencana_studi.create({ 
                mahasiswa_id: mahasiswa_id,
                mata_kuliah_id: matkul_id
             }).then((ren_studi)=>{
                if(ren_studi){
                    res.status(200).json({
                        data: {
                            status: 'success',
                            data: ren_studi,
                            code: 200,
                            message: 'Berhasil membuat rencana studi!',
                        }
                    });
                }
             });
        }else{
            res.status(400).json({
                data: {
                    status: 'error',
                    code: 400,
                    message: 'Anda sudah memilih 3 matkul berbeda / jumlah mahasiswa pada matkul tersebut sudah pas dengan 4 mahasiswa!',
                }
            });
        }
    } catch (error) {
        res.status(500).send({message: 'Terjadi kesalahan pada server', error: error.message});
    }

}
async function update(req, res){
    try {
        const { rencana_studi_id, matkul_id_tujuan } = req.body;

        const matkul_sebelumnya = await rencana_studi.findOne({ where: { id: rencana_studi_id }});

        const cek_sudah_ada_matkul = await cek_duplicate_matkul(matkul_sebelumnya.mahasiswa_id , matkul_id_tujuan);

        if(cek_sudah_ada_matkul === true){
            res.status(400).json({
                data: {
                    status: 'error',
                    code: 400,
                    message: 'Matkul yang di pilih sudah terdaftar!',
                }
            });
            return
        }

        const cek_ketersediaan_matkul = await cek_jumlah_rencana_studi_per_matkul(matkul_id_tujuan);

        if(cek_ketersediaan_matkul < 4){
            
            rencana_studi.update({ 
                mata_kuliah_id: matkul_id_tujuan
             }, { where: {
                id: rencana_studi_id
             } }).then((result)=>{
    
                res.status(200).json({
                    data: {
                         status: 'success',
                         code: 200,
                         message: 'Berhasil mengubah data rencana studi!',
                     }
                   });
             }).catch((err)=>{
                res.json(err)
             });
        }else{
            res.status(400).json({
                data: {
                    status: 'error',
                    code: 400,
                    message: 'Jumlah mahasiswa pada matkul tujuan tersebut sudah pas dengan 4 mahasiswa!',
                }
            });
        }
    } catch (error) {
        res.status(500).send({message: 'Terjadi kesalahan pada server', error: error.message});
    }
}
function destroy(req, res){
    try {
        const { rencana_studi_id } = req.body
   
        rencana_studi.destroy({ where: { id: rencana_studi_id }}).then((result)=>{
            if(result){
                res.status(200).json({
                    data: {
                            status: 'success',
                            code: 200,
                            message: 'Berhasil menghapus data rencana studi!',
                        }
                });
            }
        });
    } catch (error) {
        res.status(500).send({message: 'Terjadi kesalahan pada server', error: error.message});
    }
}

function detail(req, res){
    try {
        const rencana_studi_id = req.params.id;
        rencana_studi.findOne({ where: { id: rencana_studi_id}, include: [{
                model: mahasiswa,
                as: 'Mahasiswa',
             },{
                model: mata_kuliah,
                as: 'MataKuliah',
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

async function cek_duplicate_matkul(id_mahasiswa, id_matkul){
    try {
        const data_matkul = await rencana_studi.findOne({ where: { mahasiswa_id: id_mahasiswa, mata_kuliah_id: id_matkul } });
        return data_matkul ? true : false;
    } catch (error) {
        return error.message;  
    }
}

async function cek_jumlah_rencana_studi_per_mahasiswa(id_mahasiswa){
    try {
        const ren_studi = await rencana_studi.findAll({ where: { mahasiswa_id: id_mahasiswa } });
        return ren_studi.length;
    } catch (error) {
        return error.message;
    }
}
async function cek_jumlah_rencana_studi_per_matkul(id_matkul){
    try {
        const ren_studi = await rencana_studi.findAll({ where: { mata_kuliah_id: id_matkul } });
        return ren_studi.length;
    } catch (error) {
        return error.message;
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