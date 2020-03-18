var http = require('http');
var fs = require('fs');
var mysql = require('mysql');

type ContaCorrente {
 	nuconta:	ID!
	nmcorrentista:	String!
	vlsaldo:	String
};

var server = http.createServer(function (request, response) {


		if (request.url === '/listagem') {
				
  		

		 execSQLQuery('SELECT * FROM tb_conta', response);
	


						
			response.end();
    				
		} else	if (request.url.substr(1,11) === 'transf.html') {
   			const partedinamica = request.url.substr(request.url.indexOf("?")+1);
			const variaveis = partedinamica.split('&');
			response.write(partedinamica);
			response.write('<br>');
			response.write('<br>');
			response.write('Nome do Correntista:' + conteudoCampo(variaveis[0]) );
			response.write('<br>')
			response.write('Conta Corrente:	' + conteudoCampo(variaveis[1]));
			response.write('<br>')
			response.write('Valor transferido:' + conteudoCampo(variaveis[2]));

			
			
			
			response.end();
    				
		} else	 if (request.url === '/transferencia') {
   			  fs.readFile(__dirname + "/transf.html", function(err, data){
        			response.end(data);
    				});
		} else	if (request.url === '/meusaldo') {
   			  fs.readFile(__dirname + "/viewsaldo.html", function(err, data){
        			response.end(data);
    				});
		} else {

	  		  fs.readFile(__dirname + "/texto.html", function(err, data){
        			response.end(data);
    				});

		}

		

});

	
function execSQLQuery(sqlQry, res){
	var resquery;

 	 const connection = mysql.createConnection({
  		  host     : 'mysql.ordebroc.com.br',
  		  port     : 3306,
  		  user     : 'ordebroc01',
  		  password : 'desafioo',
  		  database : 'ordebroc01'
  	});

	connection.connect(function(err){
 	 if(err) return console.log(err);
  	console.log('conectou!');
	})

connection.query(sqlQry, function (err, result, fields) {
    			if (err) throw err;

					
		result.forEach(function(item){
 					console.log("<p>" + item.nm_correntista + "</p>");
					});	

  	  	} 

	




);







}

function conteudoCampo(varcompleto) {

	const posseparador= varcompleto.indexOf("=")+1;
	const conteudo = varcompleto.substr(posseparador);

	return conteudo;

}




server.listen(3000, function () {
    console.log('Servidor rodando na porta 3000');
});