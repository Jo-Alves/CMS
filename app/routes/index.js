var express = require('express');
var homeController = require('../controllers/home_controller');
var router = express.Router();

router.get('/',  homeController.index);
router.get('/usuario',  homeController.usuario);

module.exports = router;
