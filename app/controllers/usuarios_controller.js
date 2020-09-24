var Usuario = require("../models/usuario")

var usuarioController = {
	todos: (request, response, next) => {
		let nome = request.query.nome;
		if(nome)
		{
			Usuario.buscarPorNome(nome, function(retorno){
				if(retorno.erro){
					response.status(500).send({ 
						erro: `erro ao buscar usuário por nome (${nome}) -  (${retorno.mensagem})` 
					})
				}
				else
					response.status(200).send(retorno.usuarios)
			});
		}
		else{
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
	},
	porId : (request, response, next) => {		
		Usuario.buscarPorID(request.params.id, retorno => {
			if(retorno.erro){
					response.status(500).send({ 
						erro: `erro ao buscar usuário por id(${retorno.mensagem})` 
					})
				}
				else
					response.status(200).send(retorno.usuario)
		})
	}, 
	criar: (request, response, next) => {
		var usuario = new Usuario();
		usuario.nome = request.body.nome;
		usuario.login = request.body.login;
		usuario.senha = request.body.senha;
		usuario.email = request.body.email;
		usuario.salvar(retorno => {
			if(retorno.erro){				
					response.status(500).send({ 
						erro: `Erro ao cadastar usuário (${retorno.mensagem})` 
					})
				}
				else
					response.status(201).send({mensagem: "Usuário criado com sucesso"})
		})
	},
	atualizar: (request, response, next) => {
		
		Usuario.buscarPorID(request.body.id, retorno => {
			if(!retorno.usuario.id){
				response.status(400).send({
					erro: "Erro ao atualizar, id de usuário não encontrado"
				})
			}
			else{
				var usuario = new Usuario();
				usuario.id = request.body.id;
				usuario.nome = request.body.nome;
				usuario.login = request.body.login;
				usuario.senha = request.body.senha;
				usuario.email = request.body.email;
				usuario.salvar(retorno => {
					if(retorno.erro){				
						response.status(500).send({ 
							erro: `Erro ao atualizar usuário (${retorno.mensagem})` 
						})
					}
					else
						response.status(200).send({mensagem: "Usuário atualizado com sucesso"})
				})	
			}
		})
	}
}

module.exports = usuarioController