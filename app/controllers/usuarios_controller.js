var Usuario = require("../models/usuario")

var usuarioController = {
	todos: (request, response, next) => {
		Usuario.todos(function(retorno){
			if(retorno.erro){
				response.status(500).send({ 
					erro: `erro ao buscar usuários (${retorno.mensagem})` 
				})
			}
			else
				response.status(200).send(retorno.usuarios)
		});
	}
}

module.exports = usuarioController