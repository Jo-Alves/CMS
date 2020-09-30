var Token = require("../../../app/models/token");

describe("O modelo de token", function() {
	describe("com o atributo", function() {
		it("id precisa ser válido", function() {
		  var token = new Token();
		  expect(token.id).toBe(0);

		});

		it("nome precisa ser válido", function() {
		  var token = new Token();
		  expect(token.token).toBe("");
		});
	});

	describe("com o método salvar", function() {
		it("deve incluir no banco de dados", function(done){
			new Token().criar(function(retorno){
				expect(retorno.erro).toBe(false);
				expect(retorno.token).not.toBe("");
				done();
			});
		});
	});

	describe("com o método verificaToken", function() {
		it("deve retornar false para um token inválido", function(done){
			Token.verificaToken("tokenInvalido", function(retorno){
				expect(retorno.tokenValidado).toBe(false);
				done();
			});
		});
	});

	describe("com o método apagarToken", function() {
		it("deve apagar o token", function(done){
			new Token().criar(function(retornoCriar){
				 let token = retornoCriar.token				
				Token.apagarToken(token, function(retornoApagar){
					Token.verificaToken(token, function(retornoValidar){
						expect(retornoValidar.tokenValidado).toBe(false);
						done();
					});
				});	
			})
		});
	});

	describe("verifica Token válido", function() {
		it("deve retornar true para um token válido", function(done){
			new Token().criar(function(retornoCriar){
				let token = retornoCriar.token		
				Token.verificaToken(token, function(retornoValidar){
					expect(retornoValidar.tokenValidado).toBe(true);
					done();
				});
			});
		});
	});
});