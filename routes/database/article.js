var express = require('express');

function Article(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	});

	connection.query('use rodman');


	this.save = function(maker, callback){

		var ret;

		var sql = "select * from test";
		
		connection.query(sql, function(err, res){
			console.log(res);
			callback(res);
		});
	}


}

module.exports = Article;
