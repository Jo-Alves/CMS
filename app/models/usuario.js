var db = require("../../config/app.js");
 
var Usuario = function(usuario){
	if(usuario)
	{
		this.id = usuario.id;
		this.nome = usuario.nome;
		this.login = usuario.login;
		this.senha = usuario.senha;
		this.email = usuario.email;
	}
	else{
		this.id = 0;
		this.nome = "";
		this.login = "";
		this.senha = "";
		this.email = "";
	}
	
	this.salvar = callback => {
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
		
		let query;
		
		if(this.id === 0 || this.id === "" || this.id === undefined){
			
			query = `INSERT INTO usuarios (nome, login, senha, email) VALUES ('${this.nome}', '${this.login}', '${this.senha}', '${this.email}')`;
			
			db.cnn.exec(query, function(rows, erro){
				if(erro)
				{	
					callback.call(null, { erro: true, mensagem: erro.message} )
				}else
					callback.call(null, { erro: false })
				
			});
		}
		else{
			query = `UPDATE usuarios SET nome = '${this.nome}', login =  '${this.login}', senha = '${this.senha}', email = '${this.email}' where id = ${this.id}`;
			
			db.cnn.exec(query, function(rows, erro){
				if(erro)
					callback.call(null, { erro: true, mensagem: erro.message })
				else
					callback.call(null, { erro: false })
				
			});
		}
	};
};

Usuario.excluirTodos = callback => {
	query = `DELETE FROM usuarios`;
			
	db.cnn.exec(query, function(rows, erro){
		if(erro)
			callback.call(null, { erro: true, mensagem: erro.message })
		else
			callback.call(null, { erro: false })
		
	});
}

Usuario.truncateTable = callback => {
	query = `TRUNCATE usuarios`;
			
	db.cnn.exec(query, function(rows, erro){
		if(erro)
			callback.call(null, { erro: true, mensagem: erro.message })
		else
			callback.call(null, { erro: false })
		
	});
}

Usuario.todos = callback => {
	query = `SELECT * FROM usuarios`;
			
	db.cnn.exec(query, function(rows, erro){
		if(erro)
			callback.call(null, { 
		erro: true,
		mensagem: erro.message,
		usuarios: [] })
		else
			callback.call(null, { 
		erro: false, 
		usuarios: rows })
		
	});
}

Usuario.buscarPorID = (id, callback) => {
	query = `SELECT * FROM usuarios where id = ${id}`;	
	db.cnn.exec(query, function(rows, erro){
		if(erro)
			callback.call(null, { 
		erro: true,
		mensagem: erro.message,
		usuario: {} })
		else
		{
			if(rows.length > 0)
				callback.call(null, { 
					erro: false, 
					usuario: rows[0] 
				})
			else
				callback.call(null, { 
				erro: false, 
				usuario: {} 
			})				
		}
	});
}

Usuario.buscarPorNome = (nome, callback) => {
	query = `SELECT * FROM usuarios where nome like '%${nome}%'`;	
	db.cnn.exec(query, function(rows, erro){
		if(erro)
			callback.call(null, { 
		erro: true,
		mensagem: erro.message,
		usuarios: [] })
		else
		{
			if(rows.length > 0)
				callback.call(null, { 
					erro: false, 
					usuarios: rows
				})
			else
				callback.call(null, { 
				erro: false, 
				usuarios: [] 
			})				
		}
	});
}

module.exports = Usuario;