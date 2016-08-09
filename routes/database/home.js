var express = require('express');

function Home(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	});

	connection.query('use rodman');



	this.get = function(name, callback){

		var data = [name];

		var sql = "select * from home where name=?";
		
		connection.query(sql, data, function(err, res){
			console.log(res);
			callback(res);
		});
	}

}

module.exports = Home;
