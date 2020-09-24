var request = require("request");
var Usuario = require("../../../app/models/usuario")
var host = "http://localhost:3000"

 describe("O Controller de usuários",  function(){
	// describe("GET /usuarios.json - Deve retornar no serviço todos os usuários",  function(){
		// it("returns status code 200", done => {
			// request.get(`${host}/usuarios.json`, function(error, response, body){
				// if(response === undefined){
					// console.log("Não consegui localizar o servidor");
					// expect(503).toBe(200);
				// }
				// else{
					// expect(response.statusCode).toBe(200);
				// }
				// done();
			// })
		// })
	// })
	
	// describe("GET /usuarios.json?nome='Valdirene' - Deve retornar no serviço todos os usuários",  function(){
		// it("returns status code 200 e o nome", done => {
			// request.get(`${host}/usuarios.json?nome=Valdirene`, function(error, response, body){
				// if(response === undefined){
					// console.log("Não consegui localizar o servidor");
					// expect(503).toBe(200);
				// }
				// else{				
					// expect(response.statusCode).toBe(200);
					// var json = JSON.parse(response.body);
					// expect(json.length).toBe(1);
					// expect(json[0].nome).toBe("Valdirene");
				// }
				// done();
			// })
		// })
	// })
	
	// describe("GET /usuarios/1.json - Deve retornar no serviço somente 1 usuário",  function(){
		// it("returns status code 200 e retornar 1 usuário", done => {
			// Usuario.truncateTable(function(retorno1){
				// var usuario = new Usuario();
				// usuario.nome = "Valdirene";
				// usuario.login = "Valdirene";
				// usuario.senha = "12345";
				// usuario.email = "valdirene@beminfinito.com.br";
				// usuario.salvar(function(retorno2){	
					// var usuario2 = new Usuario();
					// usuario2.nome = "Joelmir";
					// usuario2.login = "Jô";
					// usuario2.senha = "12345";
					// usuario2.email = "joeval@beminfinito.com.br";				
					// usuario.salvar(function(retorno3){	
						// request.get(`${host}/usuarios/1.json`, function(error, response, body){
							// if(response === undefined){
								// console.log("Não consegui localizar o servidor");
								// expect(503).toBe(200);
							// }
							// else{				
								// expect(response.statusCode).toBe(200);
								// var json = JSON.parse(response.body);
								// expect(json.id).toBe(1);
								// expect(json.nome).not.toBe(undefined);
							// }
							// done();
						// })	
					// })	
				// });
			// });
		// })
	// })
	
	describe("POST /usuarios.json - Deve criar um usuário",  function(){
		it("deve retornar o status code de 201", done => {
			var user = { nome: "Alexina", login: "alexa", senha: "12345", email: "alexina@beminfinito.com.br"	}
			request.post({ url: `${host}/usuarios.json`, form: user }, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}
				else{
					expect(response.statusCode).toBe(201);
					var json = JSON.parse(response.body)
					expect(json.mensagem).toBe("Usuário criado com sucesso")
				}
				done();
			})
		})
	})
	
	describe("PUT /usuarios.json - Deve criar um usuário",  function(){
		var usuarioCadastrado;
		beforeEach(done => {
			Usuario.truncateTable(retorno1 => {			
				var usuario = new Usuario();
				usuario.nome = "Valdirene passando no teste";
				usuario.login = "Val";
				usuario.senha = "12345";
				usuario.email = "val@beminfinito.com.br";				
				usuario.salvar(retorno2 => {
					Usuario.todos(retorno3 => {
						if(!retorno3.erro){
							usuarioCadastrado = retorno3.usuarios[0];
						}
						done();
					});
				});
			});
		})
		
		it("deve retornar o status code de 200", done => {
			usuarioCadastrado.nome = "Valdirene Ap. Ferreira";
			request.put({ url: `${host}/usuarios.json`, form: usuarioCadastrado }, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}
				else{
					expect(response.statusCode).toBe(200);
					var json = JSON.parse(response.body);
					expect(json.mensagem).toBe("Usuário atualizado com sucesso");
					
					Usuario.buscarPorID(usuarioCadastrado.id, retorno => {
						expect(retorno.usuario.nome).toBe("Valdirene Ap. Ferreira")
						done();
					})
				}
				done();
			})
		})
		
		it("deve retornar o status code de 200", done => {
			request.put({ url: `${host}/usuarios.json`, form: {}}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}
				else{
					expect(response.statusCode).toBe(400);					
				}
				done();
			})
		})
	})
})