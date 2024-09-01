const { check, validationResult } = require('express-validator');

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        console.log(errorMessages)
        return res.status(400).json({
            errors: errorMessages
        });
    } 
    next();
}

const login_check = [
    check('username').notEmpty().withMessage('Username tidak boleh kosong').custom(value => {
        // Memeriksa apakah string mengandung spasi
        if (/\s/.test(value)) {
            throw new Error('String tidak boleh mengandung spasi');
        }
        return true;
    }),
    check('password').notEmpty().withMessage('Password tidak boleh kosong'),  
    reporter
];

const mahasiswa_create = [
    check('username').notEmpty().withMessage('Username tidak boleh kosong').custom(value => {
        // Memeriksa apakah string mengandung spasi
        if (/\s/.test(value)) {
            throw new Error('String tidak boleh mengandung spasi');
        }
        return true;
    }),
    check('password').notEmpty().withMessage('Password tidak boleh kosong'),
    check('role_id').notEmpty().isInt().isLength({ max: 1 }).withMessage('Role harus integer dan tidak lebih dari satu karakter'),
    check('nama_lengkap').notEmpty().isString().isLength({ max: 100 }).withMessage('Nama lengkap harus diisi string dan tidak boleh lebih dari 100 karakter'),
    check('nim').notEmpty().isInt().isLength({ max: 6, min: 6 }).withMessage('Nim harus diisi dengan 6 digit angka'),
    check('jurusan').notEmpty().isString().isLength({ max: 100 }).withMessage('Jurusan harus berisi string dan tidak boleh lebih dari 100 karakter'),
    check('alamat').notEmpty().isString().isLength({ max: 300 }).withMessage('Alamat harus berisi string dan tidak boleh lebih dari 300 karakter'),
    check('semester').notEmpty().isInt().isLength({ min:4, max: 4 }).withMessage('Semester harus diisi dengan 4 digit angka'),
    reporter 
];

const mahasiswa_update = [

    check('mahasiswa_id').notEmpty().isUUID([4]).withMessage('Mahasiswa id haruus UUID dan tidak boleh kosong'),
    check('username').notEmpty().withMessage('Username tidak boleh kosong').custom(value => {
        // Memeriksa apakah string mengandung spasi
        if (/\s/.test(value)) {
            throw new Error('String tidak boleh mengandung spasi');
        }
        return true;
    }),

    check('nama_lengkap').notEmpty().isString().isLength({ max: 100 }).withMessage('Nama lengkap harus diisi string dan tidak boleh lebih dari 100 karakter'),
    check('nim').notEmpty().isInt().isLength({ max: 6, min: 6 }).withMessage('Nim harus diisi dengan 6 digit angka'),
    check('jurusan').notEmpty().isString().isLength({ max: 100 }).withMessage('Jurusan harus berisi string dan tidak boleh lebih dari 100 karakter'),
    check('alamat').notEmpty().isString().isLength({ max: 300 }).withMessage('Alamat harus berisi string dan tidak boleh lebih dari 300 karakter'),
    check('semester').notEmpty().isInt().isLength({ min:4, max: 4 }).withMessage('Semester harus diisi dengan 4 digit angka'),
    reporter 
];

const mahasiswa_delete = [
    check('mahasiswa_id').notEmpty().isUUID([4]).withMessage('Mahasiswa id harus UUID dan tidak boleh kosong'),
    reporter
];

const mahasiswa_detail = [
    check('id').notEmpty().isUUID([4]).withMessage('Mahasiswa id harus UUID dan tidak boleh kosong'),
    reporter
];

const rencana_studi_create = [
    check('mahasiswa_id').notEmpty().isUUID([4]).withMessage('Mahasiswa id harus UUID dan tidak boleh kosong'),
    check('matkul_id').notEmpty().isUUID([4]).withMessage('Mata kuliah id harus UUID dan tidak boleh kosong'),
    reporter
];

const rencana_studi_update = [
    check('rencana_studi_id').notEmpty().isUUID([4]).withMessage('Rencana studi id harus UUID dan tidak boleh kosong'),
    check('matkul_id_tujuan').notEmpty().isUUID([4]).withMessage('Mata kuliah id tujuan harus UUID dan tidak boleh kosong'),
    reporter
];

const rencana_studi_delete = [
    check('rencana_studi_id').notEmpty().isUUID([4]).withMessage('Rencana studi id harus UUID dan tidak boleh kosong'),
];

const rencana_studi_detail = [
    check('id').notEmpty().isUUID([4]).withMessage('Rencana studi id harus UUID dan tidak boleh kosong'),
];

const mata_kuliah_create = [
    check('nama_matkul').notEmpty().isString().isLength({ max: 100}),
];
const mata_kuliah_update = [
    check('matkul_id').notEmpty().isUUID([4]).withMessage('Mata kuliah id harus UUID dan tidak boleh kosong'),
    check('nama_matkul').notEmpty().isString().isLength({ max: 100}),
];
const mata_kuliah_delete = [
    check('matkul_id').notEmpty().isUUID([4]).withMessage('Mata kuliah id harus UUID dan tidak boleh kosong'),
];
const mata_kuliah_detail = [
    check('id').notEmpty().isUUID([4]).withMessage('Mata kuliah id harus UUID dan tidak boleh kosong'),
];


module.exports = {
    login_check,
    mahasiswa_create,
    mahasiswa_update,
    mahasiswa_delete,
    mahasiswa_detail,
    rencana_studi_create,
    rencana_studi_update,
    rencana_studi_delete,
    rencana_studi_detail,
    mata_kuliah_create,
    mata_kuliah_update,
    mata_kuliah_delete,
    mata_kuliah_detail,
};