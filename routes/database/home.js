var express = require('express');

function Home(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	});

	connection.query('use rodman');



	this.get = function(user, callback){

		var data = [1];

		var sql = "select * from home";
		
		connection.query(sql, function(err, res){
			console.log(res);
			callback(res);
		});
	}

}

module.exports = Home;
