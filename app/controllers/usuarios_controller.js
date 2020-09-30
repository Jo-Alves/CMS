var Usuario = require("../models/usuario")
var Token = require("../models/token")

var usuarioController = {
	head: (request, response, next) => {
		new Token().criar(retorno => {
			response.header("auth_token", retorno.token)
			response.status(204).send("")	
		})
	},	
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
					if(retorno.usuario.nome)
						response.status(200).send(retorno.usuario)
					else
						response.status(404).send({ 
							mensagem: "usuário não encontrado)"
						})
		})
	}, 
	criar: (request, response, next) => {
		let token = request.headers.auth_token
		Token.verificaToken(token, retorno => {
			if(retorno.tokenValidado)
			{
				Token.apagarToken(token)
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
			}
			else{
				response.status(401).send({ 
					erro: `Token inválido, você não tem autorização de acessar esta API` 
				})
			}
		})
	},
	atualizar: (request, response, next) => {
		let token = request.headers.auth_token
		Token.verificaToken(token, retorno => {
			if(retorno.tokenValidado)
			{
				Token.apagarToken(token)
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
			else{
				response.status(401).send({ 
					erro: `Token inválido, você não tem autorização de acessar esta API` 
				})
			}
		})
	},
	 atualizarPorPatch: function(request, response, next){
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
    response.header('Access-Control-Allow-Headers', 'Content-Type');

    var token = request.headers.auth_token;
    Token.verificaToken(token, function(retorno){
      if(retorno.tokenValidado){

        Token.apagarToken(token);

        Usuario.buscarPorID(request.params.id, function(retorno){
          if(retorno.usuario.id === undefined){
            response.status(400).send({
              erro:'Erro ao atualizar, id de usuario não encontrado'
            });
          }
          else{
            var usuario = new Usuario(retorno.usuario);

            if(request.body.nome !== undefined && request.body.nome !== ""){
              usuario.nome = request.body.nome;
            }

            if(request.body.login !== undefined && request.body.login !== ""){
              usuario.login = request.body.login;
            }

            if(request.body.senha !== undefined && request.body.senha !== ""){
              usuario.senha = request.body.senha;
            }

            if(request.body.email !== undefined && request.body.email !== ""){
              usuario.email = request.body.email;
            }

            usuario.salvar(function(retorno){
              if(retorno.erro){
                response.status(500).send({
                  erro:'Erro ao atualizar usuario (' + retorno.mensagem + ')'
                });
              }
              else{
                response.status(200).send({mensagem: "Usuário atualizado com sucesso"});
              }
            });
          }
        });
      }
      else{
        response.status(401).send({
          erro:'Token inválido, você não tem autorização de acessar esta API'
        });
      }
    });
  },
	excluirUsuario: (request, response, next) => {
		let token = request.headers.auth_token
		Token.verificaToken(token, retorno => {
			if(retorno.tokenValidado)
			{
				Token.apagarToken(token)	
				Usuario.excluirPorID(request.params.id, retorno => {
					if(retorno.erro){
						response.status(500).send({
							erro: "Erro ao excluir, id de usuário não encontrado"
						})
					}
					else{
						response.status(204).send("")
					}
				})
			}
			else{
				response.status(401).send({ 
					erro: `Token inválido, você não tem autorização de acessar esta API` 
				})
			}
		})
	},
	options: (request, response, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		response.status(204).send("")
	}
}

module.exports = usuarioController