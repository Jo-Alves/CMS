var Usuario = require("../../../app/models/usuario")

describe("O modelo de usuário", function(){
	describe("com o atributo", function(){
		it("Id precisa ser válido", function(){
			var usuario = new Usuario()
			expect(usuario.id).toBe(0)
		})	
		it("Nome precisa ser válido", function(){
			var usuario = new Usuario()
			expect(usuario.nome).toBe("")
		})	
		it("Login precisa ser válido", function(){
			var usuario = new Usuario()
			expect(usuario.login).toBe("")
		})	
		it("Senha precisa ser válido", function(){
			var usuario = new Usuario()
			expect(usuario.senha).toBe("")
		})	
		it("Email precisa ser válido", function(){
			var usuario = new Usuario()
			expect(usuario.email).toBe("")
		})	
	})
})