var db = require("../../config/app.js");
var Guid = require("guid")
 
var Token = function(token){
	if(token)
	{
		this.id = token.id;
		this.token = token.token;
	}
	else{
		this.id = 0;
		this.token = "";
	}
	
	this.criar = callback => {
		let token = Guid.raw()
		let query = `INSERT INTO token (token) VALUES ('${token}')`;
			
		db.cnn.exec(query, function(rows, erro){
			if(erro)
			{	
				callback.call(null, { erro: true, mensagem: erro.message} )
			}
			 else
				callback.call(null, { erro: false, token })
		});
	}
};

Token.apagarToken = (token, callback) => {
	query = `DELETE FROM token where token = '${token}'`;
			
	db.cnn.exec(query, function(rows, erro){
		if(!callback){
			return;
		}
		
		if(erro)
			callback.call(null, { erro: true, mensagem: erro.message })
		else
			callback.call(null, { erro: false })
		
	});
}

Token.verificaToken = (token, callback) => {
	query = `SELECT * FROM token where token = '${token}'`;	
	 db.cnn.exec(query, function(rows, erro){
		 if(erro)
			 callback.call(null, { 
				tokenValidado: false 
			})
		else
		{	callback.call(null, { 
				tokenValidado: (rows.length > 0)
			})
			
		}
	});
}


module.exports = Token;