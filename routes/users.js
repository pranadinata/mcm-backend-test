require('express-router-group');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource yesaya aja');
});

module.exports = router;
