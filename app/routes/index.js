var express = require('express');
var homeController = require('../controllers/home_controller');
var usuariosController = require('../controllers/usuarios_controller');
var router = express.Router();

router.get('/',  homeController.index);
router.get('/usuario',  homeController.usuario);

router.head('/usuarios.json',  usuariosController.head);
router.get('/usuarios.json',  usuariosController.todos);
router.post('/usuarios.json',  usuariosController.criar);
router.put('/usuarios.json',  usuariosController.atualizar);
router.options('/usuarios.json',  usuariosController.options);
router.get('/usuarios/:id.json',  usuariosController.porId);
router.patch('/usuarios/:id.json',  usuariosController.atualizarPorPatch);
router.delete('/usuarios/:id.json',  usuariosController.excluirUsuario);
router.options('/usuarios/:id.json',  usuariosController.options);

module.exports = router;
