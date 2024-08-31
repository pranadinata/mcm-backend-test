require('express-router-group');
var express = require('express');
var router = express.Router();

//middleware
const authValidator = require('../middleware/validator');
const authMiddleware = require('../middleware/auth');


const authController = require('../services/auth.controller');
const mahasiswaController = require('../services/mahasiswa.controller');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.group('/auth', function (route) {
  route.post('/login', authValidator.login_check, authController.postLogin);
  route.get('/logout', authController.getLogout);
});


router.group('/mahasiswa', authMiddleware.verifyToken , function (route) {
  route.get('/list', mahasiswaController.index);
});


module.exports = router;