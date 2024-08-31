const bcrypt = require('bcrypt');
const { users, mahasiswa, rencana_studi, mata_kuliah } = require('../database/models');

const globalFunc = require('../middleware/globalFunction');

async function index(req, res){
    try {
        const admin = await cek_admin(req.headers['authorization']);
        
        if(admin != true) {
            res.sendStatus(403);
        }else{
            const {page, size, sort} = req.query;
            const limit = size ? +size : 10; // Jumlah data per halaman
            const offset = page ? (page - 1) * limit : 0; // Menghitung offset, asumsi halaman dimulai dari 1
            const order = sort ? [sort.split(',')] : [['createdAt', 'DESC']]; // Pengurutan default
    
            // Ambil data dari database dengan paginasi dan pengurutan
            const {count, rows} = await mahasiswa.findAndCountAll({
                limit,
                offset,
                order,
                include: [{
                    model: rencana_studi,
                    as: 'RencanaStudi',
                    include:[{
                        model: mata_kuliah,
                        as: 'MataKuliah',
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
        };
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
  
            const { username, password, role_id, nama_lengkap, nim, jurusan, alamat, semester } = req.body

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
    
            mahasiswa.create({
                nama_lengkap: nama_lengkap,
                nim: nim,
                alamat: alamat,
                semester: semester,
                jurusan: jurusan,
                max_matkul: false,
            }).then((mahasiswa) =>{
      
               if(mahasiswa){
                    users.create({
                        username: username,
                        password: hash,
                        role_id: role_id,
                        mahasiswa_id: mahasiswa.id,
                    }).then((user)=>{
                        if(user){
                            res.status(200).json({
                                data: {
                                    status: 'success',
                                    data: mahasiswa,
                                    code: 200,
                                    message: 'Berhasil membuat mahasiswa!',
                                }
                            });
                        }
                    })
               }
            }).catch((err)=>{
                if (err.name === 'SequelizeUniqueConstraintError') {
                    res.status(400).json({
                        data: {
                            status: 'error',
                            code: 400,
                            message: 'NIM sudah terdaftar!',
                        }
                    });
                } 
            });
        };
      

        
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
   
            const { mahasiswa_id, username, password , nama_lengkap, nim, jurusan, alamat, semester } = req.body
            mahasiswa.update({
                nama_lengkap: nama_lengkap,
                nim: nim,
                alamat: alamat, 
                semester: semester,
                jurusan: jurusan
            },{ where:{
                id: mahasiswa_id
            }}).then((mahasiswa)=>{
                if(mahasiswa){
                    if(password){
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(password, salt);
    
                        users.update({
                            username: username,
                            password: hash,
                        },{ where: {
                            mahasiswa_id: mahasiswa_id    
                        }}).then(()=>{
                            res.status(200).json({
                                data: {
                                     status: 'success',
                                     code: 200,
                                     message: 'Berhasil mengubah data mahasiswa!',
                                 }
                               });
                        });
                    }else{
                        users.update({
                            username: username,
                        },{ where: {
                            mahasiswa_id: mahasiswa_id    
                        }}).then(()=>{
                            res.status(200).json({
                                data: {
                                     status: 'success',
                                     code: 200,
                                     message: 'Berhasil mengubah data mahasiswa!',
                                 }
                               });
                        });
                    }         
                }
            });
        };
     
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
            const { mahasiswa_id } = req.body;

            const user_model = await users.findOne({ where: { mahasiswa_id: mahasiswa_id } });
            const mahasiswa_model = await mahasiswa.findOne({ where: { id: mahasiswa_id} });
            // res.json(user_model);
            if(user_model && mahasiswa_model){
                user_model.destroy().then((delete_user)=>{
                    if(delete_user){
                        mahasiswa_model.destroy().then(()=>{
                            res.status(200).json({
                                data: {
                                        status: 'success',
                                        code: 200,
                                        message: 'Berhasil menghapus data mahasiswa!',
                                    }
                            });
                        });
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

           
        }
   } catch (error) {
        res.status(500).send({message: 'Terjadi kesalahan pada server', error: error.message});    
    
   }
    
}

function detail(req, res){
    try {
        const mahasiswa_id = req.params.id;

        mahasiswa.findOne({ where: { id: mahasiswa_id }, include: [{ 
            model: rencana_studi, 
            as: 'RencanaStudi',
            include:[{
                model: mata_kuliah,
                as: 'MataKuliah',
            }]
         }]}).then((result)=>{
            if(result){
                res.status(200).json({
                    data: {
                            status: 'success',
                            data: result,
                            code: 200,
                            message: 'Berhasil mengambil data mahasiswa!',
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
        })
        

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






module.exports = { index, create , update, destroy, detail}