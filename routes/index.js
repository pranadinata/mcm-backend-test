require('express-router-group');
var express = require('express');
var router = express.Router();

//middleware
const inputValidator = require('../middleware/validator');
const authMiddleware = require('../middleware/auth');

//controller
const authController = require('../services/auth.controller');
const mahasiswaController = require('../services/mahasiswa.controller');


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
  route.get('/detail/:id',inputValidator.mahasiswa_detail, mahasiswaController.detail);
});


module.exports = router;