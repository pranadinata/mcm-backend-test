require('express-router-group');
var express = require('express');
var router = express.Router();

//middleware
const inputValidator = require('../middleware/validator');
const authMiddleware = require('../middleware/auth');

//controller
const authController = require('../services/auth.controller');
const mahasiswaController = require('../services/mahasiswa.controller');
const rencanaStudiController = require('../services/rencanaStudi.controller');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.group('/auth', function (route) {
  route.post('/login', inputValidator.login_check, authController.postLogin);
  route.get('/logout', authController.getLogout);
});


router.group('/mahasiswa', authMiddleware.verifyToken , function (route) {
  route.get('/list', mahasiswaController.index);
  route.post('/create', inputValidator.mahasiswa_create , mahasiswaController.create);
  route.post('/update', inputValidator.mahasiswa_update , mahasiswaController.update);
  route.post('/delete', inputValidator.mahasiswa_delete , mahasiswaController.destroy);
  route.get('/detail/:id', inputValidator.mahasiswa_detail, mahasiswaController.detail);
});

router.group('/rencana-studi', authMiddleware.verifyToken , function (route) {
  route.get('/list', rencanaStudiController.index);
  route.post('/create', inputValidator.rencana_studi_create , rencanaStudiController.create);
  route.post('/update', inputValidator.rencana_studi_update , rencanaStudiController.update);
  route.post('/delete', inputValidator.rencana_studi_delete , rencanaStudiController.destroy);
  route.get('/detail/:id', inputValidator.rencana_studi_delete, rencanaStudiController.detail);
});





module.exports = router;