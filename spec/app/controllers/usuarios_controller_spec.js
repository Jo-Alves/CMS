request = require("request");

describe("O Controller de usuários",  function(){
	describe("GET /usuarios.json - Deve retornar no serviço todos os usuários",  function(){
		it("returns status code 200", done => {
			request.get("http://localhost:3000/usuarios.json", function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}
				else{
					expect(response.statusCode).toBe(200);
				}
				done();
			})
		})
	})
})