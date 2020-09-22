var express = require('express');
var homeController = require('../controllers/home_controller');
var usuariosController = require('../controllers/usuarios_controller');
var router = express.Router();

router.get('/',  homeController.index);
router.get('/usuario',  homeController.usuario);
router.get('/usuarios.json',  usuariosController.todos);

module.exports = router;
