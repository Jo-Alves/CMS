var express = require('express');
var homeController = require('../controllers/home_controller');
var usuariosController = require('../controllers/usuarios_controller');
var router = express.Router();

router.get('/',  homeController.index);
router.get('/usuario',  homeController.usuario);
router.get('/usuarios.json',  usuariosController.todos);
router.post('/usuarios.json',  usuariosController.criar);
router.put('/usuarios.json',  usuariosController.atualizar);
router.get('/usuarios/:id.json',  usuariosController.porId);
router.patch('/usuarios/:id.json',  usuariosController.atualizarPorPatch);
router.delete('/usuarios/:id.json',  usuariosController.excluirUsuario);

module.exports = router;
