var Usuario = require("../models/usuario")
var homeController = {
	index: (request, response, next) => {
		response.render("index", { title: "Express"});
	},
	usuario: (request, response, next) => {
		let usuario = new Usuario();
		usuario.id = 6
		usuario.nome = "Noelly Cristina Ferreira Carvalho"
		usuario.login = "Cris"
		usuario.senha = "123456"
		usuario.email = "cris05@lastechnology.com"
		usuario.salvar();
		response.send("Seja bem-vindo.")
	}
}

module.exports = homeController