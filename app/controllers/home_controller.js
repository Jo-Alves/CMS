var Usuario = require("../models/usuario")
var homeController = {
	index: (request, response, next) => {
		response.render("index", { title: "Express"});
	},
	usuario: (request, response, next) => {
		let usuario = new Usuario();
		usuario.nome = "Noelly Cristina"
		usuario.login = "noelly"
		usuario.senha = "12345"
		usuario.email = "cris10@lastechnology.com"
		usuario.salvar();
		response.send("Seja bem-vindo.")
	}
}

module.exports = homeController