var db = require("../../config/app.js");
 
var Usuario = function(){
	this.id = 0;
	this.nome = "";
	this.login = "";
	this.senha = "";
	this.email = "";
	
	this.salvar = function(){
		if(this.id === 0 || this.id === "" || this.id === undefined){
			
			 if(!this.nome){
				console.log("Campo nome obrigatório!");
				return;
			 }
			
			 if(!this.login){
				console.log("Campo login obrigatório!");
				return;
			 }
			
			 if(!this.senha){
				console.log("Campo senha obrigatório!");
				return;
			 }
			
			 if(!this.email){
				console.log("Campo email obrigatório!");
				return;
			 }
			
			let query = `INSERT INTO usuarios (nome, login, senha, email) VALUES ('${this.nome}', '${this.login}', '${this.senha}', '${this.email}')`;
			
			db.cnn.exec(query, function(rows, erro){
				if(erro)
					console.log("Erro ao inserir dados no banco de dados");
				else
					console.log("Dados inseridos com sucesso");
				
			});
		}
		else{
			// TODO: atualizar na base de dados
		}
	};
};

module.exports = Usuario;